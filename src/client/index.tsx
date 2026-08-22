import type { Context } from "@deepseek-ai/cordis";

/* ── locale keys ── */
export type GraphKey =
  | "nav.label"
  | "overlay.title"
  | "overlay.hint"
  | "footer.tooltip"
  | "search.placeholder"
  | "layout.ring"
  | "layout.force"
  | "export.png"
  | "export.json"
  | "action.refresh"
  | "category.showAll"
  | "settings.bgColor"
  | "settings.bgAuto"
  | "settings.bgOpacity"
  | "settings.bgOpacityHint"
  | "settings.blur"
  | "settings.blurHint"
  | "settings.bgImage"
  | "settings.bgImagePick"
  | "settings.bgImageClear"
  | "settings.bgImageHint"
  | "settings.preview"
  | "settings.hint"
  | "rel.npm"
  | "rel.service"
  | "rel.client"
  | "rel.profile";

export const zh: Record<GraphKey, string> = {
  "nav.label": "星座图设置",
  "overlay.title": "插件关系星座图",
  "overlay.hint": "滚动缩放 · 拖拽平移 · 双击聚焦 · 点击详情 · 右键菜单",
  "footer.tooltip": "打开插件星座图",
  "search.placeholder": "搜索插件… (Enter 跳转)",
  "layout.ring": "分类环布局",
  "layout.force": "力导向布局",
  "export.png": "导出 PNG",
  "export.json": "导出 JSON",
  "action.refresh": "刷新",
  "category.showAll": "全部显示",
  "settings.bgColor": "背景颜色",
  "settings.bgAuto": "自动（跟随主题）",
  "settings.bgOpacity": "背景不透明度",
  "settings.bgOpacityHint": "调低可透视主页；0 为完全透明",
  "settings.blur": "背景模糊度",
  "settings.blurHint": "毛玻璃：模糊透过来的主页内容，降低信息干扰；背景不透明度低于 100% 时生效",
  "settings.bgImage": "背景图片",
  "settings.bgImagePick": "选择图片…",
  "settings.bgImageClear": "清除图片",
  "settings.bgImageHint": "支持 PNG / JPG / WebP / GIF，≤ 12MB，铺满窗口显示",
  "settings.preview": "预览（棋盘格代表透明）",
  "settings.hint": "设置即时保存，通过侧边栏底部的 🪐 按钮打开星座图查看效果。",
  "rel.npm": "npm 依赖",
  "rel.service": "服务注入",
  "rel.client": "客户端模块",
  "rel.profile": "Profile",
};

export const en: Record<GraphKey, string> = {
  "nav.label": "Constellation Settings",
  "overlay.title": "Plugin Constellation Graph",
  "overlay.hint": "Scroll to zoom · Drag to pan · Double-click to focus · Click for details · Right-click menu",
  "footer.tooltip": "Open plugin graph",
  "search.placeholder": "Search plugins… (Enter to jump)",
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
  "settings.bgImagePick": "Choose image…",
  "settings.bgImageClear": "Clear image",
  "settings.bgImageHint": "PNG / JPG / WebP / GIF, up to 12MB, cover-fit",
  "settings.preview": "Preview (checkerboard = transparency)",
  "settings.hint": "Saved instantly — open the graph via the 🪐 button at the sidebar foot.",
  "rel.npm": "npm deps",
  "rel.service": "Service inject",
  "rel.client": "Client modules",
  "rel.profile": "Profile",
};

/* ── graph data types (mirror host) ── */
export type FiberPhase = "pending" | "loading" | "active" | "failed" | "unloading" | null;

