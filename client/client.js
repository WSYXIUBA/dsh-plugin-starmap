window.__ModuleLoader__.load({
  id: "dsh-plugin-starmap",
  factory: (require) => {
    var module = { exports: {} };
    var exports = module.exports;
    Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
    "use strict";
    var __create = Object.create;
    var __defProp = Object.defineProperty;
    var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames = Object.getOwnPropertyNames;
    var __getProtoOf = Object.getPrototypeOf;
    var __hasOwnProp = Object.prototype.hasOwnProperty;
    var __export = (target, all) => {
      for (var name in all)
        __defProp(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))
          if (!__hasOwnProp.call(to, key) && key !== except)
            __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
      // If the importer is in node compatibility mode or this is not an ESM
      // file that has been converted to a CommonJS file using a Babel-
      // compatible transform (i.e. "__esModule" has not been set), then set
      // "default" to the CommonJS "module.exports" for node compatibility.
      isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
      mod
    ));
    var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
    
    // src/client/index.tsx
    var index_exports = {};
    __export(index_exports, {
      apply: () => apply,
      en: () => en,
      inject: () => inject,
      zh: () => zh
    });
    module.exports = __toCommonJS(index_exports);
    var import_react = __toESM(require("react"), 1);
    var import_react_dom = require("react-dom");
    var zh = {
      "nav.label": "\u661F\u56FE\u8BBE\u7F6E",
      "overlay.title": "\u63D2\u4EF6\u5173\u7CFB\u661F\u56FE",
      "overlay.hint": "\u6EDA\u52A8\u7F29\u653E \xB7 \u62D6\u62FD\u5E73\u79FB \xB7 \u53CC\u51FB\u805A\u7126 \xB7 \u70B9\u51FB\u8BE6\u60C5 \xB7 \u53F3\u952E\u83DC\u5355",
      "footer.tooltip": "\u6253\u5F00\u63D2\u4EF6\u661F\u56FE",
      "search.placeholder": "\u641C\u7D22\u63D2\u4EF6\u2026 (Enter \u8DF3\u8F6C)",
      "layout.ring": "\u5206\u7C7B\u73AF\u5E03\u5C40",
      "layout.force": "\u529B\u5BFC\u5411\u5E03\u5C40",
      "export.png": "\u5BFC\u51FA PNG",
      "export.json": "\u5BFC\u51FA JSON",
      "action.refresh": "\u5237\u65B0",
      "category.showAll": "\u5168\u90E8\u663E\u793A",
      "settings.bgColor": "\u80CC\u666F\u989C\u8272",
      "settings.bgAuto": "\u81EA\u52A8\uFF08\u8DDF\u968F\u4E3B\u9898\uFF09",
      "settings.bgOpacity": "\u80CC\u666F\u4E0D\u900F\u660E\u5EA6",
      "settings.bgOpacityHint": "\u8C03\u4F4E\u53EF\u900F\u89C6\u4E3B\u9875\uFF1B0 \u4E3A\u5B8C\u5168\u900F\u660E",
      "settings.blur": "\u80CC\u666F\u6A21\u7CCA\u5EA6",
      "settings.blurHint": "\u6BDB\u73BB\u7483\uFF1A\u6A21\u7CCA\u900F\u8FC7\u6765\u7684\u4E3B\u9875\u5185\u5BB9\uFF0C\u964D\u4F4E\u4FE1\u606F\u5E72\u6270\uFF1B\u80CC\u666F\u4E0D\u900F\u660E\u5EA6\u4F4E\u4E8E 100% \u65F6\u751F\u6548",
      "settings.bgImage": "\u80CC\u666F\u56FE\u7247",
      "settings.bgImagePick": "\u9009\u62E9\u56FE\u7247\u2026",
      "settings.bgImageClear": "\u6E05\u9664\u56FE\u7247",
      "settings.bgImageHint": "\u652F\u6301 PNG / JPG / WebP / GIF\uFF0C\u2264 12MB\uFF0C\u94FA\u6EE1\u7A97\u53E3\u663E\u793A",
      "settings.preview": "\u9884\u89C8\uFF08\u68CB\u76D8\u683C\u4EE3\u8868\u900F\u660E\uFF09",
      "settings.hint": "\u8BBE\u7F6E\u5373\u65F6\u4FDD\u5B58\uFF0C\u901A\u8FC7\u4FA7\u8FB9\u680F\u5E95\u90E8\u7684 \u{1FA90} \u6309\u94AE\u6253\u5F00\u661F\u56FE\u67E5\u770B\u6548\u679C\u3002",
      "rel.npm": "npm \u4F9D\u8D56",
      "rel.service": "\u670D\u52A1\u6CE8\u5165",
      "rel.client": "\u5BA2\u6237\u7AEF\u6A21\u5757",
      "rel.profile": "Profile"
    };
    var en = {
      "nav.label": "Constellation Settings",
      "overlay.title": "Plugin Constellation Graph",
      "overlay.hint": "Scroll to zoom \xB7 Drag to pan \xB7 Double-click to focus \xB7 Click for details \xB7 Right-click menu",
      "footer.tooltip": "Open plugin graph",
      "search.placeholder": "Search plugins\u2026 (Enter to jump)",
      "layout.ring": "Category ring",
      "layout.force": "Force layout",
      "export.png": "Export PNG",
      "export.json": "Export JSON",
      "action.refresh": "Refresh",
      "category.showAll": "Show all",
      "settings.bgColor": "Background color",
      "settings.bgAuto": "Auto (follow theme)",
      "settings.bgOpacity": "Background opacity",
      "settings.bgOpacityHint": "Lower to see through to the home page; 0 = fully transparent",
      "settings.blur": "Background blur",
      "settings.blurHint": "Frosted glass: blurs the home page showing through, reducing visual noise; visible below 100% opacity",
      "settings.bgImage": "Background image",
      "settings.bgImagePick": "Choose image\u2026",
      "settings.bgImageClear": "Clear image",
      "settings.bgImageHint": "PNG / JPG / WebP / GIF, up to 12MB, cover-fit",
      "settings.preview": "Preview (checkerboard = transparency)",
      "settings.hint": "Saved instantly \u2014 open the graph via the \u{1FA90} button at the sidebar foot.",
      "rel.npm": "npm deps",
      "rel.service": "Service inject",
      "rel.client": "Client modules",
      "rel.profile": "Profile"
    };
    var COL_FAILED = "#ff453a";
    var COL_LOADING = "#ff9f0a";
    var COL_IMPACT = "#ff6482";
    var RELATION_GROUPS = ["deps", "service", "client", "profile"];
    function relationGroup(r) {
      if (r === "service") return "service";
      if (r === "client") return "client";
      if (r === "profile") return "profile";
      return "deps";
    }
    var RELATION_BADGE = {
      deps: "\u4F9D\u8D56",
      peer: "peer",
      service: "\u670D\u52A1",
      client: "\u5BA2\u6237\u7AEF",
      profile: "profile"
    };
    var RELATION_STYLES = [
      { group: "deps", key: "rel.npm", color: "#0071e3", css: "solid", hint: "package.json npm \u4F9D\u8D56\uFF08\u542B peer\uFF09" },
      { group: "service", key: "rel.service", color: "#4dd0e1", css: "dotted", hint: "Cordis \u670D\u52A1\u6CE8\u5165 inject=[\u2026]" },
      { group: "client", key: "rel.client", color: "#af52de", css: "dashed", hint: "dsh.client.inject \u5BA2\u6237\u7AEF\u6A21\u5757" },
      { group: "profile", key: "rel.profile", color: "#9a9aa5", css: "solid", hint: "profile bundle \u5F52\u5C5E" }
    ];
    function escapeHtml(s) {
      return String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
    }
    var ConstellationCanvas = class {
      canvas;
      ctx;
      wrapper;
      tooltip;
      data;
      prepared = [];
      linksIdx = [];
      byNode = /* @__PURE__ */ new Map();
      byNodeOut = /* @__PURE__ */ new Map();
      byNodeIn = /* @__PURE__ */ new Map();
      nodeIndexMap = /* @__PURE__ */ new Map();
      catList = [];
      catMembers = /* @__PURE__ */ new Map();
      catColor = /* @__PURE__ */ new Map();
      hiddenCats = /* @__PURE__ */ new Set();
      hiddenRelations = /* @__PURE__ */ new Set();
      layoutMode = "ring";
      ringPos = /* @__PURE__ */ new Map();
      forcePos = /* @__PURE__ */ new Map();
      impactSet = null;
      impactRoot = -1;
      searchMatches = [];
      searchActive = -1;
      state = {
        panX: 0,
        panY: 0,
        zoom: 0.5,
        targetPanX: 0,
        targetPanY: 0,
        targetZoom: 0.5,
        mouseX: -1,
        mouseY: -1,
        isDragging: false,
        dragStartX: 0,
        dragStartY: 0,
        panStartX: 0,
        panStartY: 0,
        hoverIndex: -1,
        prevHoverIndex: -2,
        W: 0,
        H: 0,
        dpr: 1,
        running: true,
        interacted: false
      };
      raf = 0;
      isDark = false;
      transparent = false;
      resizeObs = null;
      intersectObs = null;
      menuEl = null;
      CATEGORY_COLORS = [
        "#0071e3",
        "#34c759",
        "#ff9f0a",
        "#af52de",
        "#5856d6",
        "#00c7be",
        "#ff375f",
        "#5ac8fa",
        "#ff6482",
        "#a2845e",
        "#8e8e93",
        "#d4a017",
        "#30b0c7",
        "#c2402a",
        "#7d7aff",
        "#4dd0e1",
        "#9a9aa5"
      ];
      /** one-time stylesheet for hover states (inline handlers are CSP-blocked) */
      ensureStyles() {
        if (document.getElementById("dshpg-styles")) return;
        const style = document.createElement("style");
        style.id = "dshpg-styles";
        style.textContent = ".dshpg-menu-item:hover{background:rgba(128,128,140,0.12);}";
        document.head.appendChild(style);
      }
      constructor(container, data) {
        this.data = data;
        this.wrapper = container;
        this.canvas = document.createElement("canvas");
        this.canvas.style.cssText = "display:block;width:100%;height:100%;cursor:default;";
        this.wrapper.appendChild(this.canvas);
        this.ctx = this.canvas.getContext("2d");
        this.ensureStyles();
        this.tooltip = document.createElement("div");
        this.tooltip.style.cssText = "position:absolute;background:rgba(255,255,255,0.96);border:1px solid rgba(0,0,0,0.08);border-radius:12px;padding:10px 12px;box-shadow:0 12px 40px rgba(0,0,0,0.14);pointer-events:none;z-index:10;display:none;font-size:12px;max-width:280px;color:#333;";
        this.wrapper.appendChild(this.tooltip);
        this.buildIndex();
        this.bindEvents();
        this.resize();
        this.observeLifecycle();
        this.animate();
      }
      /* ── indexing + layouts ── */
      buildIndex() {
        const { nodes, links } = this.data;
        this.nodeIndexMap = /* @__PURE__ */ new Map();
        this.catMembers = /* @__PURE__ */ new Map();
        this.catList = [];
        nodes.forEach((n, i) => {
          this.nodeIndexMap.set(n.id, i);
          if (!this.catMembers.has(n.category)) {
            this.catMembers.set(n.category, []);
            this.catList.push(n.category);
          }
          this.catMembers.get(n.category).push(i);
        });
        this.catList.forEach((cat, ci) => this.catColor.set(cat, this.CATEGORY_COLORS[ci % this.CATEGORY_COLORS.length]));
        let maxDegree = 1;
        const degreeMap = /* @__PURE__ */ new Map();
        links.forEach((l) => {
          degreeMap.set(l.source, (degreeMap.get(l.source) || 0) + 1);
          degreeMap.set(l.target, (degreeMap.get(l.target) || 0) + 1);
        });
        degreeMap.forEach((v) => {
          if (v > maxDegree) maxDegree = v;
        });
        const clusterRingR = Math.sqrt(Math.max(nodes.length, 1)) * 26;
        const catCentroid = /* @__PURE__ */ new Map();
        this.catList.forEach((cat, ci) => {
          const a = ci / Math.max(this.catList.length, 1) * Math.PI * 2 - Math.PI / 2;
          const members = this.catMembers.get(cat) || [];
          const blobR = 26 + Math.sqrt(members.length) * 10;
          catCentroid.set(cat, { cx: Math.cos(a) * clusterRingR, cy: Math.sin(a) * clusterRingR, r: blobR });
        });
        this.ringPos = /* @__PURE__ */ new Map();
        this.prepared = nodes.map((n, i) => {
          const seed = this.hashStr(n.id);
          const centroid = catCentroid.get(n.category);
          const members = this.catMembers.get(n.category) || [];
          const j = members.indexOf(i);
          const la = j / Math.max(members.length, 1) * Math.PI * 2 + seed % 100 / 100 * 0.6;
          const lr = (centroid?.r || 30) * (0.25 + 0.75 * (Math.abs(seed) % 1e3 / 1e3));
          const wx = (centroid?.cx || 0) + Math.cos(la) * lr;
          const wy = (centroid?.cy || 0) + Math.sin(la) * lr;
          this.ringPos.set(i, { x: wx, y: wy });
          const degree = degreeMap.get(n.id) || 0;
          return {
            node: n,
            x: wx,
            y: wy,
            tx: wx,
            ty: wy,
            color: this.catColor.get(n.category) || "#0071e3",
            heat: this.heatColor(Math.sqrt(degree / maxDegree)),
            linkCount: degree,
            phase: seed % 1e3 / 1e3 * Math.PI * 2,
            enabled: n.enabled
          };
        });
        this.computeForceLayout();
        this.linksIdx = [];
        this.byNode = /* @__PURE__ */ new Map();
        this.byNodeOut = /* @__PURE__ */ new Map();
        this.byNodeIn = /* @__PURE__ */ new Map();
        links.forEach((link, li) => {
          const ai = this.nodeIndexMap.get(link.source);
          const bi = this.nodeIndexMap.get(link.target);
          if (ai === void 0 || bi === void 0) return;
          const idx = this.linksIdx.length;
          const both = this.data.nodes[ai].enabled && this.data.nodes[bi].enabled;
          const group = relationGroup(link.relation);
          const color = group === "service" ? this.prepared[bi].color : group === "profile" ? "#9a9aa5" : this.prepared[ai].color;
          this.linksIdx.push({ a: ai, b: bi, on: both, color, relation: link.relation, group });
          if (!this.byNode.has(ai)) this.byNode.set(ai, []);
          if (!this.byNode.has(bi)) this.byNode.set(bi, []);
          this.byNode.get(ai).push(idx);
          this.byNode.get(bi).push(idx);
          if (!this.byNodeOut.has(ai)) this.byNodeOut.set(ai, []);
          this.byNodeOut.get(ai).push(idx);
          if (!this.byNodeIn.has(bi)) this.byNodeIn.set(bi, []);
          this.byNodeIn.get(bi).push(idx);
        });
      }
      /** deterministic force-directed layout seeded from the ring positions */
      computeForceLayout() {
        const n = this.prepared.length;
        const pos = /* @__PURE__ */ new Map();
        for (let i = 0; i < n; i++) {
          const r = this.ringPos.get(i);
          pos.set(i, { x: r.x * 0.9, y: r.y * 0.9 });
        }
        const edges = [];
        for (const link of this.data.links) {
          const ai = this.nodeIndexMap.get(link.source);
          const bi = this.nodeIndexMap.get(link.target);
          if (ai !== void 0 && bi !== void 0) edges.push([ai, bi]);
        }
        const rest = 110;
        const iter = 260;
        const maxR = Math.sqrt(Math.max(n, 1)) * 26 * 1.15;
        for (let it = 0; it < iter; it++) {
          const fx = new Float64Array(n);
          const fy = new Float64Array(n);
          for (let i = 0; i < n; i++) {
            const a = pos.get(i);
            for (let j = i + 1; j < n; j++) {
              const b = pos.get(j);
              let dx = a.x - b.x, dy = a.y - b.y;
              let d2 = dx * dx + dy * dy;
              if (d2 < 1) {
                d2 = 1;
                dx = 0.5 + i % 7 * 0.01;
                dy = -0.4;
              }
              const f = 2600 / d2;
              const d = Math.sqrt(d2);
              fx[i] += dx / d * f;
              fy[i] += dy / d * f;
              fx[j] -= dx / d * f;
              fy[j] -= dy / d * f;
            }
          }
          for (const [ai, bi] of edges) {
            const a = pos.get(ai), b = pos.get(bi);
            const dx = b.x - a.x, dy = b.y - a.y;
            const d = Math.sqrt(dx * dx + dy * dy) || 1;
            const f = (d - rest) * 0.035;
            fx[ai] += dx / d * f;
            fy[ai] += dy / d * f;
            fx[bi] -= dx / d * f;
            fy[bi] -= dy / d * f;
          }
          const damp = 0.6;
          for (let i = 0; i < n; i++) {
            const p = pos.get(i);
            fx[i] += -p.x * 0.012;
            fy[i] += -p.y * 0.012;
            let nx = p.x + fx[i] * damp;
            let ny = p.y + fy[i] * damp;
            const dc = Math.sqrt(nx * nx + ny * ny);
            if (dc > maxR * 1.6) {
              nx = nx / dc * maxR * 1.6;
              ny = ny / dc * maxR * 1.6;
            }
            p.x = nx;
            p.y = ny;
          }
        }
        this.forcePos = pos;
      }
      setLayout(mode, refit = false) {
        this.layoutMode = mode;
        const src = mode === "ring" ? this.ringPos : this.forcePos;
        for (let i = 0; i < this.prepared.length; i++) {
          const p = src.get(i);
          if (p) {
            this.prepared[i].tx = p.x;
            this.prepared[i].ty = p.y;
          }
        }
        if (refit) {
          this.state.interacted = false;
          this.fitView();
        }
      }
      getLayout() {
        return this.layoutMode;
      }
      hashStr(s) {
        let h = 0;
        for (let i = 0; i < s.length; i++) h = (h << 5) - h + s.charCodeAt(i) | 0;
        return h;
      }
      hexToRgba(hex, alpha) {
        if (!hex.startsWith("#")) return hex;
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r},${g},${b},${alpha})`;
      }
      heatColor(t) {
        const v = Math.max(0, Math.min(1, t));
        const stops = [[56, 130, 220], [170, 130, 200], [240, 100, 60]];
        const seg = v * (stops.length - 1);
        const i = Math.min(Math.floor(seg), stops.length - 2);
        const frac = seg - i;
        const a = stops[i], b = stops[i + 1];
        const r = Math.round(a[0] + (b[0] - a[0]) * frac);
        const g = Math.round(a[1] + (b[1] - a[1]) * frac);
        const bl = Math.round(a[2] + (b[2] - a[2]) * frac);
        return `rgb(${r},${g},${bl})`;
      }
      lerp(a, b, t) {
        return a + (b - a) * t;
      }
      /* ── lifecycle observers: resize + pause rendering when hidden ── */
      observeLifecycle() {
        if (typeof ResizeObserver !== "undefined") {
          this.resizeObs = new ResizeObserver(() => this.resize());
          this.resizeObs.observe(this.wrapper);
        }
        if (typeof IntersectionObserver !== "undefined") {
          this.intersectObs = new IntersectionObserver((es) => {
            for (const e of es) this.setRunning(e.isIntersecting && !document.hidden);
          });
          this.intersectObs.observe(this.wrapper);
        }
        document.addEventListener("visibilitychange", this.onVisChange);
      }
      onVisChange = () => {
        const vis = !document.hidden && this.wrapper.isConnected;
        this.setRunning(vis);
      };
      setRunning(run) {
        if (run === this.state.running) return;
        this.state.running = run;
        if (run) this.animate();
        else cancelAnimationFrame(this.raf);
      }
      resize() {
        const dpr = window.devicePixelRatio || 1;
        const rect = this.canvas.getBoundingClientRect();
        if (rect.width < 2 || rect.height < 2) return;
        this.state.W = rect.width;
        this.state.H = rect.height;
        this.canvas.width = rect.width * dpr;
        this.canvas.height = rect.height * dpr;
        this.state.dpr = dpr;
        if (!this.state.interacted) this.fitView();
      }
      fitView() {
        let maxR = 0;
        for (const p of this.prepared) {
          const d = Math.sqrt(p.tx * p.tx + p.ty * p.ty);
          if (d > maxR) maxR = d;
        }
        const fitZoom = maxR > 0 ? Math.min(this.state.W, this.state.H) / (maxR * 1.25) : 0.5;
        this.state.zoom = fitZoom;
        this.state.targetZoom = fitZoom;
        this.state.targetPanX = 0;
        this.state.targetPanY = 0;
      }
      /* ── status helpers ── */
      isFailed(i) {
        return this.data.nodes[i]?.phase === "failed";
      }
      isBusy(i) {
        const p = this.data.nodes[i]?.phase;
        return p === "loading" || p === "pending" || p === "unloading";
      }
      animate = () => {
        const s = this.state;
        if (!s.running) return;
        s.panX = this.lerp(s.panX, s.targetPanX, 0.12);
        s.panY = this.lerp(s.panY, s.targetPanY, 0.12);
        s.zoom = this.lerp(s.zoom, s.targetZoom, 0.12);
        const { W, H, dpr, zoom, panX, panY, mouseX, mouseY, hoverIndex } = s;
        const cx = W / 2 + panX;
        const cy = H / 2 + panY;
        const margin = 60;
        const ctx = this.ctx;
        const time = (typeof performance !== "undefined" ? performance.now() : 0) / 1e3;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, W, H);
        if (!this.transparent) {
          ctx.fillStyle = this.isDark ? "#0f0f14" : "#ffffff";
          ctx.fillRect(0, 0, W, H);
        }
        const prepared = this.prepared;
        const screenX = new Float32Array(prepared.length);
        const screenY = new Float32Array(prepared.length);
        const visible = new Uint8Array(prepared.length);
        const shownCat = new Uint8Array(prepared.length);
        for (let i = 0; i < prepared.length; i++) {
          const n = prepared[i];
          n.x += (n.tx - n.x) * 0.06;
          n.y += (n.ty - n.y) * 0.06;
          const driftX = 14 * Math.sin(time * 0.6 + n.phase);
          const driftY = 14 * Math.cos(time * 0.5 + n.phase * 1.3);
          const sx = cx + (n.x + driftX) * zoom;
          const sy = cy + (n.y + driftY) * zoom;
          screenX[i] = sx;
          screenY[i] = sy;
          const onScreen = sx > -margin && sx < W + margin && sy > -margin && sy < H + margin ? 1 : 0;
          shownCat[i] = this.hiddenCats.has(n.node.category) ? 0 : 1;
          visible[i] = onScreen && shownCat[i];
        }
        if (mouseX >= 0 && !s.isDragging) {
          let bestDist = zoom > 1.5 ? 80 : 30;
          let bestIdx = -1;
          for (let i = 0; i < prepared.length; i++) {
            if (!visible[i]) continue;
            const dx = mouseX - screenX[i];
            const dy = mouseY - screenY[i];
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < bestDist) {
              bestDist = dist;
              bestIdx = i;
            }
          }
          s.hoverIndex = bestIdx;
        }
        const hoveredLinks = /* @__PURE__ */ new Set();
        if (hoverIndex >= 0) {
          const myLinks = this.byNode.get(hoverIndex) || [];
          for (const li of myLinks) {
            if (!this.hiddenRelations.has(this.linksIdx[li].group)) hoveredLinks.add(li);
          }
        }
        const lineStyle = (link) => {
          switch (link.group) {
            case "service":
              return { dash: [2, 5], width: 0.7, alphaMul: 0.9, flow: true };
            case "client":
              return { dash: [7, 4], width: 0.55, alphaMul: 0.85, flow: false };
            case "profile":
              return { dash: [1, 4], width: 0.4, alphaMul: 0.45, flow: false };
            default:
              return { dash: [3, 5], width: 0.6, alphaMul: 1.2, flow: true };
          }
        };
        let linksDrawn = 0;
        if (hoverIndex >= 0) {
          for (const li of hoveredLinks) {
            const link = this.linksIdx[li];
            const ax = screenX[link.a], ay = screenY[link.a];
            const bx = screenX[link.b], by = screenY[link.b];
            const style = lineStyle(link);
            const inImpact = this.impactSet !== null;
            if (link.on) {
              ctx.strokeStyle = inImpact ? COL_IMPACT : link.color;
              ctx.globalAlpha = 0.55;
              ctx.lineWidth = Math.max(style.width, 1.2);
            } else {
              ctx.strokeStyle = this.isDark ? "#3a3a44" : "#c7c7cc";
              ctx.globalAlpha = 0.45;
              ctx.lineWidth = 1;
              ctx.setLineDash([4, 4]);
            }
            const midX = (ax + bx) / 2 + (by - ay) * 0.08;
            const midY = (ay + by) / 2 - (bx - ax) * 0.08;
            ctx.beginPath();
            ctx.moveTo(ax, ay);
            ctx.quadraticCurveTo(midX, midY, bx, by);
            ctx.stroke();
            ctx.setLineDash([]);
            if (link.on && style.flow) {
              const fromHovered = link.a === hoverIndex;
              const raw = (time * 0.22 + li % 13 / 13) % 1;
              const u = fromHovered ? raw : 1 - raw;
              const iu = 1 - u;
              const px = iu * iu * ax + 2 * iu * u * midX + u * u * bx;
              const py = iu * iu * ay + 2 * iu * u * midY + u * u * by;
              ctx.globalAlpha = 0.9 * (0.4 + 0.6 * Math.sin(u * Math.PI));
              ctx.fillStyle = inImpact ? COL_IMPACT : link.color;
              ctx.shadowColor = inImpact ? COL_IMPACT : link.color;
              ctx.shadowBlur = 6;
              ctx.beginPath();
              ctx.arc(px, py, 2, 0, Math.PI * 2);
              ctx.fill();
              ctx.shadowBlur = 0;
            }
            linksDrawn++;
          }
          ctx.globalAlpha = 1;
        } else {
          const shimmer = 1 + 0.18 * Math.sin(time * 0.6);
          const baseAlpha = (0.3 + Math.min(zoom * 0.08, 0.22)) * shimmer;
          for (const link of this.linksIdx) {
            if (this.hiddenRelations.has(link.group)) continue;
            if (!shownCat[link.a] || !shownCat[link.b]) continue;
            const ax = screenX[link.a], ay = screenY[link.a];
            const bx = screenX[link.b], by = screenY[link.b];
            if (ax < -margin && bx < -margin || ax > W + margin && bx > W + margin || ay < -margin && by < -margin || ay > H + margin && by > H + margin) continue;
            const style = lineStyle(link);
            const impactLink = this.impactSet !== null && this.impactSet.has(link.a) && this.impactSet.has(link.b);
            if (impactLink) {
              ctx.strokeStyle = COL_IMPACT;
              ctx.globalAlpha = 0.7;
              ctx.lineWidth = 1.2;
              ctx.setLineDash([]);
            } else if (link.on) {
              ctx.strokeStyle = link.color;
              ctx.globalAlpha = this.impactSet !== null ? baseAlpha * 0.4 : baseAlpha * style.alphaMul;
              ctx.lineWidth = style.width;
              ctx.setLineDash(style.dash);
              ctx.lineDashOffset = -time * 14;
            } else {
              ctx.strokeStyle = this.isDark ? "#3a3a44" : "#c7c7cc";
              ctx.globalAlpha = baseAlpha * 0.8;
              ctx.lineWidth = Math.max(style.width * 0.7, 0.4);
              ctx.setLineDash([3, 4]);
            }
            const midX = (ax + bx) / 2 + (by - ay) * 0.08;
            const midY = (ay + by) / 2 - (bx - ax) * 0.08;
            ctx.beginPath();
            ctx.moveTo(ax, ay);
            ctx.quadraticCurveTo(midX, midY, bx, by);
            ctx.stroke();
            ctx.setLineDash([]);
            ctx.lineDashOffset = 0;
            linksDrawn++;
          }
          ctx.globalAlpha = 1;
        }
        ctx.save();
        ctx.lineJoin = "round";
        for (const cat of this.catList) {
          if (this.hiddenCats.has(cat)) continue;
          const members = this.catMembers.get(cat) || [];
          const pts = [];
          for (const idx of members) {
            if (idx < screenX.length && visible[idx]) pts.push([screenX[idx], screenY[idx]]);
          }
          if (pts.length === 0) continue;
          let mx = 0, my = 0;
          for (const [x, y] of pts) {
            mx += x;
            my += y;
          }
          mx /= pts.length;
          my /= pts.length;
          const color = this.catColor.get(cat) || "#0071e3";
          const pad = 22;
          let rad = pad;
          ctx.fillStyle = this.hexToRgba(color, 0.07);
          ctx.strokeStyle = this.hexToRgba(color, 0.25);
          ctx.lineWidth = 1;
          ctx.beginPath();
          if (pts.length < 3) {
            for (const [x, y] of pts) rad = Math.max(rad, Math.hypot(x - mx, y - my) + pad);
            ctx.arc(mx, my, rad, 0, Math.PI * 2);
          } else {
            const hull = this.convexHull(pts);
            for (let j = 0; j < hull.length; j++) {
              const [hx, hy] = hull[j];
              const dx = hx - mx, dy = hy - my;
              const d = Math.hypot(dx, dy) || 1;
              const ex = hx + dx / d * pad;
              const ey = hy + dy / d * pad;
              if (j === 0) ctx.moveTo(ex, ey);
              else ctx.lineTo(ex, ey);
            }
            ctx.closePath();
          }
          ctx.fill();
          ctx.stroke();
          if (zoom > 0.12) {
            ctx.font = "600 11px -apple-system, 'PingFang SC', sans-serif";
            const tw = ctx.measureText(cat).width;
            const padX = 8, pillH = 18;
            let topY = my;
            for (const [, y] of pts) topY = Math.min(topY, y);
            const ly = topY - pad - 10;
            const pw = tw + padX * 2;
            ctx.fillStyle = this.hiddenCats.has(cat) ? this.hexToRgba(color, 0.35) : color;
            ctx.beginPath();
            if (typeof ctx.roundRect === "function") ctx.roundRect(mx - pw / 2, ly - pillH / 2, pw, pillH, 9);
            else ctx.rect(mx - pw / 2, ly - pillH / 2, pw, pillH);
            ctx.fill();
            ctx.fillStyle = "#ffffff";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(cat, mx, ly + 0.5);
          }
        }
        ctx.restore();
        ctx.textAlign = "left";
        ctx.textBaseline = "alphabetic";
        const GRID_CELL = 90;
        const labelGrid = /* @__PURE__ */ new Set();
        const canPlace = (lx, ly, lw, lh) => {
          const c0 = Math.floor(lx / GRID_CELL), c1 = Math.floor((lx + lw) / GRID_CELL);
          const r0 = Math.floor(ly / GRID_CELL), r1 = Math.floor((ly + lh) / GRID_CELL);
          for (let c = c0; c <= c1; c++)
            for (let r = r0; r <= r1; r++) if (labelGrid.has(`${c},${r}`)) return false;
          return true;
        };
        const claim = (lx, ly, lw, lh) => {
          const c0 = Math.floor(lx / GRID_CELL), c1 = Math.floor((lx + lw) / GRID_CELL);
          const r0 = Math.floor(ly / GRID_CELL), r1 = Math.floor((ly + lh) / GRID_CELL);
          for (let c = c0; c <= c1; c++) for (let r = r0; r <= r1; r++) labelGrid.add(`${c},${r}`);
        };
        let labelsShown = 0, visibleCount = 0;
        const order = [];
        for (let i = 0; i < prepared.length; i++) {
          if (!visible[i]) continue;
          if (i === hoverIndex) continue;
          order.push(i);
        }
        if (hoverIndex >= 0 && visible[hoverIndex]) order.push(hoverIndex);
        for (const i of order) {
          const n = prepared[i];
          const sx = screenX[i], sy = screenY[i];
          visibleCount++;
          const isHovered = i === hoverIndex;
          const isNeighbor = hoveredLinks.size > 0 && (this.byNode.get(i) || []).some((li) => hoveredLinks.has(li));
          const inImpact = this.impactSet?.has(i) === true;
          const isMatch = this.searchMatches.includes(i);
          const isActiveMatch = this.searchActive === i;
          const rawR = n.enabled ? 3.2 + Math.min(n.linkCount * 0.18, 3.2) : 2.2 + Math.min(n.linkCount * 0.12, 2.4);
          const pulse = n.enabled ? 1 + 0.13 * Math.sin(time * 1.05 + n.phase) : 1;
          const baseR = rawR * pulse;
          const r = Math.max(1.8, baseR * Math.min(zoom, 2));
          const twinkleAlpha = n.enabled ? 0.82 + 0.18 * Math.sin(time * 1.4 + n.phase * 2.1) : 1;
          const baseAlpha = n.enabled ? (0.65 + Math.min(n.linkCount * 0.035, 0.3)) * twinkleAlpha : 0.45;
          let fill = n.enabled ? n.heat : this.isDark ? "#1a1a22" : "#ffffff";
          if (this.isFailed(i)) fill = COL_FAILED;
          else if (this.isBusy(i)) fill = COL_LOADING;
          ctx.beginPath();
          ctx.arc(sx, sy, r, 0, Math.PI * 2);
          ctx.fillStyle = fill;
          const dimOthers = hoverIndex >= 0 && !isHovered && !isNeighbor || this.impactSet !== null && !inImpact && !isHovered;
          ctx.globalAlpha = isHovered ? 1 : isNeighbor || inImpact ? 0.95 : dimOthers ? 0.08 : baseAlpha;
          if (isHovered || isNeighbor || inImpact || isActiveMatch) {
            ctx.shadowColor = inImpact ? COL_IMPACT : isActiveMatch ? "#5ac8fa" : n.heat;
            ctx.shadowBlur = isHovered ? 20 : 10;
          }
          ctx.fill();
          if (!n.enabled) {
            ctx.globalAlpha = isHovered ? 1 : 0.7;
            ctx.strokeStyle = this.isDark ? "#4a4a54" : "#b0b0b8";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(sx, sy, r, 0, Math.PI * 2);
            ctx.stroke();
          }
          if (this.isFailed(i)) {
            ctx.globalAlpha = 0.9;
            ctx.strokeStyle = COL_FAILED;
            ctx.lineWidth = 1.5;
            ctx.setLineDash([3, 3]);
            ctx.beginPath();
            ctx.arc(sx, sy, r + 3.5, 0, Math.PI * 2);
            ctx.stroke();
            ctx.setLineDash([]);
          }
          if (n.node.orphan && !this.isFailed(i)) {
            ctx.globalAlpha = 0.55;
            ctx.strokeStyle = this.isDark ? "#6a6a74" : "#c7c7cc";
            ctx.lineWidth = 1;
            ctx.setLineDash([2, 3]);
            ctx.beginPath();
            ctx.arc(sx, sy, r + 3, 0, Math.PI * 2);
            ctx.stroke();
            ctx.setLineDash([]);
          }
          if (isMatch) {
            ctx.globalAlpha = isActiveMatch ? 0.95 : 0.55;
            ctx.strokeStyle = "#5ac8fa";
            ctx.lineWidth = isActiveMatch ? 2 : 1.2;
            ctx.beginPath();
            ctx.arc(sx, sy, r + (isActiveMatch ? 6 : 4.5), 0, Math.PI * 2);
            ctx.stroke();
          }
          if (n.enabled && n.linkCount > 3 && !isHovered && hoverIndex < 0 && this.impactSet === null) {
            const twinkle = 1 + 0.25 * Math.sin(time * 0.9 + n.phase * 1.7);
            ctx.beginPath();
            ctx.arc(sx, sy, r * 2, 0, Math.PI * 2);
            ctx.fillStyle = n.heat;
            ctx.globalAlpha = (0.05 + Math.min(n.linkCount * 4e-3, 0.07)) * twinkle;
            ctx.fill();
          }
          ctx.shadowBlur = 0;
          ctx.globalAlpha = 1;
          const display = n.node.label || n.node.id;
          const text = display.length > 18 ? display.substring(0, 17) + "\u2026" : display;
          ctx.font = '11px -apple-system, "PingFang SC", sans-serif';
          if (isHovered) {
            ctx.fillStyle = this.isDark ? "#e4e4e7" : "#18181b";
            ctx.globalAlpha = 1;
            ctx.textAlign = "left";
            ctx.fillText(text, sx + r + 5, sy + 4);
            ctx.globalAlpha = 1;
            labelsShown++;
          } else if (zoom > 1.5 || isNeighbor || isActiveMatch || inImpact && zoom > 0.5) {
            const lw = 155, lh = 16;
            const lx = sx + r + 5;
            const ly = sy - 8;
            if (canPlace(lx, ly, lw, lh)) {
              claim(lx, ly, lw, lh);
              ctx.fillStyle = isNeighbor || inImpact ? this.isDark ? "#a8a8b0" : "#6e6e73" : this.isDark ? "#707078" : "#a1a1a6";
              ctx.globalAlpha = 0.9;
              ctx.textAlign = "left";
              ctx.fillText(text, lx, ly + 12);
              ctx.globalAlpha = 1;
              labelsShown++;
            }
          }
        }
        ctx.font = '11px "SF Mono", "Fira Code", Consolas, monospace';
        ctx.fillStyle = this.isDark ? "#707078" : "#a1a1a6";
        ctx.textAlign = "left";
        ctx.fillText(`\u6EDA\u52A8\u7F29\u653E \xB7 \u62D6\u62FD\u5E73\u79FB \xB7 \u53CC\u51FB\u805A\u7126 \xB7 \u70B9\u51FB\u8BE6\u60C5 \xB7 \u53F3\u952E\u83DC\u5355`, 12, 16);
        ctx.font = '10px "SF Mono", "Fira Code", Consolas, monospace';
        ctx.fillText(`\u5173\u7CFB\u7EBF: npm \u5B9E\u7EBF \xB7 \u670D\u52A1 \u70B9\u7EBF \xB7 \u5BA2\u6237\u7AEF \u865A\u7EBF \xB7 Profile \u7070\u7EBF`, 12, H - 28);
        ctx.font = '11px "SF Mono", "Fira Code", Consolas, monospace';
        ctx.fillText(`\u7F29\u653E ${zoom.toFixed(2)}x \xB7 \u53EF\u89C1 ${visibleCount} \u8282\u70B9 \xB7 \u5173\u7CFB\u7EBF ${linksDrawn}${this.impactSet ? ` \xB7 \u5F71\u54CD\u5206\u6790 ${this.impactSet.size} \u8282\u70B9` : ""}`, 12, H - 12);
        ctx.textAlign = "left";
        ctx.font = "600 10px -apple-system, sans-serif";
        ctx.fillStyle = this.isDark ? "#a8a8b0" : "#8e8e93";
        ctx.fillText("\u8FDE\u63A5\u5EA6", 12, 36);
        const gradW = 110;
        for (let gx = 0; gx < gradW; gx++) {
          ctx.fillStyle = this.heatColor(gx / gradW);
          ctx.fillRect(12 + gx, 41, 1, 5);
        }
        ctx.font = '10px "SF Mono", Consolas, monospace';
        ctx.fillStyle = this.isDark ? "#a1a1a6" : "#a1a1a6";
        ctx.fillText("\u5C11", 12, 58);
        ctx.textAlign = "right";
        ctx.fillText("\u591A", 12 + gradW, 58);
        ctx.textAlign = "right";
        ctx.font = "600 10px -apple-system, sans-serif";
        ctx.fillStyle = this.isDark ? "#a8a8b0" : "#8e8e93";
        let lx2 = W - 12;
        ctx.fillText("\u542F\u7528\u5B9E\u7EBF\xB7\u6D41\u52A8", lx2, H - 12);
        const lw2 = ctx.measureText("\u542F\u7528\u5B9E\u7EBF\xB7\u6D41\u52A8").width;
        ctx.strokeStyle = "#0071e3";
        ctx.globalAlpha = 0.6;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(lx2 - lw2 - 34, H - 15);
        ctx.lineTo(lx2 - lw2 - 8, H - 15);
        ctx.stroke();
        ctx.globalAlpha = 1;
        lx2 -= lw2 + 46;
        ctx.fillText("\u7981\u7528\u865A\u7EBF", lx2, H - 12);
        const lw3 = ctx.measureText("\u7981\u7528\u865A\u7EBF").width;
        ctx.strokeStyle = this.isDark ? "#3a3a44" : "#c7c7cc";
        ctx.setLineDash([3, 3]);
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(lx2 - lw3 - 30, H - 15);
        ctx.lineTo(lx2 - lw3 - 8, H - 15);
        ctx.stroke();
        ctx.setLineDash([]);
        lx2 -= lw3 + 42;
        ctx.fillText("\u52A0\u8F7D\u5931\u8D25", lx2, H - 12);
        const lw4 = ctx.measureText("\u52A0\u8F7D\u5931\u8D25").width;
        ctx.fillStyle = COL_FAILED;
        ctx.beginPath();
        ctx.arc(lx2 - lw4 - 14, H - 15, 3.5, 0, Math.PI * 2);
        ctx.fill();
        lx2 -= lw4 + 40;
        ctx.fillText("\u52A0\u8F7D\u4E2D", lx2, H - 12);
        const lw5 = ctx.measureText("\u52A0\u8F7D\u4E2D").width;
        ctx.fillStyle = COL_LOADING;
        ctx.beginPath();
        ctx.arc(lx2 - lw5 - 14, H - 15, 3.5, 0, Math.PI * 2);
        ctx.fill();
        this.raf = requestAnimationFrame(this.animate);
      };
      convexHull(points) {
        if (points.length < 3) return points.slice();
        const pts = points.slice().sort((a, b) => a[0] - b[0] || a[1] - b[1]);
        const cross = (o, a, b) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
        const lower = [];
        const upper = [];
        for (const p of pts) {
          while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], p) <= 0) lower.pop();
          lower.push(p);
        }
        for (let i = pts.length - 1; i >= 0; i--) {
          const p = pts[i];
          while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], p) <= 0) upper.pop();
          upper.push(p);
        }
        lower.pop();
        upper.pop();
        return lower.concat(upper);
      }
      /* ── events ── */
      bindEvents() {
        const canvas = this.canvas;
        canvas.addEventListener("wheel", (e) => {
          e.preventDefault();
          this.state.interacted = true;
          const rect = canvas.getBoundingClientRect();
          const mx = e.clientX - rect.left, my = e.clientY - rect.top;
          const factor = e.deltaY > 0 ? 0.9 : 1.1;
          const newZoom = Math.max(0.03, Math.min(8, this.state.targetZoom * factor));
          const wx = (mx - this.state.W / 2 - this.state.panX) / this.state.targetZoom;
          const wy = (my - this.state.H / 2 - this.state.panY) / this.state.targetZoom;
          this.state.targetPanX = mx - this.state.W / 2 - wx * newZoom;
          this.state.targetPanY = my - this.state.H / 2 - wy * newZoom;
          this.state.targetZoom = newZoom;
        }, { passive: false });
        canvas.addEventListener("mousemove", (e) => {
          const rect = canvas.getBoundingClientRect();
          const mx = e.clientX - rect.left, my = e.clientY - rect.top;
          this.state.mouseX = mx;
          this.state.mouseY = my;
          if (this.state.isDragging) {
            this.state.targetPanX = this.state.panStartX + (e.clientX - this.state.dragStartX);
            this.state.targetPanY = this.state.panStartY + (e.clientY - this.state.dragStartY);
            this.tooltip.style.display = "none";
          } else {
            this.updateTooltip(mx, my);
          }
        });
        canvas.addEventListener("mousedown", (e) => {
          this.state.isDragging = true;
          this.state.interacted = true;
          this.state.dragStartX = e.clientX;
          this.state.dragStartY = e.clientY;
          this.state.panStartX = this.state.panX;
          this.state.panStartY = this.state.panY;
        });
        canvas.addEventListener("mouseup", () => {
          if (this.state.isDragging) {
            const dx = Math.abs(this.state.panX - this.state.panStartX);
            const dy = Math.abs(this.state.panY - this.state.panStartY);
            if (dx < 3 && dy < 3 && this.state.hoverIndex >= 0) {
              this.showDetail(this.state.hoverIndex);
            } else if (dx < 3 && dy < 3) {
              this.hideDetail();
            }
          }
          this.state.isDragging = false;
        });
        canvas.addEventListener("dblclick", () => {
          if (this.state.hoverIndex >= 0) this.flyToIndex(this.state.hoverIndex, 2.5);
        });
        canvas.addEventListener("contextmenu", (e) => {
          e.preventDefault();
          if (this.state.hoverIndex >= 0) {
            const rect = canvas.getBoundingClientRect();
            this.showMenu(this.state.hoverIndex, e.clientX - rect.left, e.clientY - rect.top);
          } else {
            this.hideMenu();
          }
        });
        canvas.addEventListener("mouseleave", () => {
          this.state.mouseX = -1;
          this.state.mouseY = -1;
          this.state.isDragging = false;
          this.state.hoverIndex = -1;
          this.tooltip.style.display = "none";
        });
      }
      /* ── fly to node ── */
      flyToIndex(idx, zoomLevel = 2.5) {
        const p = this.prepared[idx];
        if (!p) return;
        this.state.interacted = true;
        this.state.targetZoom = zoomLevel;
        this.state.targetPanX = -p.tx * zoomLevel;
        this.state.targetPanY = -p.ty * zoomLevel;
      }
      flyToNode(id, zoomLevel = 2.5) {
        const idx = this.nodeIndexMap.get(id);
        if (idx === void 0) return false;
        this.flyToIndex(idx, zoomLevel);
        return true;
      }
      /* ── search ── */
      setSearch(query) {
        const q = query.trim().toLowerCase();
        if (!q) {
          this.searchMatches = [];
          this.searchActive = -1;
          return 0;
        }
        this.searchMatches = [];
        for (let i = 0; i < this.prepared.length; i++) {
          const n = this.data.nodes[i];
          const hay = `${n.id} ${n.label || ""} ${n.category} ${n.desc || ""}`.toLowerCase();
          if (hay.includes(q)) {
            this.searchMatches.push(i);
          }
        }
        this.searchActive = this.searchMatches.length > 0 ? this.searchMatches[0] : -1;
        if (this.searchActive >= 0) this.flyToIndex(this.searchActive, 2);
        return this.searchMatches.length;
      }
      getSearchState() {
        return { count: this.searchMatches.length, active: this.searchActive >= 0 ? this.searchMatches.indexOf(this.searchActive) + 1 : 0 };
      }
      nextMatch(dir) {
        if (this.searchMatches.length === 0) return;
        const cur = this.searchMatches.indexOf(this.searchActive);
        const next = (cur + dir + this.searchMatches.length) % this.searchMatches.length;
        this.searchActive = this.searchMatches[next];
        this.flyToIndex(this.searchActive, 2);
      }
      /* ── category visibility ── */
      setCategoryHidden(cat, hidden) {
        if (hidden) this.hiddenCats.add(cat);
        else this.hiddenCats.delete(cat);
      }
      isCategoryHidden(cat) {
        return this.hiddenCats.has(cat);
      }
      /* ── relation-type visibility ── */
      setRelationHidden(group, hidden) {
        if (hidden) this.hiddenRelations.add(group);
        else this.hiddenRelations.delete(group);
      }
      isRelationHidden(group) {
        return this.hiddenRelations.has(group);
      }
      getRelationGroups() {
        return [...RELATION_GROUPS];
      }
      getCategories() {
        return this.catList.map((c) => ({
          name: c,
          color: this.catColor.get(c) || "#0071e3",
          count: (this.catMembers.get(c) || []).length
        }));
      }
      /* ── uninstall impact analysis: transitive dependents of a node ──
       * Only npm-dep and client-module lines propagate (they represent real
       * "removing this package breaks the source" relations). Service/profile
       * lines point at hubs and carry no uninstall semantics. */
      computeImpact(idx) {
        const affected = /* @__PURE__ */ new Set([idx]);
        const queue = [idx];
        while (queue.length > 0) {
          const cur = queue.pop();
          for (const li of this.byNodeIn.get(cur) || []) {
            const link = this.linksIdx[li];
            if (link.group !== "deps" && link.group !== "client") continue;
            const src = link.a;
            if (!affected.has(src)) {
              affected.add(src);
              queue.push(src);
            }
          }
        }
        affected.delete(idx);
        return [...affected];
      }
      setImpact(idx) {
        if (idx === null) {
          this.impactSet = null;
          this.impactRoot = -1;
          return;
        }
        const affected = this.computeImpact(idx);
        this.impactRoot = idx;
        this.impactSet = /* @__PURE__ */ new Set([idx, ...affected]);
      }
      getImpact() {
        if (this.impactSet === null) return null;
        return { root: this.impactRoot, affected: this.computeImpact(this.impactRoot) };
      }
      /* ── tooltip (O(1) via adjacency index) ── */
      updateTooltip(mx, my) {
        const idx = this.state.hoverIndex;
        const tip = this.tooltip;
        if (idx < 0 || this.state.isDragging) {
          tip.style.display = "none";
          this.state.prevHoverIndex = -1;
          return;
        }
        const n = this.prepared[idx];
        if (!n) {
          tip.style.display = "none";
          return;
        }
        if (idx !== this.state.prevHoverIndex) {
          this.state.prevHoverIndex = idx;
          const node = n.node;
          const myLinks = this.byNode.get(idx) || [];
          const rels = myLinks.slice(0, 6).map((li) => {
            const link = this.linksIdx[li];
            const other = link.a === idx ? this.data.nodes[link.b] : this.data.nodes[link.a];
            if (!other) return "";
            const on = other.enabled && node.enabled;
            const otherName = other.label || other.id;
            return `<span style="display:inline-flex;align-items:center;gap:4px;margin:1px 4px 1px 0;background:rgba(0,0,0,0.04);border-radius:5px;padding:1px 6px;"><span style="width:5px;height:5px;border-radius:50%;background:${on ? "#34c759" : "#c7c7cc"};display:inline-block;"></span>${escapeHtml(otherName)}<span style="color:#a1a1a6;">${escapeHtml(RELATION_BADGE[link.relation] || link.relation)}</span></span>`;
          }).join("");
          const phaseBadge = node.phase === "failed" ? `<span style="color:${COL_FAILED};font-weight:700;"> \xB7 \u52A0\u8F7D\u5931\u8D25</span>` : node.phase === "loading" || node.phase === "pending" ? `<span style="color:${COL_LOADING};font-weight:700;"> \xB7 \u52A0\u8F7D\u4E2D</span>` : "";
          const orphanBadge = node.orphan ? `<span style="color:#8e8e93;"> \xB7 \u672A\u88AB\u5F15\u7528</span>` : "";
          tip.innerHTML = `
            <div style="font-weight:700;font-size:13px;margin-bottom:4px;">${node.enabled ? "\u25CF" : "\u25CB"} ${escapeHtml(node.hub ? node.label : node.id)}</div>
            <div style="color:#6e6e73;margin-bottom:5px;">${escapeHtml(node.category)} \xB7 ${n.linkCount} \u8FDE\u63A5 \xB7 ${node.enabled ? "\u542F\u7528" : "\u7981\u7528"}${phaseBadge}${orphanBadge}</div>
            <div style="color:#a1a1a6;line-height:1.5;font-size:11.5px;">${escapeHtml(node.desc || "")}</div>
            <div style="margin-top:8px;padding-top:7px;border-top:1px solid rgba(0,0,0,0.06);color:#6e6e73;font-size:11px;line-height:1.7;">${rels || "\u65E0\u8FDE\u63A5"}</div>`;
        }
        tip.style.display = "block";
        const tipW = tip.offsetWidth, tipH = tip.offsetHeight;
        tip.style.left = Math.min(mx + 16, this.state.W - tipW - 12) + "px";
        tip.style.top = Math.min(my + 16, this.state.H - tipH - 12) + "px";
      }
      /* ── detail panel (O(1) via adjacency index) ── */
      detailEl = null;
      showDetail(idx) {
        const n = this.prepared[idx];
        if (!n) return;
        this.hideDetail();
        const node = n.node;
        const el = document.createElement("div");
        el.style.cssText = "position:absolute;top:14px;right:14px;width:280px;max-height:calc(100% - 28px);overflow-y:auto;background:" + (this.isDark ? "rgba(28,28,34,0.94)" : "rgba(255,255,255,0.95)") + ";border:1px solid " + (this.isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)") + ";border-radius:14px;box-shadow:0 16px 48px rgba(0,0,0,0.14);padding:14px;z-index:5;font-size:12px;color:" + (this.isDark ? "#e4e4e7" : "#333") + ";";
        const outLinks = (this.byNodeOut.get(idx) || []).map((li) => this.linksIdx[li]);
        const inLinks = (this.byNodeIn.get(idx) || []).map((li) => this.linksIdx[li]);
        const relRow = (link, arrow) => {
          const otherNode = arrow === "\u2192" ? this.data.nodes[link.b] : this.data.nodes[link.a];
          if (!otherNode) return "";
          const otherName = otherNode.label || otherNode.id;
          const on = otherNode.enabled && node.enabled;
          const badge = RELATION_BADGE[link.relation] || link.relation;
          return `<div data-nav="${escapeHtml(otherNode.id)}" style="padding:3px 7px;border-radius:7px;cursor:pointer;color:${this.isDark ? "#a8a8b0" : "#6e6e73"};display:flex;align-items:center;gap:5px;"><span style="width:5px;height:5px;border-radius:50%;background:${on ? "#34c759" : "#c7c7cc"};flex-shrink:0;"></span><span>${arrow} ${escapeHtml(otherName)}</span><span style="font-size:9px;color:#a1a1a6;background:rgba(0,0,0,0.05);border-radius:4px;padding:1px 5px;margin-left:auto;">${escapeHtml(badge)}</span></div>`;
        };
        const isHub = node.hub === "service" || node.hub === "profile";
        const phasePill = node.phase === "failed" ? `<span style="padding:3px 9px;border-radius:14px;font-size:10.5px;font-weight:600;background:rgba(255,69,58,0.12);color:${COL_FAILED};">\u52A0\u8F7D\u5931\u8D25</span>` : node.phase === "loading" || node.phase === "pending" ? `<span style="padding:3px 9px;border-radius:14px;font-size:10.5px;font-weight:600;background:rgba(255,159,10,0.12);color:${COL_LOADING};">\u52A0\u8F7D\u4E2D</span>` : "";
        const orphanPill = node.orphan ? `<span style="padding:3px 9px;border-radius:14px;font-size:10.5px;font-weight:600;background:rgba(142,142,147,0.14);color:#8e8e93;">\u672A\u88AB\u5F15\u7528</span>` : "";
        const metaRows = [];
        if (node.version) metaRows.push(`<div style="display:flex;gap:6px;"><span style="color:#a1a1a6;width:56px;flex-shrink:0;">\u7248\u672C</span><span>${escapeHtml(node.version)}</span></div>`);
        if (node.installSource) metaRows.push(`<div style="display:flex;gap:6px;"><span style="color:#a1a1a6;width:56px;flex-shrink:0;">\u5B89\u88C5\u6E90</span><span style="word-break:break-all;">${escapeHtml(node.installSource)}</span></div>`);
        if (node.profiles && node.profiles.length > 0) metaRows.push(`<div style="display:flex;gap:6px;"><span style="color:#a1a1a6;width:56px;flex-shrink:0;">Profile</span><span>${escapeHtml(node.profiles.join(", "))}</span></div>`);
        const impactActive = this.impactRoot === idx;
        el.innerHTML = `
          <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:10px;">
            <div style="font-size:14px;font-weight:700;word-break:break-all;">${node.hub === "service" ? "\u2699" : node.hub === "profile" ? "\u25CF" : node.enabled ? "\u25CF" : "\u25CB"} ${escapeHtml(isHub ? node.label : node.id)}</div>
            <button class="dshpg-close" style="background:none;border:none;font-size:17px;color:#a1a1a6;cursor:pointer;padding:2px 4px;">\xD7</button>
          </div>
          <div style="margin-bottom:10px;display:flex;flex-wrap:wrap;gap:5px;">
            ${isHub ? "" : `<span style="padding:3px 9px;border-radius:14px;font-size:10.5px;font-weight:600;background:${node.enabled ? "rgba(52,199,89,0.12)" : "rgba(255,59,48,0.1)"};color:${node.enabled ? "#248a3d" : "#d70015"};">${node.enabled ? "\u542F\u7528" : "\u7981\u7528"}</span>`}
            <span style="padding:3px 9px;border-radius:14px;font-size:10.5px;font-weight:600;background:rgba(0,0,0,0.05);color:#6e6e73;">${escapeHtml(node.category)}</span>
            ${phasePill}${orphanPill}
          </div>
          <div style="margin-bottom:12px;"><div style="font-size:10px;color:#a1a1a6;font-weight:600;letter-spacing:0.5px;text-transform:uppercase;margin-bottom:5px;">\u63CF\u8FF0</div>
            <div style="font-size:12px;color:${this.isDark ? "#a8a8b0" : "#6e6e73"};line-height:1.6;">${escapeHtml(node.desc || "\uFF08\u65E0\u63CF\u8FF0\uFF09")}</div></div>
          ${metaRows.length ? `<div style="margin-bottom:12px;display:flex;flex-direction:column;gap:4px;">${metaRows.join("")}</div>` : ""}
          <div style="margin-bottom:12px;"><div style="font-size:10px;color:#a1a1a6;font-weight:600;letter-spacing:0.5px;text-transform:uppercase;margin-bottom:5px;">\u8FDE\u63A5\u7EDF\u8BA1</div>
            <div style="display:flex;gap:6px;">
              <div style="flex:1;background:rgba(0,0,0,0.03);border-radius:9px;padding:7px;text-align:center;"><div style="font-size:15px;font-weight:700;">${inLinks.length}</div><div style="font-size:9.5px;color:#a1a1a6;">\u5165\u5EA6</div></div>
              <div style="flex:1;background:rgba(0,0,0,0.03);border-radius:9px;padding:7px;text-align:center;"><div style="font-size:15px;font-weight:700;">${outLinks.length}</div><div style="font-size:9.5px;color:#a1a1a6;">\u51FA\u5EA6</div></div>
              <div style="flex:1;background:rgba(0,0,0,0.03);border-radius:9px;padding:7px;text-align:center;"><div style="font-size:15px;font-weight:700;">${n.linkCount}</div><div style="font-size:9.5px;color:#a1a1a6;">\u603B\u8FDE\u63A5</div></div>
            </div></div>
          ${isHub ? "" : `<div style="margin-bottom:12px;"><button class="dshpg-impact" style="width:100%;padding:7px 10px;border-radius:9px;border:1px solid ${impactActive ? COL_IMPACT : this.isDark ? "rgba(255,255,255,0.14)" : "rgba(0,0,0,0.1)"};background:${impactActive ? "rgba(255,100,130,0.12)" : "transparent"};color:${impactActive ? COL_IMPACT : this.isDark ? "#e4e4e7" : "#333"};font-size:11.5px;font-weight:600;cursor:pointer;">${impactActive ? "\u6E05\u9664\u5F71\u54CD\u5206\u6790" : "\u5378\u8F7D\u5F71\u54CD\u5206\u6790"}</button>
            <div class="dshpg-impact-result" style="margin-top:8px;"></div></div>`}
          ${outLinks.length ? `<div style="margin-bottom:12px;"><div style="font-size:10px;color:#a1a1a6;font-weight:600;letter-spacing:0.5px;text-transform:uppercase;margin-bottom:5px;">\u4E0B\u6E38\u5173\u7CFB (${outLinks.length})</div>
            ${outLinks.map((l) => relRow(l, "\u2192")).join("")}</div>` : ""}
          ${inLinks.length ? `<div><div style="font-size:10px;color:#a1a1a6;font-weight:600;letter-spacing:0.5px;text-transform:uppercase;margin-bottom:5px;">\u4E0A\u6E38\u5173\u7CFB (${inLinks.length})</div>
            ${inLinks.map((l) => relRow(l, "\u2190")).join("")}</div>` : ""}`;
        this.wrapper.appendChild(el);
        this.detailEl = el;
        el.querySelector(".dshpg-close")?.addEventListener("click", () => this.hideDetail());
        el.querySelectorAll("[data-nav]").forEach((rowEl) => {
          rowEl.addEventListener("click", () => {
            const target = rowEl.getAttribute("data-nav") || "";
            this.flyToNode(target, 2.5);
          });
        });
        const impactBtn = el.querySelector(".dshpg-impact");
        impactBtn?.addEventListener("click", () => {
          this.setImpact(this.impactRoot === idx ? null : idx);
          this.showDetail(idx);
          const res = this.detailEl?.querySelector(".dshpg-impact-result");
          if (res && this.impactRoot === idx) {
            const affected = this.getImpact().affected;
            res.innerHTML = affected.length === 0 ? `<div style="color:#34c759;font-size:11.5px;">\u2713 \u6CA1\u6709\u63D2\u4EF6\u4F9D\u8D56\u5B83\uFF0C\u53EF\u5B89\u5168\u79FB\u9664</div>` : `<div style="color:${COL_IMPACT};font-size:11.5px;font-weight:600;margin-bottom:4px;">${affected.length} \u4E2A\u63D2\u4EF6\u5C06\u53D7\u5F71\u54CD\uFF1A</div>` + affected.slice(0, 12).map((a) => `<div style="color:${this.isDark ? "#a8a8b0" : "#6e6e73"};font-size:11px;padding:1px 0;">\xB7 ${escapeHtml(this.data.nodes[a]?.id || "")}</div>`).join("") + (affected.length > 12 ? `<div style="color:#a1a1a6;font-size:11px;">\u2026 \u5171 ${affected.length} \u4E2A</div>` : "");
          }
        });
      }
      hideDetail() {
        if (this.detailEl) {
          this.detailEl.remove();
          this.detailEl = null;
        }
        this.hideMenu();
      }
      /* ── right-click context menu ── */
      showMenu(idx, mx, my) {
        this.hideMenu();
        const node = this.data.nodes[idx];
        if (!node) return;
        const el = document.createElement("div");
        el.style.cssText = `position:absolute;left:${Math.min(mx, this.state.W - 190)}px;top:${Math.min(my, this.state.H - 160)}px;background:${this.isDark ? "rgba(28,28,34,0.97)" : "rgba(255,255,255,0.97)"};border:1px solid ${this.isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)"};border-radius:10px;box-shadow:0 12px 36px rgba(0,0,0,0.18);padding:5px;z-index:11;font-size:12px;min-width:150px;`;
        const item = (text) => `<div class="dshpg-menu-item" style="padding:6px 12px;border-radius:7px;cursor:pointer;color:${this.isDark ? "#e4e4e7" : "#333"};">${escapeHtml(text)}</div>`;
        const isHub = node.hub === "service" || node.hub === "profile";
        let html = item("\u{1F3AF} \u805A\u7126\u6B64\u8282\u70B9") + item(isHub ? "\u{1F4CB} \u590D\u5236\u540D\u79F0" : "\u{1F4CB} \u590D\u5236\u5305\u540D");
        if (!isHub) {
          if (node.repository || node.homepage) html += item("\u{1F517} \u6253\u5F00\u4ED3\u5E93\u4E3B\u9875");
          html += item("\u{1F4E6} \u6253\u5F00 npm \u9875\u9762") + item("\u{1F9E9} \u5378\u8F7D\u5F71\u54CD\u5206\u6790");
        }
        el.innerHTML = html;
        this.wrapper.appendChild(el);
        this.menuEl = el;
        const items = el.querySelectorAll("div");
        items.item(0)?.addEventListener("click", () => {
          this.flyToIndex(idx, 2.5);
          this.hideMenu();
        });
        items.item(1)?.addEventListener("click", () => {
          if (navigator.clipboard) navigator.clipboard.writeText(node.id).catch(() => {
          });
          this.hideMenu();
        });
        if (!isHub) {
          if (node.repository || node.homepage) {
            items.item(2)?.addEventListener("click", () => {
              const url = this.normalizeUrl(node.repository || node.homepage || "");
              if (url) window.open(url, "_blank", "noopener");
              this.hideMenu();
            });
            items.item(3)?.addEventListener("click", () => {
              window.open(`https://www.npmjs.com/package/${encodeURIComponent(node.id)}`, "_blank", "noopener");
              this.hideMenu();
            });
            items.item(4)?.addEventListener("click", () => {
              this.setImpact(idx);
              this.showDetail(idx);
              this.hideMenu();
            });
          } else {
            items.item(2)?.addEventListener("click", () => {
              window.open(`https://www.npmjs.com/package/${encodeURIComponent(node.id)}`, "_blank", "noopener");
              this.hideMenu();
            });
            items.item(3)?.addEventListener("click", () => {
              this.setImpact(idx);
              this.showDetail(idx);
              this.hideMenu();
            });
          }
        }
        const close = (e) => {
          if (!el.contains(e.target)) {
            this.hideMenu();
            document.removeEventListener("mousedown", close, true);
          }
        };
        setTimeout(() => document.addEventListener("mousedown", close, true), 0);
      }
      normalizeUrl(url) {
        let u = url.trim();
        if (u.startsWith("git+")) u = u.slice(4);
        if (u.endsWith(".git")) u = u.slice(0, -4);
        if (!/^https?:\/\//.test(u)) {
          if (/^[a-z0-9-]+\/[a-z0-9_.-]+$/i.test(u)) u = `https://github.com/${u}`;
          else return "";
        }
        return u;
      }
      hideMenu() {
        if (this.menuEl) {
          this.menuEl.remove();
          this.menuEl = null;
        }
      }
      /* ── live status refresh (no layout change) ── */
      refreshStatus(entries) {
        for (const e of entries) {
          const mn = String(e.moduleName || e.id || "");
          const idx = this.nodeIndexMap.get(mn);
          if (idx === void 0) continue;
          const node = this.data.nodes[idx];
          node.enabled = e.enabled !== false;
          node.phase = e.fiberPhase === void 0 ? null : e.fiberPhase;
          this.prepared[idx].enabled = node.enabled;
        }
        for (const link of this.linksIdx) {
          link.on = this.data.nodes[link.a].enabled && this.data.nodes[link.b].enabled;
        }
      }
      /* ── full data swap (keep view + hidden cats + layout) ── */
      updateData(next) {
        const sameShape = next.nodes.length === this.data.nodes.length && next.nodes.every((n, i) => n.id === this.data.nodes[i]?.id);
        if (sameShape) {
          next.nodes.forEach((n, i) => {
            this.data.nodes[i] = n;
            this.prepared[i].enabled = n.enabled;
          });
          for (const link of this.linksIdx) {
            link.on = this.data.nodes[link.a].enabled && this.data.nodes[link.b].enabled;
          }
          return;
        }
        this.data = next;
        this.impactSet = null;
        this.impactRoot = -1;
        this.searchMatches = [];
        this.searchActive = -1;
        this.hideDetail();
        this.buildIndex();
        this.setLayout(this.layoutMode, false);
      }
      /* ── exports ── */
      exportPNG() {
        const W = 1920, H = 1200;
        const off = document.createElement("canvas");
        off.width = W;
        off.height = H;
        const c = off.getContext("2d");
        c.fillStyle = this.isDark ? "#0f0f14" : "#ffffff";
        c.fillRect(0, 0, W, H);
        let maxR = 0;
        for (const p of this.prepared) {
          const d = Math.hypot(p.tx, p.ty);
          if (d > maxR) maxR = d;
        }
        const zoom = Math.min(W, H - 80) / (maxR * 2.15);
        const cx = W / 2, cy = (H + 40) / 2;
        for (const link of this.linksIdx) {
          const a = this.prepared[link.a], b = this.prepared[link.b];
          c.strokeStyle = link.color;
          c.globalAlpha = link.on ? 0.25 : 0.12;
          c.lineWidth = 0.8;
          if (!link.on) c.setLineDash([3, 4]);
          c.beginPath();
          c.moveTo(cx + a.tx * zoom, cy + a.ty * zoom);
          c.lineTo(cx + b.tx * zoom, cy + b.ty * zoom);
          c.stroke();
          c.setLineDash([]);
        }
        c.globalAlpha = 1;
        c.font = '13px -apple-system, "PingFang SC", sans-serif';
        for (let i = 0; i < this.prepared.length; i++) {
          const p = this.prepared[i];
          const x = cx + p.tx * zoom, y = cy + p.ty * zoom;
          const r = Math.max(2.5, (3 + Math.min(p.linkCount * 0.2, 4)) * 1.4);
          let fill = p.enabled ? p.heat : this.isDark ? "#1a1a22" : "#ffffff";
          if (this.isFailed(i)) fill = COL_FAILED;
          c.beginPath();
          c.arc(x, y, r, 0, Math.PI * 2);
          c.fillStyle = fill;
          c.globalAlpha = p.enabled ? 0.9 : 0.5;
          c.fill();
          if (!p.enabled) {
            c.strokeStyle = "#b0b0b8";
            c.lineWidth = 1;
            c.stroke();
          }
          if (p.linkCount >= 6) {
            c.globalAlpha = 0.85;
            c.fillStyle = this.isDark ? "#c7c7cc" : "#48484d";
            c.fillText(p.node.id, x + r + 4, y + 4);
          }
        }
        c.globalAlpha = 1;
        c.fillStyle = this.isDark ? "#e4e4e7" : "#1d1d1f";
        c.font = '700 22px -apple-system, "PingFang SC", sans-serif';
        c.fillText("DSH \u63D2\u4EF6\u661F\u56FE", 28, 42);
        c.font = '13px -apple-system, "PingFang SC", sans-serif';
        c.fillStyle = this.isDark ? "#a1a1a6" : "#8e8e93";
        c.fillText(`${this.data.nodes.length} \u63D2\u4EF6 \xB7 ${this.data.links.length} \u4F9D\u8D56 \xB7 ${(/* @__PURE__ */ new Date()).toLocaleString()}`, 28, 66);
        off.toBlob((blob) => {
          if (!blob) return;
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `dsh-starmap-${Date.now()}.png`;
          a.click();
          setTimeout(() => URL.revokeObjectURL(url), 5e3);
        }, "image/png");
      }
      exportJSON() {
        const blob = new Blob([JSON.stringify(this.data, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `dsh-starmap-${Date.now()}.json`;
        a.click();
        setTimeout(() => URL.revokeObjectURL(url), 5e3);
      }
      setDark(dark) {
        this.isDark = dark;
        this.tooltip.style.background = dark ? "rgba(28,28,34,0.96)" : "rgba(255,255,255,0.96)";
        this.tooltip.style.color = dark ? "#e4e4e7" : "#333";
        this.tooltip.style.borderColor = dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)";
        if (this.detailEl && this.state.hoverIndex >= 0) this.showDetail(this.state.hoverIndex);
      }
      /** transparent mode: the canvas stops painting its own background so the
          modal's color/image layer shows through clean. */
      setTransparent(v) {
        this.transparent = v;
      }
      dispose() {
        this.state.running = false;
        cancelAnimationFrame(this.raf);
        this.resizeObs?.disconnect();
        this.intersectObs?.disconnect();
        document.removeEventListener("visibilitychange", this.onVisChange);
        this.canvas.remove();
        this.tooltip.remove();
        this.hideDetail();
      }
    };
    var THEME_BG_DARK = "#1e1e22";
    var THEME_BG_LIGHT = "#f0f0f2";
    var DEFAULT_SETTINGS = { bgColor: "auto", bgOpacity: 1, blur: 12, hasImage: false };
    async function fetchSettings() {
      try {
        const res = await fetch("/dsh-plugin-starmap/settings", { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const ct = res.headers.get("content-type") || "";
        if (!ct.includes("application/json")) return { ...DEFAULT_SETTINGS };
        const d = await res.json();
        return {
          bgColor: typeof d.bgColor === "string" ? d.bgColor : "auto",
          bgOpacity: typeof d.bgOpacity === "number" ? d.bgOpacity : 1,
          blur: typeof d.blur === "number" ? d.blur : 12,
          hasImage: d.hasImage === true
        };
      } catch {
        return { ...DEFAULT_SETTINGS };
      }
    }
    var STALE_HOST_MSG = "\u5BBF\u4E3B\u5C1A\u672A\u52A0\u8F7D\u65B0\u7248\u63D2\u4EF6 \u2014 \u8BF7\u5B8C\u5168\u9000\u51FA DSH Desktop\uFF08\u542B\u6258\u76D8\u8FDB\u7A0B\uFF09\u540E\u91CD\u65B0\u542F\u52A8";
    async function saveSettingsPartial(patch) {
      const res = await fetch("/dsh-plugin-starmap/settings", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(patch)
      });
      if (res.status === 404 || res.status === 405) throw new Error(STALE_HOST_MSG);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    }
    function effectiveBgColor(s, isDark) {
      if (s.bgColor === "auto") return isDark ? THEME_BG_DARK : THEME_BG_LIGHT;
      return s.bgColor;
    }
    function useIsDark() {
      const [dark, setDark] = import_react.default.useState(
        typeof document !== "undefined" && document.body.hasAttribute("data-ds-dark-theme")
      );
      import_react.default.useEffect(() => {
        const obs = new MutationObserver(() => setDark(document.body.hasAttribute("data-ds-dark-theme")));
        obs.observe(document.body, { attributes: true, attributeFilter: ["data-ds-dark-theme"] });
        return () => obs.disconnect();
      }, []);
      return dark;
    }
    function GraphSection({ t, ctx, onClose }) {
      const hostRef = import_react.default.useRef(null);
      const engineRef = import_react.default.useRef(null);
      const dataRef = import_react.default.useRef(null);
      const isDark = useIsDark();
      const [data, setData] = import_react.default.useState(null);
      const [error, setError] = import_react.default.useState(null);
      const [searchQuery, setSearchQuery] = import_react.default.useState("");
      const [searchInfo, setSearchInfo] = import_react.default.useState({ count: 0, active: 0 });
      const [layout, setLayout] = import_react.default.useState("ring");
      const [cats, setCats] = import_react.default.useState([]);
      const [relHidden, setRelHidden] = import_react.default.useState({});
      const [updatedAt, setUpdatedAt] = import_react.default.useState("");
      const fetchGraph = import_react.default.useCallback((force = false) => {
        return fetch(`/dsh-plugin-starmap/graph${force ? "?refresh=1" : ""}`, { cache: "no-store" }).then((res) => {
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          return res.json();
        }).then((d) => {
          setData(d);
          setUpdatedAt((/* @__PURE__ */ new Date()).toLocaleTimeString());
          setError(null);
          return d;
        }).catch((e) => {
          setError(e.message);
          return void 0;
        });
      }, []);
      import_react.default.useEffect(() => {
        fetchGraph();
      }, [fetchGraph]);
      if (data) dataRef.current = data;
      const hasData = data !== null;
      import_react.default.useEffect(() => {
        if (!hostRef.current || !dataRef.current) return;
        const engine2 = new ConstellationCanvas(hostRef.current, dataRef.current);
        engineRef.current = engine2;
        engine2.setTransparent(true);
        engine2.setDark(document.body.hasAttribute("data-ds-dark-theme"));
        setCats(engine2.getCategories().map((c) => ({ ...c, hidden: engine2.isCategoryHidden(c.name) })));
        return () => {
          engine2.dispose();
          engineRef.current = null;
        };
      }, [hasData]);
      import_react.default.useEffect(() => {
        engineRef.current?.setDark(isDark);
      }, [isDark]);
      import_react.default.useEffect(() => {
        if (!data) return;
        dataRef.current = data;
        const engine2 = engineRef.current;
        if (!engine2) return;
        engine2.updateData(data);
        setCats(engine2.getCategories().map((c) => ({ ...c, hidden: engine2.isCategoryHidden(c.name) })));
      }, [data]);
      import_react.default.useEffect(() => {
        if (!hasData) return;
        const tick = async () => {
          if (document.visibilityState !== "visible") return;
          const engine2 = engineRef.current;
          if (!engine2) return;
          try {
            const inv = ctx?.remote?.pluginInventory;
            if (inv && typeof inv.list === "function") {
              const result = await inv.list();
              if (result?.ok && Array.isArray(result.value?.entries)) {
                engine2.refreshStatus(result.value.entries);
                return;
              }
            }
            throw new Error("remote unavailable");
          } catch {
            fetchGraph();
          }
        };
        const timer = window.setInterval(tick, 5e3);
        return () => window.clearInterval(timer);
      }, [hasData, ctx, fetchGraph]);
      if (error && !data) {
        return import_react.default.createElement("div", {
          style: { padding: 40, color: "#d70015", fontSize: 13 }
        }, `\u52A0\u8F7D\u5931\u8D25: ${error}`);
      }
      if (!data) {
        return import_react.default.createElement("div", {
          style: { padding: 40, color: "var(--dsw-alias-fg-muted, #8e8e93)", fontSize: 13 }
        }, "\u52A0\u8F7D\u4E2D\u2026");
      }
      const engine = engineRef.current;
      const btnStyle = {
        border: `1px solid ${isDark ? "rgba(255,255,255,0.14)" : "rgba(0,0,0,0.1)"}`,
        background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.03)",
        color: isDark ? "#e4e4e7" : "#1d1d1f",
        borderRadius: 8,
        padding: "4px 10px",
        fontSize: 11.5,
        cursor: "pointer"
      };
      return import_react.default.createElement(
        "div",
        {
          style: {
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "100%",
            minHeight: 480,
            position: "relative",
            overflow: "hidden"
          }
        },
        // toolbar
        import_react.default.createElement(
          "div",
          { style: { padding: "10px 18px 6px", display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", flexShrink: 0 } },
          import_react.default.createElement("span", { style: { fontWeight: 700, fontSize: 15, color: isDark ? "#f0f0f2" : "#1d1d1f" } }, t("overlay.title")),
          import_react.default.createElement("span", { style: { fontSize: 11, color: isDark ? "#707078" : "#a1a1a6" } }, `${data.nodes.length} \u8282\u70B9 \xB7 ${data.links.length} \u5173\u7CFB\u7EBF${updatedAt ? ` \xB7 ${updatedAt}` : ""}`),
          import_react.default.createElement("input", {
            value: searchQuery,
            placeholder: t("search.placeholder"),
            onChange: (e) => {
              const q = e.target.value;
              setSearchQuery(q);
              if (engine) {
                engine.setSearch(q);
                setSearchInfo(engine.getSearchState());
              }
            },
            onKeyDown: (e) => {
              if (e.key === "Enter" && engine) {
                engine.nextMatch(e.shiftKey ? -1 : 1);
                setSearchInfo(engine.getSearchState());
              }
            },
            style: {
              marginLeft: "auto",
              width: 200,
              padding: "4px 10px",
              fontSize: 12,
              borderRadius: 8,
              border: `1px solid ${isDark ? "rgba(255,255,255,0.14)" : "rgba(0,0,0,0.1)"}`,
              background: isDark ? "rgba(255,255,255,0.06)" : "#fff",
              color: isDark ? "#e4e4e7" : "#1d1d1f",
              outline: "none"
            }
          }),
          searchInfo.count > 0 ? import_react.default.createElement("span", { style: { fontSize: 11, color: "#5ac8fa", minWidth: 34 } }, `${searchInfo.active}/${searchInfo.count}`) : null,
          import_react.default.createElement("button", {
            style: btnStyle,
            onClick: () => {
              const next = layout === "ring" ? "force" : "ring";
              setLayout(next);
              engine?.setLayout(next, true);
            }
          }, layout === "ring" ? t("layout.force") : t("layout.ring")),
          import_react.default.createElement("button", { style: btnStyle, onClick: () => engine?.exportPNG() }, t("export.png")),
          import_react.default.createElement("button", { style: btnStyle, onClick: () => engine?.exportJSON() }, t("export.json")),
          import_react.default.createElement("button", { style: btnStyle, onClick: () => fetchGraph(true) }, t("action.refresh")),
          onClose ? import_react.default.createElement("button", {
            style: { ...btnStyle, borderColor: "rgba(255,69,58,0.4)", color: "#ff453a" },
            onClick: onClose
          }, "\xD7") : null
        ),
        // category chips
        import_react.default.createElement(
          "div",
          {
            style: {
              display: "flex",
              alignItems: "center",
              gap: 6,
              flexWrap: "wrap",
              padding: "0 18px 8px",
              flexShrink: 0,
              maxHeight: 60,
              overflowY: "auto"
            }
          },
          cats.some((c) => c.hidden) ? import_react.default.createElement("button", {
            key: "__all",
            style: { ...btnStyle, padding: "2px 8px", fontSize: 10.5 },
            onClick: () => {
              const eng = engineRef.current;
              if (!eng) return;
              for (const c of cats) eng.setCategoryHidden(c.name, false);
              setCats((prev) => prev.map((c) => ({ ...c, hidden: false })));
            }
          }, t("category.showAll")) : null,
          cats.map((c) => import_react.default.createElement(
            "button",
            {
              key: c.name,
              title: `${c.name} (${c.count})`,
              onClick: () => {
                const eng = engineRef.current;
                if (!eng) return;
                const hidden = !eng.isCategoryHidden(c.name);
                eng.setCategoryHidden(c.name, hidden);
                setCats((prev) => prev.map((x) => x.name === c.name ? { ...x, hidden } : x));
              },
              style: {
                display: "inline-flex",
                alignItems: "center",
                gap: 5,
                padding: "2px 8px",
                fontSize: 10.5,
                borderRadius: 999,
                cursor: "pointer",
                border: `1px solid ${c.hidden ? "transparent" : c.color + "55"}`,
                background: c.hidden ? "transparent" : c.color + "1a",
                color: c.hidden ? isDark ? "#707078" : "#a1a1a6" : isDark ? "#e4e4e7" : "#1d1d1f",
                textDecoration: c.hidden ? "line-through" : "none"
              }
            },
            import_react.default.createElement("span", { style: { width: 7, height: 7, borderRadius: "50%", background: c.color, opacity: c.hidden ? 0.35 : 1 } }),
            `${c.name} ${c.count}`
          )),
          // relation-type filter chips (line-style preview via borderTop)
          import_react.default.createElement("span", { style: { width: 1, height: 14, background: isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.1)", margin: "0 2px", flexShrink: 0 } }),
          RELATION_STYLES.map((rs) => import_react.default.createElement(
            "button",
            {
              key: `rel-${rs.group}`,
              title: rs.hint,
              onClick: () => {
                const eng = engineRef.current;
                if (!eng) return;
                const hidden = !eng.isRelationHidden(rs.group);
                eng.setRelationHidden(rs.group, hidden);
                setRelHidden((prev) => ({ ...prev, [rs.group]: hidden }));
              },
              style: {
                display: "inline-flex",
                alignItems: "center",
                gap: 5,
                padding: "2px 8px",
                fontSize: 10.5,
                borderRadius: 999,
                cursor: "pointer",
                border: `1px solid ${relHidden[rs.group] ? "transparent" : rs.color + "55"}`,
                background: relHidden[rs.group] ? "transparent" : rs.color + "12",
                color: relHidden[rs.group] ? isDark ? "#707078" : "#a1a1a6" : isDark ? "#e4e4e7" : "#1d1d1f",
                textDecoration: relHidden[rs.group] ? "line-through" : "none"
              }
            },
            import_react.default.createElement("span", { style: { width: 14, height: 0, borderTop: `2px ${rs.css} ${rs.color}`, opacity: relHidden[rs.group] ? 0.35 : 1 } }),
            t(rs.key)
          ))
        ),
        import_react.default.createElement("div", {
          ref: hostRef,
          style: { flex: 1, position: "relative", overflow: "hidden", minHeight: 420 }
        }),
        error ? import_react.default.createElement("div", { style: { position: "absolute", top: 8, left: "50%", transform: "translateX(-50%)", fontSize: 11, color: "#ff9f0a" } }, `\u72B6\u6001\u5237\u65B0\u5931\u8D25: ${error}`) : null
      );
    }
    function FooterGraphButton(_props) {
      const [open, setOpen] = import_react.default.useState(false);
      const isDark = useIsDark();
      const [settings, setSettings] = import_react.default.useState({ ...DEFAULT_SETTINGS });
      import_react.default.useEffect(() => {
        if (!open) return;
        fetchSettings().then(setSettings);
        const onKey = (e) => {
          if (e.key === "Escape") setOpen(false);
        };
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
      }, [open]);
      import_react.default.useEffect(() => {
        if (!open || settings.blur <= 0) return;
        const touched = [];
        for (const child of Array.from(document.body.children)) {
          if (child instanceof HTMLElement && !child.hasAttribute("data-dshpg-overlay")) {
            touched.push({ el: child, prev: child.style.filter });
            child.style.filter = `blur(${settings.blur}px)`;
          }
        }
        return () => {
          for (const t of touched) t.el.style.filter = t.prev;
        };
      }, [open, settings.blur]);
      const button = import_react.default.createElement("button", {
        title: "\u63D2\u4EF6\u661F\u56FE",
        onClick: () => setOpen(true),
        style: {
          width: 30,
          height: 30,
          borderRadius: 8,
          cursor: "pointer",
          fontSize: 15,
          lineHeight: 1,
          border: `1px solid ${isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.08)"}`,
          background: "transparent"
        }
      }, "\u{1FA90}");
      if (!open || typeof document === "undefined") return button;
      const ref = applyCtxRef || { t: (k) => zh[k], ctx: null };
      const overlayProps = {
        "data-dshpg-overlay": "1",
        style: {
          position: "fixed",
          inset: 0,
          zIndex: 1e4,
          background: isDark ? "rgba(0,0,0,0.42)" : "rgba(80,80,90,0.22)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        },
        onMouseDown: (e) => {
          if (e.target === e.currentTarget) setOpen(false);
        }
      };
      const modal = import_react.default.createElement(
        "div",
        overlayProps,
        import_react.default.createElement(
          "div",
          {
            style: {
              width: "min(1400px, 92vw)",
              height: "min(880px, 88vh)",
              borderRadius: 16,
              overflow: "hidden",
              // layered "thickness": contact shadow + mid projection + deep ambient
              boxShadow: isDark ? "0 2px 6px rgba(0,0,0,0.35), 0 18px 46px rgba(0,0,0,0.42), 0 48px 120px rgba(0,0,0,0.55)" : "0 2px 6px rgba(30,34,50,0.14), 0 18px 46px rgba(30,34,50,0.20), 0 48px 120px rgba(30,34,50,0.34)",
              border: `1px solid ${isDark ? "rgba(255,255,255,0.10)" : "rgba(255,255,255,0.55)"}`,
              display: "flex",
              flexDirection: "column",
              position: "relative"
            }
          },
          // background layer: frosted blur of the home page behind + user color /
          // image faded by bgOpacity. NOTE: no `isolation` on the card — an
          // isolated stacking context would cut backdrop-filter off from the page.
          import_react.default.createElement("div", {
            style: {
              position: "absolute",
              inset: 0,
              zIndex: 0,
              backgroundColor: effectiveBgColor(settings, isDark),
              backgroundImage: settings.hasImage ? "url(/dsh-plugin-starmap/bg)" : void 0,
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: settings.bgOpacity,
              backdropFilter: settings.blur > 0 ? `blur(${settings.blur}px) saturate(1.15)` : void 0
            }
          }),
          import_react.default.createElement(GraphSection, { t: ref.t, ctx: ref.ctx, onClose: () => setOpen(false) })
        )
      );
      return [button, (0, import_react_dom.createPortal)(modal, document.body)];
    }
    function SettingsSection({ t }) {
      const isDark = useIsDark();
      const [settings, setSettings] = import_react.default.useState({ ...DEFAULT_SETTINGS });
      const [loaded, setLoaded] = import_react.default.useState(false);
      const [error, setError] = import_react.default.useState(null);
      import_react.default.useEffect(() => {
        fetchSettings().then((s) => {
          setSettings(s);
          setLoaded(true);
        });
      }, []);
      const patch = import_react.default.useCallback(async (p) => {
        try {
          const next = await saveSettingsPartial(p);
          setSettings(next);
          setError(null);
        } catch (e) {
          setError(String(e.message || e));
        }
      }, []);
      const onPickImage = (file) => {
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
          if (typeof reader.result === "string") void patch({ bgImage: reader.result });
        };
        reader.readAsDataURL(file);
      };
      if (!loaded) {
        return import_react.default.createElement("div", {
          style: { padding: 40, color: "var(--dsw-alias-fg-muted, #8e8e93)", fontSize: 13 }
        }, "\u52A0\u8F7D\u4E2D\u2026");
      }
      const labelStyle = {
        fontSize: 12,
        fontWeight: 600,
        color: isDark ? "#e4e4e7" : "#1d1d1f",
        marginBottom: 8
      };
      const hintStyle = {
        fontSize: 11,
        color: isDark ? "#8e8e93" : "#8e8e93",
        lineHeight: 1.6,
        marginTop: 6
      };
      const cardStyle = {
        background: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.02)",
        border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)"}`,
        borderRadius: 12,
        padding: 16,
        marginBottom: 14
      };
      const inputColor = isDark ? "#e4e4e7" : "#1d1d1f";
      const btnStyle = {
        border: `1px solid ${isDark ? "rgba(255,255,255,0.14)" : "rgba(0,0,0,0.1)"}`,
        background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.03)",
        color: inputColor,
        borderRadius: 8,
        padding: "5px 12px",
        fontSize: 12,
        cursor: "pointer"
      };
      const effColor = effectiveBgColor(settings, isDark);
      const checkerboard = "repeating-conic-gradient(rgba(128,128,128,0.22) 0% 25%, transparent 0% 50%) 50% / 16px 16px";
      return import_react.default.createElement(
        "div",
        { style: { padding: "20px 24px", maxWidth: 640, overflowY: "auto" } },
        import_react.default.createElement("div", { style: { fontSize: 15, fontWeight: 700, color: inputColor, marginBottom: 4 } }, t("nav.label")),
        import_react.default.createElement("div", { style: { ...hintStyle, marginTop: 0, marginBottom: 16 } }, t("settings.hint")),
        // background color
        import_react.default.createElement(
          "div",
          { style: cardStyle },
          import_react.default.createElement("div", { style: labelStyle }, t("settings.bgColor")),
          import_react.default.createElement(
            "div",
            { style: { display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" } },
            import_react.default.createElement("input", {
              type: "color",
              value: settings.bgColor === "auto" ? effColor : settings.bgColor,
              onChange: (e) => void patch({ bgColor: e.target.value }),
              style: { width: 42, height: 30, border: "none", background: "transparent", cursor: "pointer", padding: 0 }
            }),
            import_react.default.createElement("span", {
              style: { fontFamily: "monospace", fontSize: 12, color: isDark ? "#a8a8b0" : "#6e6e73", minWidth: 72 }
            }, settings.bgColor === "auto" ? t("settings.bgAuto") : settings.bgColor.toUpperCase()),
            import_react.default.createElement("button", {
              style: { ...btnStyle, ...settings.bgColor === "auto" ? { borderColor: "#5ac8fa", color: "#5ac8fa" } : {} },
              onClick: () => void patch({ bgColor: "auto" })
            }, t("settings.bgAuto"))
          ),
          import_react.default.createElement("div", { style: hintStyle }, `${t("settings.bgAuto")}: ${THEME_BG_DARK} / ${THEME_BG_LIGHT}`)
        ),
        // background image
        import_react.default.createElement(
          "div",
          { style: cardStyle },
          import_react.default.createElement("div", { style: labelStyle }, t("settings.bgImage")),
          import_react.default.createElement(
            "div",
            { style: { display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" } },
            import_react.default.createElement(
              "label",
              { style: btnStyle },
              t("settings.bgImagePick"),
              import_react.default.createElement("input", {
                type: "file",
                accept: "image/*",
                style: { display: "none" },
                onChange: (e) => {
                  onPickImage(e.target.files?.[0]);
                  e.target.value = "";
                }
              })
            ),
            settings.hasImage ? import_react.default.createElement("button", {
              style: { ...btnStyle, color: "#ff453a", borderColor: "rgba(255,69,58,0.4)" },
              onClick: () => void patch({ bgImage: null })
            }, t("settings.bgImageClear")) : null,
            settings.hasImage ? import_react.default.createElement("span", {
              style: { fontSize: 11, color: "#34c759" }
            }, "\u2713") : null
          ),
          import_react.default.createElement("div", { style: hintStyle }, t("settings.bgImageHint"))
        ),
        // background opacity
        import_react.default.createElement(
          "div",
          { style: cardStyle },
          import_react.default.createElement(
            "div",
            { style: labelStyle },
            `${t("settings.bgOpacity")} \xB7 ${Math.round(settings.bgOpacity * 100)}%`
          ),
          import_react.default.createElement("input", {
            type: "range",
            min: 0,
            max: 100,
            step: 5,
            value: Math.round(settings.bgOpacity * 100),
            onChange: (e) => {
              const v = Number(e.target.value) / 100;
              setSettings((prev) => ({ ...prev, bgOpacity: v }));
            },
            onMouseUp: (e) => {
              void patch({ bgOpacity: Number(e.target.value) / 100 });
            },
            onTouchEnd: (e) => {
              void patch({ bgOpacity: Number(e.target.value) / 100 });
            },
            style: { width: "100%", accentColor: "#5ac8fa" }
          }),
          import_react.default.createElement("div", { style: hintStyle }, t("settings.bgOpacityHint"))
        ),
        // background blur (frosted glass)
        import_react.default.createElement(
          "div",
          { style: cardStyle },
          import_react.default.createElement(
            "div",
            { style: labelStyle },
            `${t("settings.blur")} \xB7 ${settings.blur}px`
          ),
          import_react.default.createElement("input", {
            type: "range",
            min: 0,
            max: 40,
            step: 1,
            value: settings.blur,
            onChange: (e) => {
              const v = Number(e.target.value);
              setSettings((prev) => ({ ...prev, blur: v }));
            },
            onMouseUp: (e) => {
              void patch({ blur: Number(e.target.value) });
            },
            onTouchEnd: (e) => {
              void patch({ blur: Number(e.target.value) });
            },
            style: { width: "100%", accentColor: "#5ac8fa" }
          }),
          import_react.default.createElement("div", { style: hintStyle }, t("settings.blurHint"))
        ),
        // preview: checkerboard behind the color/image layer at the set opacity
        import_react.default.createElement(
          "div",
          { style: cardStyle },
          import_react.default.createElement("div", { style: labelStyle }, t("settings.preview")),
          import_react.default.createElement(
            "div",
            {
              style: {
                height: 110,
                borderRadius: 10,
                overflow: "hidden",
                background: checkerboard,
                position: "relative"
              }
            },
            import_react.default.createElement("div", {
              style: {
                position: "absolute",
                inset: 0,
                backgroundColor: effColor,
                backgroundImage: settings.hasImage ? "url(/dsh-plugin-starmap/bg)" : void 0,
                backgroundSize: "cover",
                backgroundPosition: "center",
                opacity: settings.bgOpacity,
                backdropFilter: settings.blur > 0 ? `blur(${settings.blur}px) saturate(1.15)` : void 0
              }
            }),
            import_react.default.createElement("div", {
              style: {
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 26
              }
            }, "\u{1FA90}\u2728")
          )
        ),
        error ? import_react.default.createElement("div", { style: { color: "#ff453a", fontSize: 12, marginTop: 4 } }, `\u4FDD\u5B58\u5931\u8D25: ${error}`) : null
      );
    }
    var applyCtxRef = null;
    var inject = ["slots", "locale"];
    function apply(ctx) {
      const NS = "dsh-plugin-starmap";
      ctx.effect(() => ctx.locale.register(NS, { zh, en }), "dsh-plugin-starmap: dictionaries");
      const t = ctx.locale.bind(NS);
      applyCtxRef = { t, ctx };
      ctx.slots.inject(
        "settings.section",
        () => ctx.slots.register({
          name: "settings.section",
          id: "dsh-plugin-starmap",
          order: 35,
          label: () => t("nav.label"),
          locale: NS,
          inject: () => ({})
        }, () => import_react.default.createElement(SettingsSection, { t }))
      );
      try {
        ctx.slots.inject(
          "sidebar.footer.action",
          () => ctx.slots.register({
            name: "sidebar.footer.action",
            id: "dsh-plugin-starmap",
            order: 50,
            label: () => t("footer.tooltip"),
            locale: NS,
            inject: () => ({})
          }, () => import_react.default.createElement(FooterGraphButton, {}))
        );
      } catch {
      }
    }
    
    return module.exports;
  }
});
