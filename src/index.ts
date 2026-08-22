/**
 * dsh-plugin-constellation host entry.
 *
 * Builds the plugin graph by scanning the profiles' node_modules for ALL
 * packages (official @deepseek-ai plugins + any third-party plugins the user
 * installs later). Four relation-line sources:
 *
 *   deps/peer  — package.json dependencies / peerDependencies (plugin↔plugin)
 *   service    — Cordis `inject = [...]` declarations extracted from each
 *                plugin's built entry JS; rendered as plugin → ⚙service hub
 *   client     — `dsh.client.inject` module lists from package.json
 *   profile    — profile bundles membership; rendered as ●profile hub → member
 *
 * Plugin enabled/disabled state and fiber phase come from the official
 * plugin inventory (ctx.pluginInventory.list()).
 *
 * Profiles are enumerated dynamically: every subdirectory of ~/.dsh/profiles
 * that carries a package.json with `dsh.profile.bundles` is a profile. Its
 * bundles list is the authoritative source for "what is a user-installed
 * plugin", so future third-party plugins are classified without code changes.
 *
 * Data exposed as JSON HTTP route `/dsh-plugin-constellation/graph` via host
 * webServer (dshmarket-style host→client bridge), with mtime-keyed caching.
 *
 * NOTE: no default export — the Cordis loader unwraps `exports.default ?? exports`
 * and would drop named exports if a default were present.
 */