export interface GraphNode {
  id: string;
  label: string;
  category: string;
  enabled: boolean;
  phase?: FiberPhase;
  version: string;
  desc: string;
  installSource?: string;
  profiles?: string[];
  orphan?: boolean;
  repository?: string;
  homepage?: string;
  hub?: "service" | "profile";
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

/* ── status colors (fiber phase aware) ── */
const COL_FAILED = "#ff453a";
const COL_LOADING = "#ff9f0a";
const COL_IMPACT = "#ff6482";

/* ── relation-line types (mirrors host RelationType) ── */
type Relation = "deps" | "peer" | "service" | "client" | "profile";
type RelationGroup = "deps" | "service" | "client" | "profile";

const RELATION_GROUPS: RelationGroup[] = ["deps", "service", "client", "profile"];

function relationGroup(r: string): RelationGroup {
  if (r === "service") return "service";
  if (r === "client") return "client";
  if (r === "profile") return "profile";
  return "deps"; // deps + peer
}

const RELATION_BADGE: Record<string, string> = {
  deps: "依赖", peer: "peer", service: "服务", client: "客户端", profile: "profile",
};

/* toolbar chips for relation-type filtering (CSS border styles preview the canvas line style) */
const RELATION_STYLES: Array<{ group: RelationGroup; key: string; color: string; css: string; hint: string }> = [
  { group: "deps", key: "rel.npm", color: "#0071e3", css: "solid", hint: "package.json npm 依赖（含 peer）" },
  { group: "service", key: "rel.service", color: "#4dd0e1", css: "dotted", hint: "Cordis 服务注入 inject=[…]" },
  { group: "client", key: "rel.client", color: "#af52de", css: "dashed", hint: "dsh.client.inject 客户端模块" },
  { group: "profile", key: "rel.profile", color: "#9a9aa5", css: "solid", hint: "profile bundle 归属" },
];

function escapeHtml(s: string): string {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/* ── vanilla constellation renderer ── */
class ConstellationCanvas {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private wrapper: HTMLElement;
  private tooltip: HTMLElement;
  private data: GraphData;
  private prepared: any[] = [];
  private linksIdx: any[] = [];
  private byNode = new Map<number, number[]>();
  private byNodeOut = new Map<number, number[]>();
  private byNodeIn = new Map<number, number[]>();
  private nodeIndexMap = new Map<string, number>();
  private catList: string[] = [];
  private catMembers = new Map<string, number[]>();
  private catColor = new Map<string, string>();
  private hiddenCats = new Set<string>();
  private hiddenRelations = new Set<RelationGroup>();
  private layoutMode: "ring" | "force" = "ring";
  private ringPos = new Map<number, { x: number; y: number }>();
  private forcePos = new Map<number, { x: number; y: number }>();
  private impactSet: Set<number> | null = null;
  private impactRoot = -1;
  private searchMatches: number[] = [];
  private searchActive = -1;
  private state = {
    panX: 0, panY: 0, zoom: 0.5, targetPanX: 0, targetPanY: 0, targetZoom: 0.5,
    mouseX: -1, mouseY: -1, isDragging: false,
    dragStartX: 0, dragStartY: 0, panStartX: 0, panStartY: 0,
    hoverIndex: -1, prevHoverIndex: -2, W: 0, H: 0, dpr: 1, running: true, interacted: false,
  };
  private raf = 0;
  private isDark = false;
  private transparent = false;
  private stars: Array<{ x: number; y: number; r: number; ph: number; sp: number; a: number }> = [];
  private resizeObs: ResizeObserver | null = null;
  private intersectObs: IntersectionObserver | null = null;
  private menuEl: HTMLElement | null = null;

  private CATEGORY_COLORS = [
    "#0071e3", "#34c759", "#ff9f0a", "#af52de", "#5856d6",
    "#00c7be", "#ff375f", "#5ac8fa", "#ff6482", "#a2845e", "#8e8e93", "#d4a017",
    "#30b0c7", "#c2402a", "#7d7aff", "#4dd0e1", "#9a9aa5",
  ];

  /** one-time stylesheet for hover states (inline handlers are CSP-blocked) */
  private ensureStyles() {
    if (document.getElementById("dshpg-styles")) return;
    const style = document.createElement("style");
    style.id = "dshpg-styles";
    style.textContent = ".dshpg-menu-item:hover{background:rgba(128,128,140,0.12);}";
    document.head.appendChild(style);
  }

  constructor(container: HTMLElement, data: GraphData) {
    this.data = data;
    this.wrapper = container;
    this.canvas = document.createElement("canvas");
    this.canvas.style.cssText = "display:block;width:100%;height:100%;cursor:default;";
    this.wrapper.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d")!;
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
  private buildIndex() {
    const { nodes, links } = this.data;
    this.nodeIndexMap = new Map();
    this.catMembers = new Map();
    this.catList = [];
    nodes.forEach((n, i) => {
      this.nodeIndexMap.set(n.id, i);
      if (!this.catMembers.has(n.category)) { this.catMembers.set(n.category, []); this.catList.push(n.category); }
      this.catMembers.get(n.category)!.push(i);
    });
    this.catList.forEach((cat, ci) => this.catColor.set(cat, this.CATEGORY_COLORS[ci % this.CATEGORY_COLORS.length]));

    let maxDegree = 1;
    const degreeMap = new Map<string, number>();
    links.forEach((l) => {
      degreeMap.set(l.source, (degreeMap.get(l.source) || 0) + 1);
      degreeMap.set(l.target, (degreeMap.get(l.target) || 0) + 1);
    });
    degreeMap.forEach((v) => { if (v > maxDegree) maxDegree = v; });

    // ring layout: cluster ring + hash scatter (deterministic, no force sim)
    const clusterRingR = Math.sqrt(Math.max(nodes.length, 1)) * 26;
    const catCentroid = new Map<string, { cx: number; cy: number; r: number }>();
    this.catList.forEach((cat, ci) => {
      const a = (ci / Math.max(this.catList.length, 1)) * Math.PI * 2 - Math.PI / 2;
      const members = this.catMembers.get(cat) || [];
      const blobR = 26 + Math.sqrt(members.length) * 10;
      catCentroid.set(cat, { cx: Math.cos(a) * clusterRingR, cy: Math.sin(a) * clusterRingR, r: blobR });
    });

    this.ringPos = new Map();
    this.prepared = nodes.map((n, i) => {
      const seed = this.hashStr(n.id);
      const centroid = catCentroid.get(n.category);
      const members = this.catMembers.get(n.category) || [];
      const j = members.indexOf(i);
      const la = (j / Math.max(members.length, 1)) * Math.PI * 2 + ((seed % 100) / 100) * 0.6;
      const lr = (centroid?.r || 30) * (0.25 + 0.75 * ((Math.abs(seed) % 1000) / 1000));
      const wx = (centroid?.cx || 0) + Math.cos(la) * lr;
      const wy = (centroid?.cy || 0) + Math.sin(la) * lr;
      this.ringPos.set(i, { x: wx, y: wy });
      const degree = degreeMap.get(n.id) || 0;
      return {
        node: n, x: wx, y: wy, tx: wx, ty: wy,
        color: this.catColor.get(n.category) || "#0071e3",
        heat: this.heatColor(Math.sqrt(degree / maxDegree)),
        linkCount: degree,
        phase: ((seed % 1000) / 1000) * Math.PI * 2,
        enabled: n.enabled,
      };
    });

    this.computeForceLayout();

    // parallax starfield (screen-space, deterministic)
    this.stars = [];
    for (let i = 0; i < 140; i++) {
      const h1 = this.hashStr(`star-${i}-x`);
      const h2 = this.hashStr(`star-${i}-y`);
      this.stars.push({
        x: ((h1 >>> 8) % 10000) / 10000,
        y: ((h2 >>> 8) % 10000) / 10000,
        r: 0.5 + ((h1 >>> 4) % 100) / 100 * 1.3,
        ph: ((h2 >>> 2) % 628) / 100,
        sp: 0.4 + ((h1 >>> 6) % 100) / 100 * 1.4,
        a: 0.25 + ((h2 >>> 4) % 100) / 100 * 0.55,
      });
    }

    // link indices + per-direction adjacency (O(1) lookups for hover/detail)
    this.linksIdx = [];
    this.byNode = new Map();
    this.byNodeOut = new Map();
    this.byNodeIn = new Map();
    links.forEach((link, li) => {
      const ai = this.nodeIndexMap.get(link.source);
      const bi = this.nodeIndexMap.get(link.target);
      if (ai === undefined || bi === undefined) return;
      const idx = this.linksIdx.length;
      const both = this.data.nodes[ai].enabled && this.data.nodes[bi].enabled;
      const group = relationGroup(link.relation);
      // per-type line color: service lines take the hub's category color,
      // profile lines stay neutral gray
      const color = group === "service"
        ? this.prepared[bi].color
        : group === "profile"
          ? "#9a9aa5"
          : this.prepared[ai].color;
      this.linksIdx.push({ a: ai, b: bi, on: both, color, relation: link.relation, group });
      if (!this.byNode.has(ai)) this.byNode.set(ai, []);
      if (!this.byNode.has(bi)) this.byNode.set(bi, []);
      this.byNode.get(ai)!.push(idx);
      this.byNode.get(bi)!.push(idx);
      if (!this.byNodeOut.has(ai)) this.byNodeOut.set(ai, []);
      this.byNodeOut.get(ai)!.push(idx);
      if (!this.byNodeIn.has(bi)) this.byNodeIn.set(bi, []);
      this.byNodeIn.get(bi)!.push(idx);
    });
  }

  /** deterministic force-directed layout seeded from the ring positions */
  private computeForceLayout() {
    const n = this.prepared.length;
    const pos = new Map<number, { x: number; y: number }>();
    for (let i = 0; i < n; i++) {
      const r = this.ringPos.get(i)!;
      pos.set(i, { x: r.x * 0.9, y: r.y * 0.9 });
    }
    // edge list in index space
    const edges: Array<[number, number]> = [];
    for (const link of this.data.links) {
      const ai = this.nodeIndexMap.get(link.source);
      const bi = this.nodeIndexMap.get(link.target);
      if (ai !== undefined && bi !== undefined) edges.push([ai, bi]);
    }
    const rest = 110;
    const iter = 260;
    const maxR = Math.sqrt(Math.max(n, 1)) * 26 * 1.15;
    for (let it = 0; it < iter; it++) {
      const fx = new Float64Array(n);
      const fy = new Float64Array(n);
      // pairwise repulsion
      for (let i = 0; i < n; i++) {
        const a = pos.get(i)!;
        for (let j = i + 1; j < n; j++) {
          const b = pos.get(j)!;
          let dx = a.x - b.x, dy = a.y - b.y;
          let d2 = dx * dx + dy * dy;
          if (d2 < 1) { d2 = 1; dx = 0.5 + (i % 7) * 0.01; dy = -0.4; }
          const f = 2600 / d2;
          const d = Math.sqrt(d2);
          fx[i] += (dx / d) * f; fy[i] += (dy / d) * f;
          fx[j] -= (dx / d) * f; fy[j] -= (dy / d) * f;
        }
      }
      // spring attraction along edges
      for (const [ai, bi] of edges) {
        const a = pos.get(ai)!, b = pos.get(bi)!;
        const dx = b.x - a.x, dy = b.y - a.y;
        const d = Math.sqrt(dx * dx + dy * dy) || 1;
        const f = (d - rest) * 0.035;
        fx[ai] += (dx / d) * f; fy[ai] += (dy / d) * f;
        fx[bi] -= (dx / d) * f; fy[bi] -= (dy / d) * f;
      }
      // center gravity + integrate
      const damp = 0.6;
      for (let i = 0; i < n; i++) {
        const p = pos.get(i)!;
        fx[i] += -p.x * 0.012;
        fy[i] += -p.y * 0.012;
        let nx = p.x + fx[i] * damp;
        let ny = p.y + fy[i] * damp;
        const dc = Math.sqrt(nx * nx + ny * ny);
        if (dc > maxR * 1.6) { nx = (nx / dc) * maxR * 1.6; ny = (ny / dc) * maxR * 1.6; }
        p.x = nx; p.y = ny;
      }
    }
    this.forcePos = pos;
  }

  setLayout(mode: "ring" | "force", refit = false) {
    this.layoutMode = mode;
    const src = mode === "ring" ? this.ringPos : this.forcePos;
    for (let i = 0; i < this.prepared.length; i++) {
      const p = src.get(i);
      if (p) { this.prepared[i].tx = p.x; this.prepared[i].ty = p.y; }
    }
    // Only an explicit user layout switch refits the camera; data refreshes
    // must keep the user's pan/zoom exactly where they left it.
    if (refit) {
      this.state.interacted = false;
      this.fitView();
    }
  }

  getLayout(): "ring" | "force" { return this.layoutMode; }

  private hashStr(s: string): number {
    let h = 0;
    for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0;
    return h;
  }

  private hexToRgba(hex: string, alpha: number): string {
    if (!hex.startsWith("#")) return hex;
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${alpha})`;
  }

  private heatColor(t: number): string {
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

  private lerp(a: number, b: number, t: number) { return a + (b - a) * t; }

  /* ── lifecycle observers: resize + pause rendering when hidden ── */
  private observeLifecycle() {
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

  private onVisChange = () => {
    const vis = !document.hidden && this.wrapper.isConnected;
    this.setRunning(vis);
  };

  private setRunning(run: boolean) {
    if (run === this.state.running) return;
    this.state.running = run;
    if (run) this.animate();
    else cancelAnimationFrame(this.raf);
  }

  private resize() {
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

  private fitView() {
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
  private isFailed(i: number): boolean { return this.data.nodes[i]?.phase === "failed"; }
  private isBusy(i: number): boolean {
    const p = this.data.nodes[i]?.phase;
    return p === "loading" || p === "pending" || p === "unloading";
  }

  private animate = () => {
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

    const time = (typeof performance !== "undefined" ? performance.now() : 0) / 1000;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);
    if (this.transparent) {
      this.drawStars(ctx, time);
    } else {
      ctx.fillStyle = this.isDark ? "#0f0f14" : "#ffffff";
      ctx.fillRect(0, 0, W, H);
    }
    const prepared = this.prepared;

    // position easing toward layout targets + gentle drift
    const screenX = new Float32Array(prepared.length);
    const screenY = new Float32Array(prepared.length);
    const visible = new Uint8Array(prepared.length); // on-screen AND not category-hidden
    const shownCat = new Uint8Array(prepared.length); // not category-hidden (for link culling)
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
        if (dist < bestDist) { bestDist = dist; bestIdx = i; }
      }
      s.hoverIndex = bestIdx;
    }

    const hoveredLinks = new Set<number>();
    if (hoverIndex >= 0) {
      const myLinks = this.byNode.get(hoverIndex) || [];
      for (const li of myLinks) {
        if (!this.hiddenRelations.has(this.linksIdx[li].group)) hoveredLinks.add(li);
      }
    }

    // per-relation-type line style
    const lineStyle = (link: any): { dash: number[]; width: number; alphaMul: number; flow: boolean } => {
      switch (link.group) {
        case "service": return { dash: [2, 5], width: 0.7, alphaMul: 0.9, flow: true };
        case "client": return { dash: [7, 4], width: 0.55, alphaMul: 0.85, flow: false };
        case "profile": return { dash: [1, 4], width: 0.4, alphaMul: 0.45, flow: false };
        default: return { dash: [3, 5], width: 0.6, alphaMul: 1.2, flow: true };
      }
    };

    // ── links ──
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
          const raw = (time * 0.22 + (li % 13) / 13) % 1;
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
      const baseAlpha = (0.30 + Math.min(zoom * 0.08, 0.22)) * shimmer;
      for (const link of this.linksIdx) {
        // relation-type filter + category-hidden endpoints cull the line
        if (this.hiddenRelations.has(link.group)) continue;
        if (!shownCat[link.a] || !shownCat[link.b]) continue;
        const ax = screenX[link.a], ay = screenY[link.a];
        const bx = screenX[link.b], by = screenY[link.b];
        if ((ax < -margin && bx < -margin) || (ax > W + margin && bx > W + margin) ||
            (ay < -margin && by < -margin) || (ay > H + margin && by > H + margin)) continue;
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

    // ── category blobs ──
    ctx.save();
    ctx.lineJoin = "round";
    for (const cat of this.catList) {
      if (this.hiddenCats.has(cat)) continue;
      const members = this.catMembers.get(cat) || [];
      const pts: Array<[number, number]> = [];
      for (const idx of members) {
        if (idx < screenX.length && visible[idx]) pts.push([screenX[idx], screenY[idx]]);
      }
      if (pts.length === 0) continue;
      let mx = 0, my = 0;
      for (const [x, y] of pts) { mx += x; my += y; }
      mx /= pts.length; my /= pts.length;
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
          const ex = hx + (dx / d) * pad;
          const ey = hy + (dy / d) * pad;
          if (j === 0) ctx.moveTo(ex, ey); else ctx.lineTo(ex, ey);
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

    // ── nodes ──
    const GRID_CELL = 90;
    const labelGrid = new Set<string>();
    const canPlace = (lx: number, ly: number, lw: number, lh: number) => {
      const c0 = Math.floor(lx / GRID_CELL), c1 = Math.floor((lx + lw) / GRID_CELL);
      const r0 = Math.floor(ly / GRID_CELL), r1 = Math.floor((ly + lh) / GRID_CELL);
      for (let c = c0; c <= c1; c++)
        for (let r = r0; r <= r1; r++) if (labelGrid.has(`${c},${r}`)) return false;
      return true;
    };
    const claim = (lx: number, ly: number, lw: number, lh: number) => {
      const c0 = Math.floor(lx / GRID_CELL), c1 = Math.floor((lx + lw) / GRID_CELL);
      const r0 = Math.floor(ly / GRID_CELL), r1 = Math.floor((ly + lh) / GRID_CELL);
      for (let c = c0; c <= c1; c++) for (let r = r0; r <= r1; r++) labelGrid.add(`${c},${r}`);
    };

    let labelsShown = 0, visibleCount = 0;
    const order: number[] = [];
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
      const pulse = n.enabled ? (1 + 0.13 * Math.sin(time * 1.05 + n.phase)) : 1;
      const baseR = rawR * pulse;
      const r = Math.max(1.8, baseR * Math.min(zoom, 2));

      const twinkleAlpha = n.enabled ? (0.82 + 0.18 * Math.sin(time * 1.4 + n.phase * 2.1)) : 1;
      const baseAlpha = n.enabled ? (0.65 + Math.min(n.linkCount * 0.035, 0.3)) * twinkleAlpha : 0.45;

      let fill = n.enabled ? n.heat : (this.isDark ? "#1a1a22" : "#ffffff");
      if (this.isFailed(i)) fill = COL_FAILED;
      else if (this.isBusy(i)) fill = COL_LOADING;

      ctx.beginPath();
      ctx.arc(sx, sy, r, 0, Math.PI * 2);
      ctx.fillStyle = fill;
      const dimOthers = (hoverIndex >= 0 && !isHovered && !isNeighbor) || (this.impactSet !== null && !inImpact && !isHovered);
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
      // failed: warning ring
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
      // orphan: dashed neutral ring
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
      // search match ring
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
        ctx.globalAlpha = (0.05 + Math.min(n.linkCount * 0.004, 0.07)) * twinkle;
        ctx.fill();
      }
      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;

      // labels
      const display = n.node.label || n.node.id;
      const text = display.length > 18 ? display.substring(0, 17) + "…" : display;
      ctx.font = '11px -apple-system, "PingFang SC", sans-serif';
      if (isHovered) {
        ctx.fillStyle = this.isDark ? "#e4e4e7" : "#18181b";
        ctx.globalAlpha = 1;
        ctx.textAlign = "left";
        ctx.fillText(text, sx + r + 5, sy + 4);
        ctx.globalAlpha = 1;
        labelsShown++;
      } else if (zoom > 1.5 || isNeighbor || isActiveMatch || (inImpact && zoom > 0.5)) {
        const lw = 155, lh = 16;
        const lx = sx + r + 5;
        const ly = sy - 8;
        if (canPlace(lx, ly, lw, lh)) {
          claim(lx, ly, lw, lh);
          ctx.fillStyle = isNeighbor || inImpact ? (this.isDark ? "#a8a8b0" : "#6e6e73") : (this.isDark ? "#707078" : "#a1a1a6");
          ctx.globalAlpha = 0.9;
          ctx.textAlign = "left";
          ctx.fillText(text, lx, ly + 12);
          ctx.globalAlpha = 1;
          labelsShown++;
        }
      }
    }

    // HUD
    ctx.font = '11px "SF Mono", "Fira Code", Consolas, monospace';
    ctx.fillStyle = this.isDark ? "#707078" : "#a1a1a6";
    ctx.textAlign = "left";
    ctx.fillText(`滚动缩放 · 拖拽平移 · 双击聚焦 · 点击详情 · 右键菜单`, 12, 16);
    ctx.font = '10px "SF Mono", "Fira Code", Consolas, monospace';
    ctx.fillText(`关系线: npm 实线 · 服务 点线 · 客户端 虚线 · Profile 灰线`, 12, H - 28);
    ctx.font = '11px "SF Mono", "Fira Code", Consolas, monospace';
    ctx.fillText(`缩放 ${zoom.toFixed(2)}x · 可见 ${visibleCount} 节点 · 关系线 ${linksDrawn}${this.impactSet ? ` · 影响分析 ${this.impactSet.size} 节点` : ""}`, 12, H - 12);

    // heat legend
    ctx.textAlign = "left";
    ctx.font = "600 10px -apple-system, sans-serif";
    ctx.fillStyle = this.isDark ? "#a8a8b0" : "#8e8e93";
    ctx.fillText("连接度", 12, 36);
    const gradW = 110;
    for (let gx = 0; gx < gradW; gx++) {
      ctx.fillStyle = this.heatColor(gx / gradW);
      ctx.fillRect(12 + gx, 41, 1, 5);
    }
    ctx.font = '10px "SF Mono", Consolas, monospace';
    ctx.fillStyle = this.isDark ? "#a1a1a6" : "#a1a1a6";
    ctx.fillText("少", 12, 58);
    ctx.textAlign = "right";
    ctx.fillText("多", 12 + gradW, 58);

    // legend (right-top)
    ctx.textAlign = "right";
    ctx.font = "600 10px -apple-system, sans-serif";
    ctx.fillStyle = this.isDark ? "#a8a8b0" : "#8e8e93";
    let lx2 = W - 12;
    ctx.fillText("启用实线·流动", lx2, H - 12);
    const lw2 = ctx.measureText("启用实线·流动").width;
    ctx.strokeStyle = "#0071e3";
    ctx.globalAlpha = 0.6;
    ctx.lineWidth = 1.2;
    ctx.beginPath(); ctx.moveTo(lx2 - lw2 - 34, H - 15); ctx.lineTo(lx2 - lw2 - 8, H - 15); ctx.stroke();
    ctx.globalAlpha = 1;
    lx2 -= lw2 + 46;
    ctx.fillText("禁用虚线", lx2, H - 12);
    const lw3 = ctx.measureText("禁用虚线").width;
    ctx.strokeStyle = this.isDark ? "#3a3a44" : "#c7c7cc";
    ctx.setLineDash([3, 3]);
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(lx2 - lw3 - 30, H - 15); ctx.lineTo(lx2 - lw3 - 8, H - 15); ctx.stroke();
    ctx.setLineDash([]);
    // failed / loading legend
    lx2 -= lw3 + 42;
    ctx.fillText("加载失败", lx2, H - 12);
    const lw4 = ctx.measureText("加载失败").width;
    ctx.fillStyle = COL_FAILED;
    ctx.beginPath(); ctx.arc(lx2 - lw4 - 14, H - 15, 3.5, 0, Math.PI * 2); ctx.fill();
    lx2 -= lw4 + 40;
    ctx.fillText("加载中", lx2, H - 12);
    const lw5 = ctx.measureText("加载中").width;
    ctx.fillStyle = COL_LOADING;
    ctx.beginPath(); ctx.arc(lx2 - lw5 - 14, H - 15, 3.5, 0, Math.PI * 2); ctx.fill();

    this.raf = requestAnimationFrame(this.animate);
  };

  private convexHull(points: Array<[number, number]>): Array<[number, number]> {
    if (points.length < 3) return points.slice();
    const pts = points.slice().sort((a, b) => a[0] - b[0] || a[1] - b[1]);
    const cross = (o: number[], a: number[], b: number[]) =>
      (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
    const lower: Array<[number, number]> = [];
    const upper: Array<[number, number]> = [];
    for (const p of pts) {
      while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], p) <= 0) lower.pop();
      lower.push(p);
    }
    for (let i = pts.length - 1; i >= 0; i--) {
      const p = pts[i];
      while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], p) <= 0) upper.pop();
      upper.push(p);
    }
    lower.pop(); upper.pop();
    return lower.concat(upper);
  }

  /* ── events ── */
  private bindEvents() {
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
  flyToIndex(idx: number, zoomLevel = 2.5) {
    const p = this.prepared[idx];
    if (!p) return;
    this.state.interacted = true;
    this.state.targetZoom = zoomLevel;
    this.state.targetPanX = -p.tx * zoomLevel;
    this.state.targetPanY = -p.ty * zoomLevel;
  }

  flyToNode(id: string, zoomLevel = 2.5): boolean {
    const idx = this.nodeIndexMap.get(id);
    if (idx === undefined) return false;
    this.flyToIndex(idx, zoomLevel);
    return true;
  }

  /* ── search ── */
  setSearch(query: string): number {
    const q = query.trim().toLowerCase();
    if (!q) { this.searchMatches = []; this.searchActive = -1; return 0; }
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

  getSearchState(): { count: number; active: number } {
    return { count: this.searchMatches.length, active: this.searchActive >= 0 ? this.searchMatches.indexOf(this.searchActive) + 1 : 0 };
  }

  nextMatch(dir: 1 | -1) {
    if (this.searchMatches.length === 0) return;
    const cur = this.searchMatches.indexOf(this.searchActive);
    const next = (cur + dir + this.searchMatches.length) % this.searchMatches.length;
    this.searchActive = this.searchMatches[next];
    this.flyToIndex(this.searchActive, 2);
  }

  /* ── category visibility ── */
  setCategoryHidden(cat: string, hidden: boolean) {
    if (hidden) this.hiddenCats.add(cat);
    else this.hiddenCats.delete(cat);
  }

  isCategoryHidden(cat: string): boolean { return this.hiddenCats.has(cat); }

  /* ── relation-type visibility ── */
  setRelationHidden(group: RelationGroup, hidden: boolean) {
    if (hidden) this.hiddenRelations.add(group);
    else this.hiddenRelations.delete(group);
  }

  isRelationHidden(group: RelationGroup): boolean { return this.hiddenRelations.has(group); }

  getRelationGroups(): RelationGroup[] { return [...RELATION_GROUPS]; }

  getCategories(): Array<{ name: string; color: string; count: number }> {
    return this.catList.map((c) => ({
      name: c,
      color: this.catColor.get(c) || "#0071e3",
      count: (this.catMembers.get(c) || []).length,
    }));
  }

  /* ── uninstall impact analysis: transitive dependents of a node ──
   * Only npm-dep and client-module lines propagate (they represent real
   * "removing this package breaks the source" relations). Service/profile
   * lines point at hubs and carry no uninstall semantics. */
  computeImpact(idx: number): number[] {
    const affected = new Set<number>([idx]);
    const queue = [idx];
    while (queue.length > 0) {
      const cur = queue.pop()!;
      for (const li of this.byNodeIn.get(cur) || []) {
        const link = this.linksIdx[li];
        if (link.group !== "deps" && link.group !== "client") continue;
        const src = link.a;
        if (!affected.has(src)) { affected.add(src); queue.push(src); }
      }
    }
    affected.delete(idx);
    return [...affected];
  }

  setImpact(idx: number | null) {
    if (idx === null) { this.impactSet = null; this.impactRoot = -1; return; }
    const affected = this.computeImpact(idx);
    this.impactRoot = idx;
    this.impactSet = new Set([idx, ...affected]);
  }

  getImpact(): { root: number; affected: number[] } | null {
    if (this.impactSet === null) return null;
    return { root: this.impactRoot, affected: this.computeImpact(this.impactRoot) };
  }

  /* ── tooltip (O(1) via adjacency index) ── */
  private updateTooltip(mx: number, my: number) {
    const idx = this.state.hoverIndex;
    const tip = this.tooltip;
    if (idx < 0 || this.state.isDragging) { tip.style.display = "none"; this.state.prevHoverIndex = -1; return; }
    const n = this.prepared[idx];
    if (!n) { tip.style.display = "none"; return; }
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
      const phaseBadge = node.phase === "failed"
        ? `<span style="color:${COL_FAILED};font-weight:700;"> · 加载失败</span>`
        : node.phase === "loading" || node.phase === "pending"
          ? `<span style="color:${COL_LOADING};font-weight:700;"> · 加载中</span>`
          : "";
      const orphanBadge = node.orphan ? `<span style="color:#8e8e93;"> · 未被引用</span>` : "";
      tip.innerHTML = `
        <div style="font-weight:700;font-size:13px;margin-bottom:4px;">${node.enabled ? "●" : "○"} ${escapeHtml(node.hub ? node.label : node.id)}</div>
        <div style="color:#6e6e73;margin-bottom:5px;">${escapeHtml(node.category)} · ${n.linkCount} 连接 · ${node.enabled ? "启用" : "禁用"}${phaseBadge}${orphanBadge}</div>
        <div style="color:#a1a1a6;line-height:1.5;font-size:11.5px;">${escapeHtml(node.desc || "")}</div>
        <div style="margin-top:8px;padding-top:7px;border-top:1px solid rgba(0,0,0,0.06);color:#6e6e73;font-size:11px;line-height:1.7;">${rels || "无连接"}</div>`;
    }
    tip.style.display = "block";
    const tipW = tip.offsetWidth, tipH = tip.offsetHeight;
    tip.style.left = Math.min(mx + 16, this.state.W - tipW - 12) + "px";
    tip.style.top = Math.min(my + 16, this.state.H - tipH - 12) + "px";
  }

  /* ── detail panel (O(1) via adjacency index) ── */
  private detailEl: HTMLElement | null = null;

  private showDetail(idx: number) {
    const n = this.prepared[idx];
    if (!n) return;
    this.hideDetail();
    const node = n.node;
    const el = document.createElement("div");
    el.style.cssText = "position:absolute;top:14px;right:14px;width:280px;max-height:calc(100% - 28px);overflow-y:auto;background:" + (this.isDark ? "rgba(28,28,34,0.94)" : "rgba(255,255,255,0.95)") + ";border:1px solid " + (this.isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)") + ";border-radius:14px;box-shadow:0 16px 48px rgba(0,0,0,0.14);padding:14px;z-index:5;font-size:12px;color:" + (this.isDark ? "#e4e4e7" : "#333") + ";";
    const outLinks = (this.byNodeOut.get(idx) || []).map((li) => this.linksIdx[li]);
    const inLinks = (this.byNodeIn.get(idx) || []).map((li) => this.linksIdx[li]);
    const relRow = (link: any, arrow: string) => {
      const otherNode = arrow === "→" ? this.data.nodes[link.b] : this.data.nodes[link.a];
      if (!otherNode) return "";
      const otherName = otherNode.label || otherNode.id;
      const on = otherNode.enabled && node.enabled;
      const badge = RELATION_BADGE[link.relation] || link.relation;
      return `<div data-nav="${escapeHtml(otherNode.id)}" style="padding:3px 7px;border-radius:7px;cursor:pointer;color:${this.isDark ? "#a8a8b0" : "#6e6e73"};display:flex;align-items:center;gap:5px;"><span style="width:5px;height:5px;border-radius:50%;background:${on ? "#34c759" : "#c7c7cc"};flex-shrink:0;"></span><span>${arrow} ${escapeHtml(otherName)}</span><span style="font-size:9px;color:#a1a1a6;background:rgba(0,0,0,0.05);border-radius:4px;padding:1px 5px;margin-left:auto;">${escapeHtml(badge)}</span></div>`;
    };
    const isHub = node.hub === "service" || node.hub === "profile";
    const phasePill = node.phase === "failed"
      ? `<span style="padding:3px 9px;border-radius:14px;font-size:10.5px;font-weight:600;background:rgba(255,69,58,0.12);color:${COL_FAILED};">加载失败</span>`
      : (node.phase === "loading" || node.phase === "pending")
        ? `<span style="padding:3px 9px;border-radius:14px;font-size:10.5px;font-weight:600;background:rgba(255,159,10,0.12);color:${COL_LOADING};">加载中</span>`
        : "";
    const orphanPill = node.orphan
      ? `<span style="padding:3px 9px;border-radius:14px;font-size:10.5px;font-weight:600;background:rgba(142,142,147,0.14);color:#8e8e93;">未被引用</span>`
      : "";
    const metaRows: string[] = [];
    if (node.version) metaRows.push(`<div style="display:flex;gap:6px;"><span style="color:#a1a1a6;width:56px;flex-shrink:0;">版本</span><span>${escapeHtml(node.version)}</span></div>`);
    if (node.installSource) metaRows.push(`<div style="display:flex;gap:6px;"><span style="color:#a1a1a6;width:56px;flex-shrink:0;">安装源</span><span style="word-break:break-all;">${escapeHtml(node.installSource)}</span></div>`);
    if (node.profiles && node.profiles.length > 0) metaRows.push(`<div style="display:flex;gap:6px;"><span style="color:#a1a1a6;width:56px;flex-shrink:0;">Profile</span><span>${escapeHtml(node.profiles.join(", "))}</span></div>`);
    const impactActive = this.impactRoot === idx;
    el.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:10px;">
        <div style="font-size:14px;font-weight:700;word-break:break-all;">${node.hub === "service" ? "⚙" : node.hub === "profile" ? "●" : node.enabled ? "●" : "○"} ${escapeHtml(isHub ? node.label : node.id)}</div>
        <button class="dshpg-close" style="background:none;border:none;font-size:17px;color:#a1a1a6;cursor:pointer;padding:2px 4px;">×</button>
      </div>
      <div style="margin-bottom:10px;display:flex;flex-wrap:wrap;gap:5px;">
        ${isHub ? "" : `<span style="padding:3px 9px;border-radius:14px;font-size:10.5px;font-weight:600;background:${node.enabled ? "rgba(52,199,89,0.12)" : "rgba(255,59,48,0.1)"};color:${node.enabled ? "#248a3d" : "#d70015"};">${node.enabled ? "启用" : "禁用"}</span>`}
        <span style="padding:3px 9px;border-radius:14px;font-size:10.5px;font-weight:600;background:rgba(0,0,0,0.05);color:#6e6e73;">${escapeHtml(node.category)}</span>
        ${phasePill}${orphanPill}
      </div>
      <div style="margin-bottom:12px;"><div style="font-size:10px;color:#a1a1a6;font-weight:600;letter-spacing:0.5px;text-transform:uppercase;margin-bottom:5px;">描述</div>
        <div style="font-size:12px;color:${this.isDark ? "#a8a8b0" : "#6e6e73"};line-height:1.6;">${escapeHtml(node.desc || "（无描述）")}</div></div>
      ${metaRows.length ? `<div style="margin-bottom:12px;display:flex;flex-direction:column;gap:4px;">${metaRows.join("")}</div>` : ""}
      <div style="margin-bottom:12px;"><div style="font-size:10px;color:#a1a1a6;font-weight:600;letter-spacing:0.5px;text-transform:uppercase;margin-bottom:5px;">连接统计</div>
        <div style="display:flex;gap:6px;">
          <div style="flex:1;background:rgba(0,0,0,0.03);border-radius:9px;padding:7px;text-align:center;"><div style="font-size:15px;font-weight:700;">${inLinks.length}</div><div style="font-size:9.5px;color:#a1a1a6;">入度</div></div>
          <div style="flex:1;background:rgba(0,0,0,0.03);border-radius:9px;padding:7px;text-align:center;"><div style="font-size:15px;font-weight:700;">${outLinks.length}</div><div style="font-size:9.5px;color:#a1a1a6;">出度</div></div>
          <div style="flex:1;background:rgba(0,0,0,0.03);border-radius:9px;padding:7px;text-align:center;"><div style="font-size:15px;font-weight:700;">${n.linkCount}</div><div style="font-size:9.5px;color:#a1a1a6;">总连接</div></div>
        </div></div>
      ${isHub ? "" : `<div style="margin-bottom:12px;"><button class="dshpg-impact" style="width:100%;padding:7px 10px;border-radius:9px;border:1px solid ${impactActive ? COL_IMPACT : (this.isDark ? "rgba(255,255,255,0.14)" : "rgba(0,0,0,0.1)")};background:${impactActive ? "rgba(255,100,130,0.12)" : "transparent"};color:${impactActive ? COL_IMPACT : (this.isDark ? "#e4e4e7" : "#333")};font-size:11.5px;font-weight:600;cursor:pointer;">${impactActive ? "清除影响分析" : "卸载影响分析"}</button>
        <div class="dshpg-impact-result" style="margin-top:8px;"></div></div>`}
      ${outLinks.length ? `<div style="margin-bottom:12px;"><div style="font-size:10px;color:#a1a1a6;font-weight:600;letter-spacing:0.5px;text-transform:uppercase;margin-bottom:5px;">下游关系 (${outLinks.length})</div>
        ${outLinks.map((l: any) => relRow(l, "→")).join("")}</div>` : ""}
      ${inLinks.length ? `<div><div style="font-size:10px;color:#a1a1a6;font-weight:600;letter-spacing:0.5px;text-transform:uppercase;margin-bottom:5px;">上游关系 (${inLinks.length})</div>
        ${inLinks.map((l: any) => relRow(l, "←")).join("")}</div>` : ""}`;
    this.wrapper.appendChild(el);
    this.detailEl = el;
    el.querySelector(".dshpg-close")?.addEventListener("click", () => this.hideDetail());
    el.querySelectorAll<HTMLElement>("[data-nav]").forEach((rowEl) => {
      rowEl.addEventListener("click", () => {
        const target = rowEl.getAttribute("data-nav") || "";
        this.flyToNode(target, 2.5);
      });
    });
    const impactBtn = el.querySelector(".dshpg-impact");
    impactBtn?.addEventListener("click", () => {
      this.setImpact(this.impactRoot === idx ? null : idx);
      this.showDetail(idx); // re-render pill state
      const res = this.detailEl?.querySelector(".dshpg-impact-result");
      if (res && this.impactRoot === idx) {
        const affected = this.getImpact()!.affected;
        res.innerHTML = affected.length === 0
          ? `<div style="color:#34c759;font-size:11.5px;">✓ 没有插件依赖它，可安全移除</div>`
          : `<div style="color:${COL_IMPACT};font-size:11.5px;font-weight:600;margin-bottom:4px;">${affected.length} 个插件将受影响：</div>` +
            affected.slice(0, 12).map((a) => `<div style="color:${this.isDark ? "#a8a8b0" : "#6e6e73"};font-size:11px;padding:1px 0;">· ${escapeHtml(this.data.nodes[a]?.id || "")}</div>`).join("") +
            (affected.length > 12 ? `<div style="color:#a1a1a6;font-size:11px;">… 共 ${affected.length} 个</div>` : "");
      }
    });
  }

  private hideDetail() {
    if (this.detailEl) {
      this.detailEl.remove();
      this.detailEl = null;
    }
    this.hideMenu();
  }

  /* ── right-click context menu ── */
  private showMenu(idx: number, mx: number, my: number) {
    this.hideMenu();
    const node = this.data.nodes[idx];
    if (!node) return;
    const el = document.createElement("div");
    el.style.cssText = `position:absolute;left:${Math.min(mx, this.state.W - 190)}px;top:${Math.min(my, this.state.H - 160)}px;background:${this.isDark ? "rgba(28,28,34,0.97)" : "rgba(255,255,255,0.97)"};border:1px solid ${this.isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)"};border-radius:10px;box-shadow:0 12px 36px rgba(0,0,0,0.18);padding:5px;z-index:11;font-size:12px;min-width:150px;`;
    const item = (text: string) => `<div class="dshpg-menu-item" style="padding:6px 12px;border-radius:7px;cursor:pointer;color:${this.isDark ? "#e4e4e7" : "#333"};">${escapeHtml(text)}</div>`;
    const isHub = node.hub === "service" || node.hub === "profile";
    let html = item("🎯 聚焦此节点") + item(isHub ? "📋 复制名称" : "📋 复制包名");
    if (!isHub) {
      if (node.repository || node.homepage) html += item("🔗 打开仓库主页");
      html += item("📦 打开 npm 页面") + item("🧩 卸载影响分析");
    }
    el.innerHTML = html;
    this.wrapper.appendChild(el);
    this.menuEl = el;
    const items = el.querySelectorAll("div");
    items.item(0)?.addEventListener("click", () => { this.flyToIndex(idx, 2.5); this.hideMenu(); });
    items.item(1)?.addEventListener("click", () => {
      if (navigator.clipboard) navigator.clipboard.writeText(node.id).catch(() => {});
      this.hideMenu();
    });
    if (!isHub) {
      if (node.repository || node.homepage) {
        items.item(2)?.addEventListener("click", () => {
          const url = this.normalizeUrl(node.repository || node.homepage || "");
          if (url) window.open(url, "_blank", "noopener");
          this.hideMenu();
        });
        items.item(3)?.addEventListener("click", () => { window.open(`https://www.npmjs.com/package/${encodeURIComponent(node.id)}`, "_blank", "noopener"); this.hideMenu(); });
        items.item(4)?.addEventListener("click", () => { this.setImpact(idx); this.showDetail(idx); this.hideMenu(); });
      } else {
        items.item(2)?.addEventListener("click", () => { window.open(`https://www.npmjs.com/package/${encodeURIComponent(node.id)}`, "_blank", "noopener"); this.hideMenu(); });
        items.item(3)?.addEventListener("click", () => { this.setImpact(idx); this.showDetail(idx); this.hideMenu(); });
      }
    }
    const close = (e: MouseEvent) => {
      if (!el.contains(e.target as Node)) { this.hideMenu(); document.removeEventListener("mousedown", close, true); }
    };
    setTimeout(() => document.addEventListener("mousedown", close, true), 0);
  }

  private normalizeUrl(url: string): string {
    let u = url.trim();
    if (u.startsWith("git+")) u = u.slice(4);
    if (u.endsWith(".git")) u = u.slice(0, -4);
    if (!/^https?:\/\//.test(u)) {
      // github:user/repo shorthand
      if (/^[a-z0-9-]+\/[a-z0-9_.-]+$/i.test(u)) u = `https://github.com/${u}`;
      else return "";
    }
    return u;
  }

  private hideMenu() {
    if (this.menuEl) { this.menuEl.remove(); this.menuEl = null; }
  }

  /* ── live status refresh (no layout change) ── */
  refreshStatus(entries: Array<{ moduleName?: string; id?: string; enabled?: boolean; fiberPhase?: string | null }>) {
    for (const e of entries) {
      const mn = String(e.moduleName || e.id || "");
      const idx = this.nodeIndexMap.get(mn);
      if (idx === undefined) continue;
      const node = this.data.nodes[idx];
      node.enabled = e.enabled !== false;
      node.phase = (e.fiberPhase === undefined ? null : e.fiberPhase) as FiberPhase;
      this.prepared[idx].enabled = node.enabled;
    }
    // refresh link on/off flags
    for (const link of this.linksIdx) {
      link.on = this.data.nodes[link.a].enabled && this.data.nodes[link.b].enabled;
    }
  }

  /* ── full data swap (keep view + hidden cats + layout) ── */
  updateData(next: GraphData) {
    const sameShape = next.nodes.length === this.data.nodes.length &&
      next.nodes.every((n, i) => n.id === this.data.nodes[i]?.id);
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
    off.width = W; off.height = H;
    const c = off.getContext("2d")!;
    c.fillStyle = this.isDark ? "#0f0f14" : "#ffffff";
    c.fillRect(0, 0, W, H);
    let maxR = 0;
    for (const p of this.prepared) {
      const d = Math.hypot(p.tx, p.ty);
      if (d > maxR) maxR = d;
    }
    const zoom = Math.min(W, H - 80) / (maxR * 2.15);
    const cx = W / 2, cy = (H + 40) / 2;
    // links
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
    // nodes + labels for high-degree
    c.font = '13px -apple-system, "PingFang SC", sans-serif';
    for (let i = 0; i < this.prepared.length; i++) {
      const p = this.prepared[i];
      const x = cx + p.tx * zoom, y = cy + p.ty * zoom;
      const r = Math.max(2.5, (3 + Math.min(p.linkCount * 0.2, 4)) * 1.4);
      let fill = p.enabled ? p.heat : (this.isDark ? "#1a1a22" : "#ffffff");
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
    // title + stats
    c.fillStyle = this.isDark ? "#e4e4e7" : "#1d1d1f";
    c.font = '700 22px -apple-system, "PingFang SC", sans-serif';
    c.fillText("DSH 插件星座图", 28, 42);
    c.font = '13px -apple-system, "PingFang SC", sans-serif';
    c.fillStyle = this.isDark ? "#a1a1a6" : "#8e8e93";
    c.fillText(`${this.data.nodes.length} 插件 · ${this.data.links.length} 依赖 · ${new Date().toLocaleString()}`, 28, 66);
    off.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `dsh-constellation-${Date.now()}.png`;
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 5000);
    }, "image/png");
  }

  exportJSON() {
    const blob = new Blob([JSON.stringify(this.data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `dsh-constellation-${Date.now()}.json`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 5000);
  }

  setDark(dark: boolean) {
    this.isDark = dark;
    this.tooltip.style.background = dark ? "rgba(28,28,34,0.96)" : "rgba(255,255,255,0.96)";
    this.tooltip.style.color = dark ? "#e4e4e7" : "#333";
    this.tooltip.style.borderColor = dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)";
    if (this.detailEl && this.state.hoverIndex >= 0) this.showDetail(this.state.hoverIndex);
  }

  /** transparent mode: the canvas stops painting its own background so the
      modal's color/image layer shows through; a parallax starfield is drawn. */
  setTransparent(v: boolean) {
    this.transparent = v;
  }

  private drawStars(ctx: CanvasRenderingContext2D, time: number) {
    const { W, H, panX, panY } = this.state;
    const rgb = this.isDark ? "255,255,255" : "92,104,138";
    ctx.fillStyle = `rgb(${rgb})`;
    for (const s of this.stars) {
      const sx = ((((s.x * W + panX * 0.18) % W) + W) % W);
      const sy = ((((s.y * H + panY * 0.18) % H) + H) % H);
      const tw = 0.55 + 0.45 * Math.sin(time * s.sp + s.ph);
      ctx.globalAlpha = s.a * tw;
      ctx.beginPath();
      ctx.arc(sx, sy, s.r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
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
}

/* Theme-following default background colors — deliberately not pure black or
   pure white: deep-space indigo for dark, misty pale blue for light. */
const THEME_BG_DARK = "#0d1326";
const THEME_BG_LIGHT = "#e9eef8";

export interface ConstellationSettings {
  bgColor: string; // "auto" | #rrggbb
  bgOpacity: number; // 0–1
  blur: number; // px, 0–40
  hasImage: boolean;
}

const DEFAULT_SETTINGS: ConstellationSettings = { bgColor: "auto", bgOpacity: 1, blur: 12, hasImage: false };

async function fetchSettings(): Promise<ConstellationSettings> {
  try {
    const res = await fetch("/dsh-plugin-constellation/settings", { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    // A stale host process has no /settings route and lets the SPA fallback
    // answer index.html — treat that as "defaults until restart".
    const ct = res.headers.get("content-type") || "";
    if (!ct.includes("application/json")) return { ...DEFAULT_SETTINGS };
    const d = await res.json() as Partial<ConstellationSettings>;
    return {
      bgColor: typeof d.bgColor === "string" ? d.bgColor : "auto",
      bgOpacity: typeof d.bgOpacity === "number" ? d.bgOpacity : 1,
      blur: typeof d.blur === "number" ? d.blur : 12,
      hasImage: d.hasImage === true,
    };
  } catch {
    return { ...DEFAULT_SETTINGS };
  }
}

const STALE_HOST_MSG = "宿主尚未加载新版插件 — 请完全退出 DSH Desktop（含托盘进程）后重新启动";

async function saveSettingsPartial(patch: Record<string, unknown>): Promise<ConstellationSettings> {
  const res = await fetch("/dsh-plugin-constellation/settings", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(patch),
  });
  // 404/405 = the SPA fallback answered because the running host process
  // still has the old plugin (no /settings route). Host code only loads at
  // process start, so only a full app restart picks it up.
  if (res.status === 404 || res.status === 405) throw new Error(STALE_HOST_MSG);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return await res.json() as ConstellationSettings;
}

function effectiveBgColor(s: ConstellationSettings, isDark: boolean): string {
  if (s.bgColor === "auto") return isDark ? THEME_BG_DARK : THEME_BG_LIGHT;
  return s.bgColor;
}

/* ── React components ── */
import React from "react";
import { createPortal } from "react-dom";

/* Reactive dark-theme flag (body attribute is the runtime's theme signal). */
function useIsDark(): boolean {
  const [dark, setDark] = React.useState(
    typeof document !== "undefined" && document.body.hasAttribute("data-ds-dark-theme")
  );
  React.useEffect(() => {
    const obs = new MutationObserver(() => setDark(document.body.hasAttribute("data-ds-dark-theme")));
    obs.observe(document.body, { attributes: true, attributeFilter: ["data-ds-dark-theme"] });
    return () => obs.disconnect();
  }, []);
  return dark;
}

/* Shared toolbar + graph surface. Used by the settings section and by the
   modal window launched from the sidebar footer action. */
function GraphSection({ t, ctx, onClose }: { t: (k: GraphKey) => string; ctx?: any; onClose?: () => void }) {
  const hostRef = React.useRef<HTMLDivElement>(null);
  const engineRef = React.useRef<ConstellationCanvas | null>(null);
  const dataRef = React.useRef<GraphData | null>(null);
  const isDark = useIsDark();
  const [data, setData] = React.useState<GraphData | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [searchInfo, setSearchInfo] = React.useState({ count: 0, active: 0 });
  const [layout, setLayout] = React.useState<"ring" | "force">("ring");
  const [cats, setCats] = React.useState<Array<{ name: string; color: string; count: number; hidden: boolean }>>([]);
  const [relHidden, setRelHidden] = React.useState<Record<string, boolean>>({});
  const [updatedAt, setUpdatedAt] = React.useState<string>("");

  const fetchGraph = React.useCallback((force = false) => {
    return fetch(`/dsh-plugin-constellation/graph${force ? "?refresh=1" : ""}`, { cache: "no-store" })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json() as Promise<GraphData>;
      })
      .then((d: GraphData) => {
        setData(d);
        setUpdatedAt(new Date().toLocaleTimeString());
        setError(null);
        return d;
      })
      .catch((e: Error) => { setError(e.message); return undefined; });
  }, []);

  React.useEffect(() => {
    fetchGraph();
  }, [fetchGraph]);

  // Ref must be current BEFORE effects run on the data-arrival commit, or the
  // engine-creation effect below sees null and never creates the canvas.
  if (data) dataRef.current = data;

  const hasData = data !== null;

  // Engine lifecycle: created exactly once per mount (first data arrival).
  // Teardown only on unmount — data/theme refreshes must NEVER rebuild the
  // canvas or the user's pan/zoom would reset.
  React.useEffect(() => {
    if (!hostRef.current || !dataRef.current) return;
    const engine = new ConstellationCanvas(hostRef.current, dataRef.current);
    engineRef.current = engine;
    engine.setTransparent(true);
    engine.setDark(document.body.hasAttribute("data-ds-dark-theme"));
    setCats(engine.getCategories().map((c) => ({ ...c, hidden: engine.isCategoryHidden(c.name) })));
    return () => {
      engine.dispose();
      engineRef.current = null;
    };
  }, [hasData]); // eslint-disable-line react-hooks/exhaustive-deps

  // Theme flips push into the live engine; no rebuild.
  React.useEffect(() => {
    engineRef.current?.setDark(isDark);
  }, [isDark]);

  // Data refreshes merge into the live engine; view (pan/zoom/layout/hidden
  // categories) is preserved. Only a changed node set rebuilds positions.
  React.useEffect(() => {
    if (!data) return;
    dataRef.current = data;
    const engine = engineRef.current;
    if (!engine) return;
    engine.updateData(data);
    setCats(engine.getCategories().map((c) => ({ ...c, hidden: engine.isCategoryHidden(c.name) })));
  }, [data]);

  // live status poll: prefer the typed remote, fall back to a plain HTTP refetch
  React.useEffect(() => {
    if (!hasData) return;
    const tick = async () => {
      if (document.visibilityState !== "visible") return;
      const engine = engineRef.current;
      if (!engine) return;
      try {
        const inv = ctx?.remote?.pluginInventory;
        if (inv && typeof inv.list === "function") {
          const result = await inv.list();
          if (result?.ok && Array.isArray(result.value?.entries)) {
            engine.refreshStatus(result.value.entries);
            return;
          }
        }
        throw new Error("remote unavailable");
      } catch {
        // remote not reachable → periodic full refetch (cheap: host cache)
        fetchGraph();
      }
    };
    const timer = window.setInterval(tick, 5000);
    return () => window.clearInterval(timer);
  }, [hasData, ctx, fetchGraph]);

  if (error && !data) {
    return React.createElement("div", {
      style: { padding: 40, color: "#d70015", fontSize: 13 },
    }, `加载失败: ${error}`);
  }
  if (!data) {
    return React.createElement("div", {
      style: { padding: 40, color: "var(--dsw-alias-fg-muted, #8e8e93)", fontSize: 13 },
    }, "加载中…");
  }

  const engine = engineRef.current;
  const btnStyle: React.CSSProperties = {
    border: `1px solid ${isDark ? "rgba(255,255,255,0.14)" : "rgba(0,0,0,0.1)"}`,
    background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.03)",
    color: isDark ? "#e4e4e7" : "#1d1d1f",
    borderRadius: 8,
    padding: "4px 10px",
    fontSize: 11.5,
    cursor: "pointer",
  };

  return React.createElement(
    "div",
    {
      style: {
        display: "flex", flexDirection: "column",
        width: "100%", height: "100%", minHeight: 480,
        position: "relative", overflow: "hidden",
      },
    },
    // toolbar
    React.createElement(
      "div",
      { style: { padding: "10px 18px 6px", display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", flexShrink: 0 } },
      React.createElement("span", { style: { fontWeight: 700, fontSize: 15, color: isDark ? "#f0f0f2" : "#1d1d1f" } }, t("overlay.title")),
      React.createElement("span", { style: { fontSize: 11, color: isDark ? "#707078" : "#a1a1a6" } }, `${data.nodes.length} 节点 · ${data.links.length} 关系线${updatedAt ? ` · ${updatedAt}` : ""}`),
      React.createElement("input", {
        value: searchQuery,
        placeholder: t("search.placeholder"),
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
          const q = e.target.value;
          setSearchQuery(q);
          if (engine) {
            engine.setSearch(q);
            setSearchInfo(engine.getSearchState());
          }
        },
        onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === "Enter" && engine) {
            engine.nextMatch(e.shiftKey ? -1 : 1);
            setSearchInfo(engine.getSearchState());
          }
        },
        style: {
          marginLeft: "auto", width: 200, padding: "4px 10px", fontSize: 12,
          borderRadius: 8, border: `1px solid ${isDark ? "rgba(255,255,255,0.14)" : "rgba(0,0,0,0.1)"}`,
          background: isDark ? "rgba(255,255,255,0.06)" : "#fff", color: isDark ? "#e4e4e7" : "#1d1d1f",
          outline: "none",
        },
      }),
      searchInfo.count > 0 ? React.createElement("span", { style: { fontSize: 11, color: "#5ac8fa", minWidth: 34 } }, `${searchInfo.active}/${searchInfo.count}`) : null,
      React.createElement("button", {
        style: btnStyle, onClick: () => {
          const next = layout === "ring" ? "force" : "ring";
          setLayout(next);
          engine?.setLayout(next, true);
        },
      }, layout === "ring" ? t("layout.force") : t("layout.ring")),
      React.createElement("button", { style: btnStyle, onClick: () => engine?.exportPNG() }, t("export.png")),
      React.createElement("button", { style: btnStyle, onClick: () => engine?.exportJSON() }, t("export.json")),
      React.createElement("button", { style: btnStyle, onClick: () => fetchGraph(true) }, t("action.refresh")),
      onClose ? React.createElement("button", {
        style: { ...btnStyle, borderColor: "rgba(255,69,58,0.4)", color: "#ff453a" },
        onClick: onClose,
      }, "×") : null,
    ),
    // category chips
    React.createElement(
      "div",
      {
        style: {
          display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap",
          padding: "0 18px 8px", flexShrink: 0, maxHeight: 60, overflowY: "auto",
        },
      },
      cats.some((c) => c.hidden)
        ? React.createElement("button", {
            key: "__all",
            style: { ...btnStyle, padding: "2px 8px", fontSize: 10.5 },
            onClick: () => {
              const eng = engineRef.current;
              if (!eng) return;
              for (const c of cats) eng.setCategoryHidden(c.name, false);
              setCats((prev) => prev.map((c) => ({ ...c, hidden: false })));
            },
          }, t("category.showAll"))
        : null,
      cats.map((c) => React.createElement(
        "button",
        {
          key: c.name,
          title: `${c.name} (${c.count})`,
          onClick: () => {
            const eng = engineRef.current;
            if (!eng) return;
            const hidden = !eng.isCategoryHidden(c.name);
            eng.setCategoryHidden(c.name, hidden);
            setCats((prev) => prev.map((x) => (x.name === c.name ? { ...x, hidden } : x)));
          },
          style: {
            display: "inline-flex", alignItems: "center", gap: 5,
            padding: "2px 8px", fontSize: 10.5, borderRadius: 999, cursor: "pointer",
            border: `1px solid ${c.hidden ? "transparent" : c.color + "55"}`,
            background: c.hidden ? "transparent" : c.color + "1a",
            color: c.hidden ? (isDark ? "#707078" : "#a1a1a6") : (isDark ? "#e4e4e7" : "#1d1d1f"),
            textDecoration: c.hidden ? "line-through" : "none",
          },
        },
        React.createElement("span", { style: { width: 7, height: 7, borderRadius: "50%", background: c.color, opacity: c.hidden ? 0.35 : 1 } }),
        `${c.name} ${c.count}`,
      )),
      // relation-type filter chips (line-style preview via borderTop)
      React.createElement("span", { style: { width: 1, height: 14, background: isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.1)", margin: "0 2px", flexShrink: 0 } }),
      RELATION_STYLES.map((rs) => React.createElement(
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
            display: "inline-flex", alignItems: "center", gap: 5,
            padding: "2px 8px", fontSize: 10.5, borderRadius: 999, cursor: "pointer",
            border: `1px solid ${relHidden[rs.group] ? "transparent" : rs.color + "55"}`,
            background: relHidden[rs.group] ? "transparent" : rs.color + "12",
            color: relHidden[rs.group] ? (isDark ? "#707078" : "#a1a1a6") : (isDark ? "#e4e4e7" : "#1d1d1f"),
            textDecoration: relHidden[rs.group] ? "line-through" : "none",
          },
        },
        React.createElement("span", { style: { width: 14, height: 0, borderTop: `2px ${rs.css} ${rs.color}`, opacity: relHidden[rs.group] ? 0.35 : 1 } }),
        t(rs.key as GraphKey),
      )),
    ),
    React.createElement("div", {
      ref: hostRef,
      style: { flex: 1, position: "relative", overflow: "hidden", minHeight: 420 },
    }),
    error ? React.createElement("div", { style: { position: "absolute", top: 8, left: "50%", transform: "translateX(-50%)", fontSize: 11, color: "#ff9f0a" } }, `状态刷新失败: ${error}`) : null,
  );
}

