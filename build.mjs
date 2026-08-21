/**
 * Build script for dsh-plugin-constellation.
 * - host side: tsc emit to lib/ (Cordis loader entry, no default export)
 * - client side: esbuild bundle → client/client.js wrapped in __ModuleLoader__ shell
 */
import { build } from "esbuild";
import { execFileSync } from "node:child_process";
import { mkdirSync, writeFileSync, readFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));

// ── host: tsc emit ──
console.log("[build] host tsc emit…");
execFileSync("cmd", ["/c", "npx", "tsc", "-p", "tsconfig.json"], { cwd: root, stdio: "inherit" });

// ── client: esbuild bundle ──
console.log("[build] client esbuild…");
const entry = join(root, "src/client/index.tsx");
const result = await build({
  entryPoints: [entry],
  bundle: true,
  format: "cjs",
  platform: "browser",
  target: "es2022",
  jsx: "automatic",
  external: [
    "react",
    "react-dom",
    "react/jsx-runtime",
    "@deepseek-ai/cordis",
    "@deepseek-ai/dsh-client-runtime",
    "@deepseek-ai/dsh-client-locale",
    "@deepseek-ai/dsh-client-ui-theme",
    "@deepseek-ai/dsh-client-ui-primitives",
    "@deepseek-ai/dsh-client-ui-sidebar",
    "@deepseek-ai/dsh-client-ui-slots",
    "@deepseek-ai/dsh-client-connection",
    "@deepseek-ai/dsh-client-modules",
  ],
  write: false,
  legalComments: "none",
  logLevel: "warning",
});

const code = result.outputFiles[0].text;
const shell = `window.__ModuleLoader__.load({\n  id: "dsh-plugin-constellation",\n  factory: (require) => {\n    var module = { exports: {} };\n    var exports = module.exports;\n    Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });\n` +
  code.split("\n").map((l) => `    ${l}`).join("\n") +
  `\n    return module.exports;\n  }\n});\n`;

mkdirSync(join(root, "client"), { recursive: true });
writeFileSync(join(root, "client/client.js"), shell, "utf-8");

// host template check: no default export in lib/index.js
const hostJs = readFileSync(join(root, "lib/index.js"), "utf-8");
if (/\bexport\s+default\b/.test(hostJs)) {
  console.error("[build] ERROR: lib/index.js must NOT have a default export");
  process.exit(1);
}

console.log("[build] OK → lib/ + client/client.js");
