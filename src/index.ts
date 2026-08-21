/**
 * dsh-plugin-constellation host entry.
 *
 * Builds the plugin graph by scanning the profile's node_modules for ALL
 * packages (official @deepseek-ai plugins + any third-party plugins the user
 * installs later) and reading their real dependencies/peerDependencies from
 * package.json. Plugin enabled/disabled state is merged from the official
 * plugin inventory (ctx.pluginInventory.list()).
 *
 * Data exposed as JSON HTTP route `/dsh-plugin-constellation/graph` via host
 * webServer (dshmarket-style host→client bridge).
 *
 * NOTE: no default export — the Cordis loader unwraps `exports.default ?? exports`
 * and would drop named exports if a default were present.
 */
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";

export const name = "dsh-plugin-constellation";
export const inject = ["webServer", "loader", "pluginInventory"];

/* ── graph data model ── */
export interface GraphNode {
  id: string;
  label: string;
  category: string;
  enabled: boolean;
  version: string;
  desc: string;
}

export interface GraphLink {
  source: string;
  target: string;
  relation: string;
}

export interface GraphData {
  nodes: GraphNode[];
  links: GraphLink[];
  scannedAt: string;
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

function categorize(moduleName: string): string {
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
  // Third-party user-installed plugins.
  if (moduleName === "dshmarket" || moduleName === "dsh-plugin-constellation") return "第三方插件";
  if (moduleName.startsWith("@")) return "第三方插件";
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

function isPluginShape(name: string): boolean {
  if (name.startsWith("@deepseek-ai/")) return true;
  if (CORE_LIBS.has(name)) return true;
  if (["dshmarket", "dsh-plugin-constellation", "dsh-plugin-desktop", "dsh-community-market", "dsh-market"].includes(name)) return true;
  if (name.startsWith("dsh-plugin-desktop/")) return true;
  if (name.startsWith("dsh-") || name.startsWith("cordis-")) return true;
  if (name.startsWith("@")) {
    const base = name.split("/").pop() || "";
    if (base.startsWith("dsh-") || base.startsWith("cordis-")) return true;
    // known third-party plugin scopes
    if (name.includes("hindsight") || name.includes("coding-agents")) return true;
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

/* ── scan ALL packages in the profile's node_modules layers ── */
function scanAllPackages(profilesRoot: string): Map<string, any> {
  const pkgs = new Map<string, any>(); // module name → package.json
  const layers = [
    join(profilesRoot, "node_modules"),
    join(profilesRoot, "desktop", "node_modules"),
  ];
  const seen = new Set<string>();

  for (const layer of layers) {
    if (!existsSync(layer)) continue;
    // scoped dirs (@deepseek-ai, @bocha-ai, @vectorize-io …)
    let entries: string[] = [];
    try { entries = readdirSync(layer); } catch { continue; }
    for (const entry of entries) {
      if (entry.startsWith(".") || entry === ".pnpm") continue;
      if (entry.startsWith("@")) {
        // scoped package dirs
        let scoped: string[] = [];
        const scopeDir = join(layer, entry);
        try { scoped = readdirSync(scopeDir); } catch { continue; }
        for (const sub of scoped) {
          if (sub.startsWith(".")) continue;
          const fullName = `${entry}/${sub}`;
          if (seen.has(fullName)) continue;
          const pkgJson = join(scopeDir, sub, "package.json");
          if (!existsSync(pkgJson)) continue;
          try {
            const pkg = JSON.parse(readFileSync(pkgJson, "utf-8"));
            pkgs.set(fullName, pkg);
            seen.add(fullName);
          } catch { continue; }
        }
      } else {
        if (seen.has(entry)) continue;
        const pkgJson = join(layer, entry, "package.json");
        if (!existsSync(pkgJson)) continue;
        try {
          const pkg = JSON.parse(readFileSync(pkgJson, "utf-8"));
          pkgs.set(entry, pkg);
          seen.add(entry);
        } catch { continue; }
      }
    }
  }
  return pkgs;
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

  // Official plugin inventory → enabled/disabled state (authoritative).
  const stateMap = new Map<string, boolean>();
  try {
    const result = hostCtx.pluginInventory.list();
    const entries = result?.entries || result || [];
    for (const e of entries) {
      const mn = String(e.moduleName || e.id || "");
      if (mn) stateMap.set(mn, e.enabled !== false);
    }
  } catch { /* ignore */ }

  // Scan every package in the profile.
  const pkgs = scanAllPackages(profilesRoot);

  // Build nodes: keep only plugin-shaped packages.
  for (const [name, pkg] of pkgs) {
    if (!isPluginShape(name)) continue;
    const nodeId = name;
    if (known.has(nodeId)) continue;
    known.add(nodeId);
    const enabled = stateMap.has(name) ? stateMap.get(name)! : true;
    nodes.push({
      id: nodeId,
      label: name,
      category: categorize(nodeId),
      enabled,
      version: pkg?.version || "",
      desc: pkg?.description || "",
    });
  }

  // Build links from every KEPT package's real dependencies (auto-generated).
  const seenEdge = new Set<string>();
  for (const [name, pkg] of pkgs) {
    if (!isPluginShape(name)) continue;
    const sourceId = name;
    if (!known.has(sourceId)) continue;
    const pushLinks = (deps: Record<string, string> | undefined, relation: string) => {
      if (!deps) return;
      for (const dep of Object.keys(deps)) {
        const targetId = known.has(dep) ? dep : null;
        if (!targetId || sourceId === targetId) continue;
        const key = `${sourceId}->${targetId}:${relation}`;
        if (seenEdge.has(key)) continue;
        seenEdge.add(key);
        links.push({ source: sourceId, target: targetId, relation });
      }
    };
    pushLinks(pkg.dependencies, "deps");
    pushLinks(pkg.peerDependencies, "peer");
  }

  return { nodes, links, scannedAt: new Date().toISOString() };
}

/* ── apply: mount the HTTP route ── */
export function apply(ctx: any): void {
  ctx.inject(["webServer", "loader", "pluginInventory"], (hostCtx: any) => {
    hostCtx.effect(
      () => {
        const dispose = hostCtx.webServer.register({
          kind: "exact",
          path: "/dsh-plugin-constellation/graph",
          handler: (request: any, response: any) => {
            if (request.method !== "GET") {
              response.writeHead(405, { allow: "GET" });
              response.end();
              return;
            }
            try {
              const body = JSON.stringify(buildGraph(hostCtx));
              response.writeHead(200, {
                "content-type": "application/json; charset=utf-8",
                "cache-control": "no-store",
              });
              response.end(body);
            } catch (err) {
              response.writeHead(500, { "content-type": "application/json" });
              response.end(JSON.stringify({ error: String(err) }));
            }
          },
        });
        return () => dispose?.();
      },
      "dsh-plugin-constellation: http route"
    );
  });
}