/* Sidebar footer action: 🪐 button that opens the graph as a centered modal
   window. The modal is portaled to document.body — NOT rendered inside the
   sidebar subtree — so theme effects that create stacking contexts on sidebar
   containers (e.g. aqua mica mode transforms) cannot trap it in the rail.
   The card background is the user-configurable color/image with adjustable
   opacity; the graph canvas itself renders transparently on top of it. */
function FooterGraphButton(_props: unknown) {
  const [open, setOpen] = React.useState(false);
  const isDark = useIsDark();
  const [settings, setSettings] = React.useState<ConstellationSettings>({ ...DEFAULT_SETTINGS });

  React.useEffect(() => {
    if (!open) return;
    fetchSettings().then(setSettings);
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // Primary blur mechanism: directly filter-blur every body child except our
  // own overlay. Some Chromium/Electron compositing paths silently no-op
  // backdrop-filter for portaled layers, so we don't rely on it alone.
  React.useEffect(() => {
    if (!open || settings.blur <= 0) return;
    const touched: Array<{ el: HTMLElement; prev: string }> = [];
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

  const button = React.createElement("button", {
    title: "插件星座图",
    onClick: () => setOpen(true),
    style: {
      width: 30, height: 30, borderRadius: 8, cursor: "pointer", fontSize: 15, lineHeight: 1,
      border: `1px solid ${isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.08)"}`,
      background: "transparent",
    },
  }, "🪐");

  if (!open || typeof document === "undefined") return button;

  const ref = applyCtxRef || { t: (k: GraphKey) => zh[k], ctx: null };
  const overlayProps: any = {
    "data-dshpg-overlay": "1",
    style: {
      position: "fixed", inset: 0, zIndex: 10000,
      background: isDark ? "rgba(0,0,0,0.42)" : "rgba(80,80,90,0.22)",
      display: "flex", alignItems: "center", justifyContent: "center",
    },
    onMouseDown: (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) setOpen(false);
    },
  };
  const modal = React.createElement(
    "div",
    overlayProps,
    React.createElement(
      "div",
      {
        style: {
          width: "min(1400px, 92vw)", height: "min(880px, 88vh)",
          borderRadius: 16, overflow: "hidden",
          // layered "thickness": contact shadow + mid projection + deep ambient
          boxShadow: isDark
            ? "0 2px 6px rgba(0,0,0,0.35), 0 18px 46px rgba(0,0,0,0.42), 0 48px 120px rgba(0,0,0,0.55)"
            : "0 2px 6px rgba(30,34,50,0.14), 0 18px 46px rgba(30,34,50,0.20), 0 48px 120px rgba(30,34,50,0.34)",
          border: `1px solid ${isDark ? "rgba(255,255,255,0.10)" : "rgba(255,255,255,0.55)"}`,
          display: "flex", flexDirection: "column",
          position: "relative",
        },
      },
      // background layer: frosted blur of the home page behind + user color /
      // image faded by bgOpacity. NOTE: no `isolation` on the card — an
      // isolated stacking context would cut backdrop-filter off from the page.
      React.createElement("div", {
        style: {
          position: "absolute", inset: 0, zIndex: 0,
          backgroundColor: effectiveBgColor(settings, isDark),
          backgroundImage: settings.hasImage ? "url(/dsh-plugin-constellation/bg)" : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: settings.bgOpacity,
          backdropFilter: settings.blur > 0 ? `blur(${settings.blur}px) saturate(1.15)` : undefined,
        },
      }),
      React.createElement(GraphSection, { t: ref.t, ctx: ref.ctx, onClose: () => setOpen(false) })
    )
  );
  return [button, createPortal(modal, document.body)];
}

/* Settings section: plugin background preferences (color / image / opacity). */
function SettingsSection({ t }: { t: (k: GraphKey) => string }) {
  const isDark = useIsDark();
  const [settings, setSettings] = React.useState<ConstellationSettings>({ ...DEFAULT_SETTINGS });
  const [loaded, setLoaded] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    fetchSettings().then((s) => { setSettings(s); setLoaded(true); });
  }, []);

  const patch = React.useCallback(async (p: Record<string, unknown>) => {
    try {
      const next = await saveSettingsPartial(p);
      setSettings(next);
      setError(null);
    } catch (e) {
      setError(String((e as Error).message || e));
    }
  }, []);

  const onPickImage = (file: File | undefined) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") void patch({ bgImage: reader.result });
    };
    reader.readAsDataURL(file);
  };

  if (!loaded) {
    return React.createElement("div", {
      style: { padding: 40, color: "var(--dsw-alias-fg-muted, #8e8e93)", fontSize: 13 },
    }, "加载中…");
  }

  const labelStyle: React.CSSProperties = {
    fontSize: 12, fontWeight: 600,
    color: isDark ? "#e4e4e7" : "#1d1d1f",
    marginBottom: 8,
  };
  const hintStyle: React.CSSProperties = {
    fontSize: 11, color: isDark ? "#8e8e93" : "#8e8e93", lineHeight: 1.6, marginTop: 6,
  };
  const cardStyle: React.CSSProperties = {
    background: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.02)",
    border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)"}`,
    borderRadius: 12, padding: 16, marginBottom: 14,
  };
  const inputColor = isDark ? "#e4e4e7" : "#1d1d1f";
  const btnStyle: React.CSSProperties = {
    border: `1px solid ${isDark ? "rgba(255,255,255,0.14)" : "rgba(0,0,0,0.1)"}`,
    background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.03)",
    color: inputColor, borderRadius: 8, padding: "5px 12px", fontSize: 12, cursor: "pointer",
  };

  const effColor = effectiveBgColor(settings, isDark);
  const checkerboard =
    "repeating-conic-gradient(rgba(128,128,128,0.22) 0% 25%, transparent 0% 50%) 50% / 16px 16px";

  return React.createElement("div", { style: { padding: "20px 24px", maxWidth: 640, overflowY: "auto" } },
    React.createElement("div", { style: { fontSize: 15, fontWeight: 700, color: inputColor, marginBottom: 4 } }, t("nav.label")),
    React.createElement("div", { style: { ...hintStyle, marginTop: 0, marginBottom: 16 } }, t("settings.hint")),

    // background color
    React.createElement("div", { style: cardStyle },
      React.createElement("div", { style: labelStyle }, t("settings.bgColor")),
      React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" } },
        React.createElement("input", {
          type: "color",
          value: settings.bgColor === "auto" ? effColor : settings.bgColor,
          onChange: (e: React.ChangeEvent<HTMLInputElement>) => void patch({ bgColor: e.target.value }),
          style: { width: 42, height: 30, border: "none", background: "transparent", cursor: "pointer", padding: 0 },
        }),
        React.createElement("span", {
          style: { fontFamily: "monospace", fontSize: 12, color: isDark ? "#a8a8b0" : "#6e6e73", minWidth: 72 },
        }, settings.bgColor === "auto" ? t("settings.bgAuto") : settings.bgColor.toUpperCase()),
        React.createElement("button", {
          style: { ...btnStyle, ...(settings.bgColor === "auto" ? { borderColor: "#5ac8fa", color: "#5ac8fa" } : {}) },
          onClick: () => void patch({ bgColor: "auto" }),
        }, t("settings.bgAuto")),
      ),
      React.createElement("div", { style: hintStyle }, `${t("settings.bgAuto")}: ${THEME_BG_DARK} / ${THEME_BG_LIGHT}`),
    ),

    // background image
    React.createElement("div", { style: cardStyle },
      React.createElement("div", { style: labelStyle }, t("settings.bgImage")),
      React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" } },
        React.createElement("label", { style: btnStyle },
          t("settings.bgImagePick"),
          React.createElement("input", {
            type: "file",
            accept: "image/*",
            style: { display: "none" },
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
              onPickImage(e.target.files?.[0]);
              e.target.value = "";
            },
          }),
        ),
        settings.hasImage ? React.createElement("button", {
          style: { ...btnStyle, color: "#ff453a", borderColor: "rgba(255,69,58,0.4)" },
          onClick: () => void patch({ bgImage: null }),
        }, t("settings.bgImageClear")) : null,
        settings.hasImage ? React.createElement("span", {
          style: { fontSize: 11, color: "#34c759" },
        }, "✓") : null,
      ),
      React.createElement("div", { style: hintStyle }, t("settings.bgImageHint")),
    ),

    // background opacity
    React.createElement("div", { style: cardStyle },
      React.createElement("div", { style: labelStyle },
        `${t("settings.bgOpacity")} · ${Math.round(settings.bgOpacity * 100)}%`),
      React.createElement("input", {
        type: "range", min: 0, max: 100, step: 5,
        value: Math.round(settings.bgOpacity * 100),
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
          const v = Number(e.target.value) / 100;
          setSettings((prev) => ({ ...prev, bgOpacity: v }));
        },
        onMouseUp: (e: React.MouseEvent<HTMLInputElement>) => {
          void patch({ bgOpacity: Number((e.target as HTMLInputElement).value) / 100 });
        },
        onTouchEnd: (e: React.TouchEvent<HTMLInputElement>) => {
          void patch({ bgOpacity: Number((e.target as HTMLInputElement).value) / 100 });
        },
        style: { width: "100%", accentColor: "#5ac8fa" },
      }),
      React.createElement("div", { style: hintStyle }, t("settings.bgOpacityHint")),
    ),

    // background blur (frosted glass)
    React.createElement("div", { style: cardStyle },
      React.createElement("div", { style: labelStyle },
        `${t("settings.blur")} · ${settings.blur}px`),
      React.createElement("input", {
        type: "range", min: 0, max: 40, step: 1,
        value: settings.blur,
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
          const v = Number(e.target.value);
          setSettings((prev) => ({ ...prev, blur: v }));
        },
        onMouseUp: (e: React.MouseEvent<HTMLInputElement>) => {
          void patch({ blur: Number((e.target as HTMLInputElement).value) });
        },
        onTouchEnd: (e: React.TouchEvent<HTMLInputElement>) => {
          void patch({ blur: Number((e.target as HTMLInputElement).value) });
        },
        style: { width: "100%", accentColor: "#5ac8fa" },
      }),
      React.createElement("div", { style: hintStyle }, t("settings.blurHint")),
    ),

    // preview: checkerboard behind the color/image layer at the set opacity
    React.createElement("div", { style: cardStyle },
      React.createElement("div", { style: labelStyle }, t("settings.preview")),
      React.createElement("div", {
        style: {
          height: 110, borderRadius: 10, overflow: "hidden",
          background: checkerboard, position: "relative",
        },
      },
        React.createElement("div", {
          style: {
            position: "absolute", inset: 0,
            backgroundColor: effColor,
            backgroundImage: settings.hasImage ? "url(/dsh-plugin-constellation/bg)" : undefined,
            backgroundSize: "cover", backgroundPosition: "center",
            opacity: settings.bgOpacity,
            backdropFilter: settings.blur > 0 ? `blur(${settings.blur}px) saturate(1.15)` : undefined,
          },
        }),
        React.createElement("div", {
          style: {
            position: "absolute", inset: 0,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 26,
          },
        }, "🪐✨"),
      ),
    ),

    error ? React.createElement("div", { style: { color: "#ff453a", fontSize: 12, marginTop: 4 } }, `保存失败: ${error}`) : null,
  );
}