import { readFileSync, readdirSync, existsSync, statSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

export const name = "dsh-plugin-constellation";
export const inject = ["webServer", "loader", "pluginInventory"];

/* ── graph data model ── */
export type FiberPhase = "pending" | "loading" | "active" | "failed" | "unloading" | null;
export type RelationType = "deps" | "peer" | "service" | "client" | "profile";
export type HubKind = "service" | "profile";

export interface GraphNode {
  id: string;
  /** short display name (package name, or bare service/profile name for hubs) */
  label: string;
  category: string;
  enabled: boolean;
  /** loader fiber phase from pluginInventory: active / failed / loading / … */
  phase: FiberPhase;
  version: string;
  desc: string;
  /** dependency spec from the profile package.json (e.g. "^1.8.0", "github:u/r") */
  installSource: string;
  /** names of the profiles that reference this package */
  profiles: string[];
  /** true when no profile bundle or loaded entry reaches this package */
  orphan: boolean;
  repository: string;
  homepage: string;
  /** hub marker: virtual nodes are not real packages */
  hub?: HubKind;
}

export interface GraphLink {
  source: string;
  target: string;
  relation: RelationType;
}

export interface GraphData {
  nodes: GraphNode[];
  links: GraphLink[];
  scannedAt: string;
}

/* ── profile enumeration ── */
interface ProfileInfo {
  name: string;
  dir: string;
  /** dsh.profile.bundles — authoritative plugin list */
  bundles: string[];
  /** dependencies map from the profile package.json (name → version spec) */
  depSpecs: Map<string, string>;
}

function enumerateProfiles(profilesRoot: string): ProfileInfo[] {
  const out: ProfileInfo[] = [];
  let entries: string[] = [];
  try { entries = readdirSync(profilesRoot); } catch { return out; }
  for (const entry of entries) {
    if (entry.startsWith(".") || entry === "node_modules") continue;
    const dir = join(profilesRoot, entry);
    const pkgPath = join(dir, "package.json");
    if (!existsSync(pkgPath)) continue;
    try {
      const pkg = JSON.parse(readFileSync(pkgPath, "utf-8"));
      const bundles: string[] = Array.isArray(pkg?.dsh?.profile?.bundles) ? pkg.dsh.profile.bundles : [];
      const depSpecs = new Map<string, string>();
      if (pkg?.dependencies && typeof pkg.dependencies === "object") {
        for (const [k, v] of Object.entries(pkg.dependencies)) depSpecs.set(k, String(v));
      }
      out.push({ name: entry, dir, bundles, depSpecs });
    } catch { /* malformed profile package.json — skip */ }
  }
  return out;
}

/* ── category inference ── */
const CATEGORY_RULES: Array<[RegExp, string]> = [
  [/^dsh-client-ui-/, "Web UI 层"],
  [/^dsh-client-/, "客户端插件"],
  [/^dsh-host-/, "Web 服务层"],
  [/^dsh-llm-/, "模型工具层"],
  [/^dsh-tool-/, "工具层"],
  [/^dsh-sandbox-|^dsh-pwsh-|^dsh-bash-/, "沙箱与执行"],
  [/^dsh-session-/, "会话与持久化"],
  [/^dsh-session$/, "会话与持久化"],
  [/^dsh-subagent-/, "委派与工作流"],
  [/^dsh-agent-/, "Agent 能力"],
  [/^dsh-code-runtime-/, "沙箱与执行"],
  [/^dsh-workflow-/, "委派与工作流"],
  [/^dsh-compaction-/, "会话与持久化"],
  [/^dsh-skill-/, "技能系统"],
  [/^dsh-storage-/, "存储层"],
  [/^cordis-/, "Cordis 基建"],
];

function categorize(moduleName: string, authoritative: Set<string>): string {
  const short = moduleName.replace(/^@deepseek-ai\//, "");
  // cordis: prefixed loader entries are official Cordis infrastructure.
  if (moduleName.startsWith("cordis:") || short.startsWith("cordis:")) return "Cordis 基建";
  // Official @deepseek-ai packages follow the dsh-* naming rules.
  if (moduleName.startsWith("@deepseek-ai/")) {
    // Pure library packages that other plugins depend on but are not plugins.
    if (["@deepseek-ai/cordis", "@deepseek-ai/cosmokit", "@deepseek-ai/schemastery"].includes(moduleName)) {
      return "基础库";
    }
    for (const [re, cat] of CATEGORY_RULES) {
      if (re.test(short)) return cat;
    }
    if (short.startsWith("dsh-")) return "核心基础设施";
    return "基础库";
  }
  // Anything a profile explicitly bundles is a third-party plugin.
  if (authoritative.has(moduleName)) return "第三方插件";
  // Desktop shell builtins.
  if (moduleName === "dsh-plugin-desktop" || moduleName === "dsh-community-market" || moduleName === "dsh-market") {
    return "核心基础设施";
  }
  if (moduleName.startsWith("dsh-plugin-desktop/")) return "核心基础设施";
  if (/^(dsh-|cordis-)/.test(short)) return "第三方插件";
  return "其他";
}

/* ── keep only plugin-shaped packages (official + third-party DSH plugins) ── */
const CORE_LIBS = new Set(["cordis", "cosmokit", "schemastery"]);

function isPluginShape(name: string, authoritative: Set<string>): boolean {
  if (name.startsWith("@deepseek-ai/")) return true;
  if (CORE_LIBS.has(name)) return true;
  if (authoritative.has(name)) return true;
  if (name === "dsh-plugin-desktop" || name === "dsh-community-market" || name === "dsh-market") return true;
  if (name.startsWith("dsh-plugin-desktop/")) return true;
  if (name.startsWith("dsh-") || name.startsWith("cordis-")) return true;
  if (name.startsWith("@")) {
    const base = name.split("/").pop() || "";
    if (base.startsWith("dsh-") || base.startsWith("cordis-")) return true;
  }
  return false;
}

/* ── locate profile root ── */
function findProfilesRoot(): string | null {
  const home = process.env.HOME || process.env.USERPROFILE || "";
  const candidates = [join(home, ".dsh", "profiles"), join(home, ".config", "dsh", "profiles")];
  for (const c of candidates) {
    if (existsSync(c)) return c;
  }
  return null;
}

/* ── scan ALL packages in every profile's node_modules layers ── */
interface ScannedPkg {
  pkg: any;
  dir: string;
}

function scanAllPackages(profilesRoot: string, profiles: ProfileInfo[]): Map<string, ScannedPkg> {
  const pkgs = new Map<string, ScannedPkg>();
  const layers = [join(profilesRoot, "node_modules"), ...profiles.map((p) => join(p.dir, "node_modules"))];
  const seen = new Set<string>();

  const add = (name: string, dir: string) => {
    const pkgJson = join(dir, "package.json");
    if (!existsSync(pkgJson)) return;
    try {
      pkgs.set(name, { pkg: JSON.parse(readFileSync(pkgJson, "utf-8")), dir });
      seen.add(name);
    } catch { /* malformed package.json — skip */ }
  };

  for (const layer of layers) {
    if (!existsSync(layer)) continue;
    let entries: string[] = [];
    try { entries = readdirSync(layer); } catch { continue; }
    for (const entry of entries) {
      if (entry.startsWith(".") || entry === ".pnpm") continue;
      if (entry.startsWith("@")) {
        // scoped package dirs (@deepseek-ai, @bocha-ai, @vectorize-io …)
        let scoped: string[] = [];
        const scopeDir = join(layer, entry);
        try { scoped = readdirSync(scopeDir); } catch { continue; }
        for (const sub of scoped) {
          if (sub.startsWith(".")) continue;
          const fullName = `${entry}/${sub}`;
          if (seen.has(fullName)) continue;
          add(fullName, join(scopeDir, sub));
        }
      } else {
        if (seen.has(entry)) continue;
        add(entry, join(layer, entry));
      }
    }
  }
  return pkgs;
}

/* ── dependency edges of a package ── */
function* depEntries(pkg: any): Iterable<[string, RelationType]> {
  for (const dep of Object.keys(pkg?.dependencies || {})) yield [dep, "deps"];
  for (const dep of Object.keys(pkg?.peerDependencies || {})) yield [dep, "peer"];
}

/* ── Cordis service-injection extraction ──
 * Reads the package's entry JS halves (main / exports["."] / exports["./dsh"]
 * / common fallbacks) and unions service names out of `inject = [...]` /
 * `static inject = [...]` / `ctx.inject([...])` declarations. Best-effort by
 * design: only declarative arrays are picked up, so nothing extracted can be
 * WRONG — dynamic injections are simply not shown. */
const INJECT_ENTRY_FALLBACKS = ["lib/index.js", "dist/index.js", "dist/dsh.js", "index.js"];
const INJECT_RE = [
  /(?:static\s+)?inject\s*=\s*\[([^\]]{0,600})\]/g,
  /\.inject\(\s*\[([^\]]{0,600})\]/g,
];
const SERVICE_NAME_RE = /^[a-z][A-Za-z0-9]{1,30}$/;
const ENTRY_READ_CAP = 3 * 1024 * 1024;

function resolveExportsPath(v: unknown): string | null {
  if (typeof v === "string") return v;
  if (v && typeof v === "object") {
    const obj = v as Record<string, unknown>;
    if (typeof obj.default !== "undefined") return resolveExportsPath(obj.default);
    if (typeof obj.import !== "undefined") return resolveExportsPath(obj.import);
    if (typeof obj.require !== "undefined") return resolveExportsPath(obj.require);
  }
  return null;
}

function extractInjectServices(scanned: ScannedPkg): string[] {
  const pkg = scanned.pkg;
  const candidates = new Set<string>();
  if (typeof pkg?.main === "string") candidates.add(pkg.main);
  const dot = resolveExportsPath(pkg?.exports?.["."]);
  if (dot) candidates.add(dot);
  const dsh = resolveExportsPath(pkg?.exports?.["./dsh"]);
  if (dsh) candidates.add(dsh);
  for (const fallback of INJECT_ENTRY_FALLBACKS) candidates.add(fallback);

  const found = new Set<string>();
  for (const rel of candidates) {
    const file = join(scanned.dir, rel);
    try {
      if (!existsSync(file) || !statSync(file).isFile()) continue;
      if (statSync(file).size > ENTRY_READ_CAP) continue;
      const src = readFileSync(file, "utf-8");
      if (!src.includes("inject")) continue;
      for (const re of INJECT_RE) {
        re.lastIndex = 0;
        let match: RegExpExecArray | null;
        while ((match = re.exec(src)) !== null) {
          for (const token of match[1].match(/["']([^"']+)["']/g) || []) {
            const name = token.slice(1, -1);
            if (SERVICE_NAME_RE.test(name)) found.add(name);
          }
        }
      }
    } catch { /* unreadable — try next */ }
  }
  return [...found];
}

/* ── build graph ── */
function buildGraph(hostCtx: any): GraphData {
  const profilesRoot = findProfilesRoot();
  const nodes: GraphNode[] = [];
  const links: GraphLink[] = [];
  const known = new Set<string>();

  if (!profilesRoot) {
    return { nodes: [], links: [], scannedAt: new Date().toISOString() };
  }

  const profiles = enumerateProfiles(profilesRoot);

  // Authoritative third-party plugin set: union of all profiles' bundles.
  const authoritative = new Set<string>();
  for (const p of profiles) for (const b of p.bundles) authoritative.add(b);

  // install source + owning profiles for bundled/declared packages
  const installSpec = new Map<string, string>();
  const ownerProfiles = new Map<string, string[]>();
  for (const p of profiles) {
    for (const b of p.bundles) {
      if (!ownerProfiles.has(b)) ownerProfiles.set(b, []);
      ownerProfiles.get(b)!.push(p.name);
    }
    for (const [depName, spec] of p.depSpecs) {
      installSpec.set(depName, spec);
      if (!ownerProfiles.has(depName)) ownerProfiles.set(depName, []);
      if (!ownerProfiles.get(depName)!.includes(p.name)) ownerProfiles.get(depName)!.push(p.name);
    }
  }

  // Official plugin inventory → enabled/disabled state + fiber phase (authoritative).
  // Loader module names may carry a subpath ("@scope/pkg/dsh" via cordis.patch);
  // fold those onto the owning package so node lookups match.
  const stateMap = new Map<string, { enabled: boolean; phase: FiberPhase }>();
  try {
    const result = hostCtx.pluginInventory.list();
    const entries = result?.entries || result || [];
    const packageNameOf = (moduleName: string): string => {
      if (moduleName.startsWith("@")) return moduleName.split("/").slice(0, 2).join("/");
      return moduleName.split("/")[0];
    };
    for (const e of entries) {
      const mn = String(e.moduleName || e.id || "");
      if (!mn) continue;
      const phase = (e.fiberPhase === undefined ? null : String(e.fiberPhase)) as FiberPhase;
      const entry = { enabled: e.enabled !== false, phase };
      stateMap.set(mn, entry);
      const pkgName = packageNameOf(mn);
      if (pkgName !== mn && !stateMap.has(pkgName)) stateMap.set(pkgName, entry);
    }
  } catch { /* ignore */ }

  // Scan every package in every profile layer.
  const pkgs = scanAllPackages(profilesRoot, profiles);

  // Build nodes: keep only plugin-shaped packages.
  for (const [name, { pkg }] of pkgs) {
    if (!isPluginShape(name, authoritative)) continue;
    const nodeId = name;
    if (known.has(nodeId)) continue;
    known.add(nodeId);
    const st = stateMap.get(name);
    const repo = pkg?.repository;
    const repoUrl = typeof repo === "string" ? repo : repo?.url || "";
    nodes.push({
      id: nodeId,
      label: name,
      category: categorize(nodeId, authoritative),
      enabled: st ? st.enabled : true,
      phase: st ? st.phase : null,
      version: pkg?.version || "",
      desc: pkg?.description || "",
      installSource: installSpec.get(name) || "",
      profiles: ownerProfiles.get(name) || [],
      orphan: false, // filled after reachability below
      repository: repoUrl || "",
      homepage: pkg?.homepage || "",
    });
  }

  /* ── relation lines: npm deps (plugin↔plugin) ── */
  const seenEdge = new Set<string>();
  const addLink = (source: string, target: string, relation: RelationType) => {
    if (source === target) return;
    const key = `${source}->${target}:${relation}`;
    if (seenEdge.has(key)) return;
    seenEdge.add(key);
    links.push({ source, target, relation });
  };
  for (const [name, { pkg }] of pkgs) {
    if (!known.has(name)) continue;
    for (const [dep, relation] of depEntries(pkg)) {
      if (known.has(dep)) addLink(name, dep, relation);
    }
  }

  /* ── relation lines: client module injection (dsh.client.inject) ── */
  for (const [name, { pkg }] of pkgs) {
    if (!known.has(name)) continue;
    const clientInject = pkg?.dsh?.client?.inject;
    if (!Array.isArray(clientInject)) continue;
    for (const mod of clientInject) {
      if (typeof mod === "string" && known.has(mod)) addLink(name, mod, "client");
    }
  }

  /* ── relation lines: Cordis service hubs ──
   * Consumers link to a ⚙<service> hub node. We never guess the provider —
   * an unknown provider is a missing line, a wrong provider would be a lie. */
  const serviceConsumers = new Map<string, string[]>();
  for (const [name, scanned] of pkgs) {
    if (!known.has(name)) continue;
    for (const svc of extractInjectServices(scanned)) {
      if (!serviceConsumers.has(svc)) serviceConsumers.set(svc, []);
      serviceConsumers.get(svc)!.push(name);
    }
  }
  for (const [svc, consumers] of serviceConsumers) {
    const hubId = `service:${svc}`;
    nodes.push({
      id: hubId,
      label: svc,
      category: "服务枢纽",
      enabled: true,
      phase: null,
      version: "",
      desc: `Cordis 服务枢纽 · 被 ${consumers.length} 个插件注入`,
      installSource: "",
      profiles: [],
      orphan: false,
      repository: "",
      homepage: "",
      hub: "service",
    });
    for (const consumer of consumers) addLink(consumer, hubId, "service");
  }

  /* ── relation lines: profile hubs (bundle membership) ── */
  for (const p of profiles) {
    const members = p.bundles.filter((b) => known.has(b));
    if (members.length === 0) continue;
    const hubId = `profile:${p.name}`;
    nodes.push({
      id: hubId,
      label: p.name,
      category: "Profile 枢纽",
      enabled: true,
      phase: null,
      version: "",
      desc: `Profile ${p.name} · ${members.length} 个 bundle 成员`,
      installSource: "",
      profiles: [],
      orphan: false,
      repository: "",
      homepage: "",
      hub: "profile",
    });
    for (const member of members) addLink(hubId, member, "profile");
  }

  /* ── orphan detection: a plugin-shaped package is referenced when it is
     listed in some profile's bundles, is a loaded loader entry, or is
     (transitively) depended on / client-injected by a referenced package.
     Service and profile lines are consumer→hub statements and never make a
     package "referenced". Hub nodes are virtual and never orphan. ── */
  const referenced = new Set<string>([...authoritative, ...stateMap.keys()]);
  const adj = new Map<string, string[]>();
  for (const [name, { pkg }] of pkgs) {
    const targets: string[] = [];
    for (const [dep] of depEntries(pkg)) {
      if (pkgs.has(dep)) targets.push(dep);
    }
    const clientInject = pkg?.dsh?.client?.inject;
    if (Array.isArray(clientInject)) {
      for (const mod of clientInject) {
        if (typeof mod === "string" && pkgs.has(mod)) targets.push(mod);
      }
    }
    adj.set(name, targets);
  }
  const queue = [...referenced];
  while (queue.length > 0) {
    const cur = queue.pop()!;
    for (const next of adj.get(cur) || []) {
      if (!referenced.has(next)) {
        referenced.add(next);
        queue.push(next);
      }
    }
  }
  for (const node of nodes) {
    if (node.hub) continue;
    if (!referenced.has(node.id)) node.orphan = true;
  }

  return { nodes, links, scannedAt: new Date().toISOString() };
}

/* ── mtime-keyed graph cache (node_modules scans are not free) ── */
let graphCache: { key: string; data: GraphData } | null = null;

function cacheKey(profilesRoot: string): string {
  const parts: string[] = [];
  let entries: string[] = [];
  try { entries = readdirSync(profilesRoot); } catch { return "none"; }
  for (const entry of entries) {
    if (entry.startsWith(".") || entry === "node_modules") continue;
    const dir = join(profilesRoot, entry);
    const pkgPath = join(dir, "package.json");
    try { parts.push(`${entry}/pkg:${statSync(pkgPath).mtimeMs}`); } catch { /* ignore */ }
    const layer = join(dir, "node_modules");
    try { parts.push(`${entry}/nm:${statSync(layer).mtimeMs}`); } catch { /* ignore */ }
  }
  try { parts.push(`shared/nm:${statSync(join(profilesRoot, "node_modules")).mtimeMs}`); } catch { /* ignore */ }
  return parts.join("|");
}

/* ── plugin settings (persisted under ~/.dsh/dsh-plugin-constellation) ── */
interface PluginSettings {
  /** "auto" (follow theme) or a #rrggbb color */
  bgColor: string;
  /** 0–1, 0 = fully transparent modal background */
  bgOpacity: number;
  /** frosted-glass blur radius in px, 0–40 */
  blur: number;
  /** mime type of the stored background image, null when none */
  imageMime: string | null;
}

function settingsDir(): string {
  const home = process.env.HOME || process.env.USERPROFILE || "";
  return join(home, ".dsh", "dsh-plugin-constellation");
}

function loadSettings(): PluginSettings {
  try {
    const s = JSON.parse(readFileSync(join(settingsDir(), "settings.json"), "utf-8"));
    return {
      bgColor: s.bgColor === "auto" || /^#[0-9a-fA-F]{6}$/.test(s.bgColor) ? s.bgColor : "auto",
      bgOpacity: typeof s.bgOpacity === "number" ? Math.max(0, Math.min(1, s.bgOpacity)) : 1,
      blur: typeof s.blur === "number" ? Math.max(0, Math.min(40, s.blur)) : 12,
      imageMime: typeof s.imageMime === "string" ? s.imageMime : null,
    };
  } catch {
    return { bgColor: "auto", bgOpacity: 1, blur: 12, imageMime: null };
  }
}

function saveSettings(s: PluginSettings): void {
  mkdirSync(settingsDir(), { recursive: true });
  writeFileSync(join(settingsDir(), "settings.json"), JSON.stringify(s, null, 2));
}

function settingsView(): { bgColor: string; bgOpacity: number; blur: number; hasImage: boolean } {
  const s = loadSettings();
  return { bgColor: s.bgColor, bgOpacity: s.bgOpacity, blur: s.blur, hasImage: s.imageMime !== null && existsSync(join(settingsDir(), "bg-image.bin")) };
}

function readBody(request: any, limit = 12 * 1024 * 1024): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    let size = 0;
    request.on("data", (chunk: Buffer) => {
      size += chunk.length;
      if (size > limit) {
        reject(new Error("body too large"));
        request.destroy();
        return;
      }
      chunks.push(chunk);
    });
    request.on("end", () => resolve(Buffer.concat(chunks)));
    request.on("error", reject);
  });
}