/* Bridge for the modal: t/ctx registered by apply(). */
let applyCtxRef: { t: (k: GraphKey) => string; ctx: any } | null = null;

/* ── plugin entry ── */
export const inject = ["slots", "locale"] as const;

export function apply(ctx: Context): void {
  const NS = "dsh-plugin-constellation";
  ctx.effect(() => ctx.locale.register(NS, { zh, en }), "dsh-plugin-constellation: dictionaries");
  const t = ctx.locale.bind(NS);
  applyCtxRef = { t, ctx };

  // settings navigation entry: plugin background preferences (the graph itself
  // lives in the 🪐 modal from the sidebar footer action).
  ctx.slots.inject("settings.section", () =>
    ctx.slots.register({
      name: "settings.section",
      id: "dsh-plugin-constellation",
      order: 35,
      label: () => t("nav.label"),
      locale: NS,
      inject: () => ({}),
    }, () => React.createElement(SettingsSection, { t }))
  );

  // sidebar footer action: quick-launch the graph as a fullscreen overlay.
  try {
    ctx.slots.inject("sidebar.footer.action", () =>
      ctx.slots.register({
        name: "sidebar.footer.action",
        id: "dsh-plugin-constellation",
        order: 50,
        label: () => t("footer.tooltip"),
        locale: NS,
        inject: () => ({}),
      }, () => React.createElement(FooterGraphButton, {}))
    );
  } catch { /* sidebar slot unavailable in this build — settings entry still works */ }
}