const DATA_URL_RE = /^data:(image\/[a-z0-9.+-]+);base64,([A-Za-z0-9+/=]+)$/;

/* ── apply: mount the HTTP routes ── */
export function apply(ctx: any): void {
  ctx.inject(["webServer", "loader", "pluginInventory"], (hostCtx: any) => {
    hostCtx.effect(
      () => {
        const json = (response: any, status: number, body: unknown) => {
          response.writeHead(status, {
            "content-type": "application/json; charset=utf-8",
            "cache-control": "no-store",
          });
          response.end(typeof body === "string" ? body : JSON.stringify(body));
        };

        const disposers: Array<() => void> = [];

        disposers.push(hostCtx.webServer.register({
          kind: "exact",
          path: "/dsh-plugin-constellation/graph",
          handler: (request: any, response: any) => {
            if (request.method !== "GET") {
              response.writeHead(405, { allow: "GET" });
              response.end();
              return;
            }
            try {
              const force = String(request.url || "").includes("refresh=1");
              const root = findProfilesRoot();
              const key = root ? cacheKey(root) : "none";
              if (!force && graphCache && graphCache.key === key) {
                json(response, 200, graphCache.data);
                return;
              }
              const data = buildGraph(hostCtx);
              graphCache = { key, data };
              json(response, 200, data);
            } catch (err) {
              json(response, 500, { error: String(err) });
            }
          },
        }));

        // GET current settings / POST partial updates {bgColor?, bgOpacity?, blur?, bgImage?}
        disposers.push(hostCtx.webServer.register({
          kind: "exact",
          path: "/dsh-plugin-constellation/settings",
          handler: async (request: any, response: any) => {
            try {
              if (request.method === "GET") {
                json(response, 200, settingsView());
                return;
              }
              if (request.method !== "POST") {
                response.writeHead(405, { allow: "GET, POST" });
                response.end();
                return;
              }
              const body = JSON.parse((await readBody(request)).toString("utf-8"));
              const s = loadSettings();
              if (body.bgColor !== undefined) {
                if (body.bgColor === "auto" || /^#[0-9a-fA-F]{6}$/.test(body.bgColor)) s.bgColor = body.bgColor;
              }
              if (typeof body.bgOpacity === "number") s.bgOpacity = Math.max(0, Math.min(1, body.bgOpacity));
              if (typeof body.blur === "number") s.blur = Math.max(0, Math.min(40, body.blur));
              if (body.bgImage !== undefined) {
                if (body.bgImage === null) {
                  s.imageMime = null;
                } else if (typeof body.bgImage === "string") {
                  const match = DATA_URL_RE.exec(body.bgImage);
                  if (!match) throw new Error("invalid image data URL");
                  mkdirSync(settingsDir(), { recursive: true });
                  writeFileSync(join(settingsDir(), "bg-image.bin"), Buffer.from(match[2], "base64"));
                  s.imageMime = match[1];
                }
              }
              saveSettings(s);
              json(response, 200, settingsView());
            } catch (err) {
              json(response, 500, { error: String(err) });
            }
          },
        }));

        // background image binary
        disposers.push(hostCtx.webServer.register({
          kind: "exact",
          path: "/dsh-plugin-constellation/bg",
          handler: (request: any, response: any) => {
            if (request.method !== "GET") {
              response.writeHead(405, { allow: "GET" });
              response.end();
              return;
            }
            try {
              const s = loadSettings();
              const file = join(settingsDir(), "bg-image.bin");
              if (!s.imageMime || !existsSync(file)) {
                response.writeHead(404, { "content-type": "application/json" });
                response.end(JSON.stringify({ error: "no background image" }));
                return;
              }
              response.writeHead(200, {
                "content-type": s.imageMime,
                "cache-control": "no-store",
              });
              response.end(readFileSync(file));
            } catch (err) {
              json(response, 500, { error: String(err) });
            }
          },
        }));

        return () => {
          for (const dispose of disposers) {
            try { dispose?.(); } catch { /* ignore */ }
          }
        };
      },
      "dsh-plugin-constellation: http routes"
    );
  });
}
