window.__ModuleLoader__.load({
  id: "dsh-plugin-constellation",
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
    var zh = {
      "nav.label": "\u63D2\u4EF6\u661F\u5EA7\u56FE",
      "overlay.title": "\u63D2\u4EF6\u5173\u7CFB\u661F\u5EA7\u56FE",
      "overlay.hint": "\u6EDA\u52A8\u7F29\u653E \xB7 \u62D6\u62FD\u5E73\u79FB \xB7 \u60AC\u505C\u63A2\u7D22 \xB7 \u70B9\u51FB\u67E5\u770B\u8BE6\u60C5",
      "footer.tooltip": "\u6253\u5F00\u63D2\u4EF6\u661F\u5EA7\u56FE"
    };
    var en = {
      "nav.label": "Plugin Graph",
      "overlay.title": "Plugin Constellation Graph",
      "overlay.hint": "Scroll to zoom \xB7 Drag to pan \xB7 Hover to explore \xB7 Click for details",
      "footer.tooltip": "Open plugin graph"
    };
    var ConstellationCanvas = class {
      canvas;
      ctx;
      wrapper;
      tooltip;
      data;
      prepared = [];
      linksIdx = [];
      byNode = /* @__PURE__ */ new Map();
      nodeIndexMap = /* @__PURE__ */ new Map();
      catList = [];
      catMembers = /* @__PURE__ */ new Map();
      catColor = /* @__PURE__ */ new Map();
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
        running: true
      };
      raf = 0;
      isDark = false;
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
        "#d4a017"
      ];
      constructor(container, data) {
        this.data = data;
        this.wrapper = container;
        this.canvas = document.createElement("canvas");
        this.canvas.style.cssText = "display:block;width:100%;height:100%;cursor:default;";
        this.wrapper.appendChild(this.canvas);
        this.ctx = this.canvas.getContext("2d");
        this.tooltip = document.createElement("div");
        this.tooltip.style.cssText = "position:absolute;background:rgba(255,255,255,0.96);border:1px solid rgba(0,0,0,0.08);border-radius:12px;padding:10px 12px;box-shadow:0 12px 40px rgba(0,0,0,0.14);pointer-events:none;z-index:10;display:none;font-size:12px;max-width:280px;color:#333;";
        this.wrapper.appendChild(this.tooltip);
        this.buildIndex();
        this.bindEvents();
        this.resize();
        this.animate();
      }
      buildIndex() {
        const { nodes, links } = this.data;
        nodes.forEach((n, i) => {
          this.nodeIndexMap.set(n.id, i);
          if (!this.catMembers.has(n.category)) {
            this.catMembers.set(n.category, []);
            this.catList.push(n.category);
          }
          this.catMembers.get(n.category).push(i);
        });
        this.catList.forEach((cat, ci) => this.catColor.set(cat, this.CATEGORY_COLORS[ci % this.CATEGORY_COLORS.length]));
        const clusterRingR = Math.sqrt(Math.max(nodes.length, 1)) * 26;
        const catCentroid = /* @__PURE__ */ new Map();
        this.catList.forEach((cat, ci) => {
          const a = ci / Math.max(this.catList.length, 1) * Math.PI * 2 - Math.PI / 2;
          const members = this.catMembers.get(cat) || [];
          const blobR = 26 + Math.sqrt(members.length) * 10;
          catCentroid.set(cat, { cx: Math.cos(a) * clusterRingR, cy: Math.sin(a) * clusterRingR, r: blobR });
        });
        let maxDegree = 1;
        const degreeMap = /* @__PURE__ */ new Map();
        links.forEach((l) => {
          degreeMap.set(l.source, (degreeMap.get(l.source) || 0) + 1);
          degreeMap.set(l.target, (degreeMap.get(l.target) || 0) + 1);
        });
        degreeMap.forEach((v) => {
          if (v > maxDegree) maxDegree = v;
        });
        this.prepared = nodes.map((n, i) => {
          const seed = this.hashStr(n.id);
          const centroid = catCentroid.get(n.category);
          const members = this.catMembers.get(n.category) || [];
          const j = members.indexOf(i);
          const la = j / Math.max(members.length, 1) * Math.PI * 2 + seed % 100 / 100 * 0.6;
          const lr = (centroid?.r || 30) * (0.25 + 0.75 * (Math.abs(seed) % 1e3 / 1e3));
          const wx = (centroid?.cx || 0) + Math.cos(la) * lr;
          const wy = (centroid?.cy || 0) + Math.sin(la) * lr;
          const degree = degreeMap.get(n.id) || 0;
          return {
            node: n,
            wx,
            wy,
            color: this.catColor.get(n.category) || "#0071e3",
            heat: this.heatColor(Math.sqrt(degree / maxDegree)),
            linkCount: degree,
            phase: Math.abs(seed) % 1e3 / 1e3 * Math.PI * 2,
            enabled: n.enabled
          };
        });
        this.linksIdx = [];
        this.byNode = /* @__PURE__ */ new Map();
        links.forEach((link, li) => {
          const ai = this.nodeIndexMap.get(link.source);
          const bi = this.nodeIndexMap.get(link.target);
          if (ai === void 0 || bi === void 0) return;
          const idx = this.linksIdx.length;
          const both = this.data.nodes[ai].enabled && this.data.nodes[bi].enabled;
          this.linksIdx.push({ a: ai, b: bi, on: both, color: this.prepared[ai].color, relation: link.relation });
          if (!this.byNode.has(ai)) this.byNode.set(ai, []);
          if (!this.byNode.has(bi)) this.byNode.set(bi, []);
          this.byNode.get(ai).push(idx);
          this.byNode.get(bi).push(idx);
        });
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
      resize() {
        const dpr = window.devicePixelRatio || 1;
        const rect = this.canvas.getBoundingClientRect();
        this.state.W = rect.width;
        this.state.H = rect.height;
        this.canvas.width = rect.width * dpr;
        this.canvas.height = rect.height * dpr;
        this.state.dpr = dpr;
        let maxR = 0;
        for (const p of this.prepared) {
          const d = Math.sqrt(p.wx * p.wx + p.wy * p.wy);
          if (d > maxR) maxR = d;
        }
        const fitZoom = maxR > 0 ? Math.min(this.state.W, this.state.H) / (maxR * 1.25) : 0.5;
        this.state.zoom = fitZoom;
        this.state.targetZoom = fitZoom;
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
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, W, H);
        ctx.fillStyle = this.isDark ? "#0f0f14" : "#ffffff";
        ctx.fillRect(0, 0, W, H);
        const time = (typeof performance !== "undefined" ? performance.now() : 0) / 1e3;
        const prepared = this.prepared;
        const screenX = new Float32Array(prepared.length);
        const screenY = new Float32Array(prepared.length);
        const visible = new Uint8Array(prepared.length);
        for (let i = 0; i < prepared.length; i++) {
          const n = prepared[i];
          const driftX = 14 * Math.sin(time * 0.6 + n.phase);
          const driftY = 14 * Math.cos(time * 0.5 + n.phase * 1.3);
          const sx = cx + (n.wx + driftX) * zoom;
          const sy = cy + (n.wy + driftY) * zoom;
          screenX[i] = sx;
          screenY[i] = sy;
          visible[i] = sx > -margin && sx < W + margin && sy > -margin && sy < H + margin ? 1 : 0;
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
          for (const li of myLinks) hoveredLinks.add(li);
        }
        let linksDrawn = 0;
        if (hoverIndex >= 0) {
          for (const li of hoveredLinks) {
            const link = this.linksIdx[li];
            const ax = screenX[link.a], ay = screenY[link.a];
            const bx = screenX[link.b], by = screenY[link.b];
            if (link.on) {
              ctx.strokeStyle = link.color;
              ctx.globalAlpha = 0.55;
              ctx.lineWidth = 1.5;
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
            if (link.on) {
              const fromHovered = link.a === hoverIndex;
              const raw = (time * 0.22 + li % 13 / 13) % 1;
              const u = fromHovered ? raw : 1 - raw;
              const iu = 1 - u;
              const px = iu * iu * ax + 2 * iu * u * midX + u * u * bx;
              const py = iu * iu * ay + 2 * iu * u * midY + u * u * by;
              ctx.globalAlpha = 0.9 * (0.4 + 0.6 * Math.sin(u * Math.PI));
              ctx.fillStyle = link.color;
              ctx.shadowColor = link.color;
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
            const ax = screenX[link.a], ay = screenY[link.a];
            const bx = screenX[link.b], by = screenY[link.b];
            if (ax < -margin && bx < -margin || ax > W + margin && bx > W + margin || ay < -margin && by < -margin || ay > H + margin && by > H + margin) continue;
            if (link.on) {
              ctx.strokeStyle = link.color;
              ctx.globalAlpha = baseAlpha * 1.2;
              ctx.lineWidth = 0.6;
              ctx.setLineDash([3, 5]);
              ctx.lineDashOffset = -time * 14;
            } else {
              ctx.strokeStyle = this.isDark ? "#3a3a44" : "#c7c7cc";
              ctx.globalAlpha = baseAlpha * 0.8;
              ctx.lineWidth = 0.4;
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
            ctx.fillStyle = color;
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
          const rawR = n.enabled ? 3.2 + Math.min(n.linkCount * 0.18, 3.2) : 2.2 + Math.min(n.linkCount * 0.12, 2.4);
          const pulse = n.enabled ? 1 + 0.13 * Math.sin(time * 1.05 + n.phase) : 1;
          const baseR = rawR * pulse;
          const r = Math.max(1.8, baseR * Math.min(zoom, 2));
          const twinkleAlpha = n.enabled ? 0.82 + 0.18 * Math.sin(time * 1.4 + n.phase * 2.1) : 1;
          const baseAlpha = n.enabled ? (0.65 + Math.min(n.linkCount * 0.035, 0.3)) * twinkleAlpha : 0.45;
          const fill = n.enabled ? n.heat : this.isDark ? "#1a1a22" : "#ffffff";
          ctx.beginPath();
          ctx.arc(sx, sy, r, 0, Math.PI * 2);
          ctx.fillStyle = fill;
          ctx.globalAlpha = isHovered ? 1 : isNeighbor ? 0.95 : hoverIndex >= 0 ? 0.08 : baseAlpha;
          if (isHovered || isNeighbor) {
            ctx.shadowColor = n.heat;
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
          if (n.enabled && n.linkCount > 3 && !isHovered && hoverIndex < 0) {
            const twinkle = 1 + 0.25 * Math.sin(time * 0.9 + n.phase * 1.7);
            ctx.beginPath();
            ctx.arc(sx, sy, r * 2, 0, Math.PI * 2);
            ctx.fillStyle = n.heat;
            ctx.globalAlpha = (0.05 + Math.min(n.linkCount * 4e-3, 0.07)) * twinkle;
            ctx.fill();
          }
          ctx.shadowBlur = 0;
          ctx.globalAlpha = 1;
          const text = n.node.id.length > 18 ? n.node.id.substring(0, 17) + "\u2026" : n.node.id;
          ctx.font = '11px -apple-system, "PingFang SC", sans-serif';
          if (isHovered) {
            ctx.fillStyle = this.isDark ? "#e4e4e7" : "#18181b";
            ctx.globalAlpha = 1;
            ctx.textAlign = "left";
            ctx.fillText(text, sx + r + 5, sy + 4);
            ctx.globalAlpha = 1;
            labelsShown++;
          } else if (zoom > 1.5 || isNeighbor) {
            const lw = 155, lh = 16;
            const lx = sx + r + 5;
            const ly = sy - 8;
            if (canPlace(lx, ly, lw, lh)) {
              claim(lx, ly, lw, lh);
              ctx.fillStyle = isNeighbor ? this.isDark ? "#a8a8b0" : "#6e6e73" : this.isDark ? "#707078" : "#a1a1a6";
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
        ctx.fillText(`\u6EDA\u52A8\u7F29\u653E \xB7 \u62D6\u62FD\u5E73\u79FB \xB7 \u60AC\u505C\u63A2\u7D22 \xB7 \u70B9\u51FB\u67E5\u770B\u8BE6\u60C5`, 12, 16);
        ctx.fillText(`\u7F29\u653E ${zoom.toFixed(2)}x \xB7 \u53EF\u89C1 ${visibleCount} \u8282\u70B9 \xB7 \u8FB9 ${linksDrawn}`, 12, H - 12);
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
      bindEvents() {
        const canvas = this.canvas;
        canvas.addEventListener("wheel", (e) => {
          e.preventDefault();
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
        canvas.addEventListener("mouseleave", () => {
          this.state.mouseX = -1;
          this.state.mouseY = -1;
          this.state.isDragging = false;
          this.state.hoverIndex = -1;
          this.tooltip.style.display = "none";
        });
      }
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
          const conn = this.data.links.filter((l) => l.source === node.id || l.target === node.id);
          const rels = conn.slice(0, 6).map((l) => {
            const other = l.source === node.id ? l.target : l.source;
            const otherNode = this.data.nodes.find((x) => x.id === other);
            const on = otherNode ? otherNode.enabled && node.enabled : false;
            return `<span style="display:inline-flex;align-items:center;gap:4px;margin:1px 4px 1px 0;background:rgba(0,0,0,0.04);border-radius:5px;padding:1px 6px;"><span style="width:5px;height:5px;border-radius:50%;background:${on ? "#34c759" : "#c7c7cc"};display:inline-block;"></span>${other}<span style="color:#a1a1a6;">${on ? "\u5B9E" : "\u865A"}</span></span>`;
          }).join("");
          tip.innerHTML = `
            <div style="font-weight:700;font-size:13px;margin-bottom:4px;">${node.enabled ? "\u25CF" : "\u25CB"} ${node.id}</div>
            <div style="color:#6e6e73;margin-bottom:5px;">${node.category} \xB7 ${n.linkCount} \u8FDE\u63A5 \xB7 ${node.enabled ? "\u542F\u7528" : "\u7981\u7528"}</div>
            <div style="color:#a1a1a6;line-height:1.5;font-size:11.5px;">${node.desc || ""}</div>
            <div style="margin-top:8px;padding-top:7px;border-top:1px solid rgba(0,0,0,0.06);color:#6e6e73;font-size:11px;line-height:1.7;">${rels || "\u65E0\u8FDE\u63A5"}</div>`;
        }
        tip.style.display = "block";
        const tipW = tip.offsetWidth, tipH = tip.offsetHeight;
        tip.style.left = Math.min(mx + 16, this.state.W - tipW - 12) + "px";
        tip.style.top = Math.min(my + 16, this.state.H - tipH - 12) + "px";
      }
      detailEl = null;
      showDetail(idx) {
        const n = this.prepared[idx];
        if (!n) return;
        this.hideDetail();
        const node = n.node;
        const el = document.createElement("div");
        el.style.cssText = "position:absolute;top:14px;right:14px;width:280px;max-height:calc(100% - 28px);overflow-y:auto;background:" + (this.isDark ? "rgba(28,28,34,0.94)" : "rgba(255,255,255,0.95)") + ";border:1px solid " + (this.isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)") + ";border-radius:14px;box-shadow:0 16px 48px rgba(0,0,0,0.14);padding:14px;z-index:5;font-size:12px;color:" + (this.isDark ? "#e4e4e7" : "#333") + ";";
        const conn = this.data.links.filter((l) => l.source === node.id || l.target === node.id);
        const outs = conn.filter((l) => l.source === node.id).slice(0, 15);
        const ins = conn.filter((l) => l.target === node.id).slice(0, 15);
        const relRow = (l, arrow) => {
          const other = arrow === "\u2192" ? l.target : l.source;
          const otherNode = this.data.nodes.find((x) => x.id === other);
          const on = otherNode ? otherNode.enabled && node.enabled : false;
          return `<div style="padding:3px 7px;border-radius:7px;cursor:pointer;color:${this.isDark ? "#a8a8b0" : "#6e6e73"};display:flex;align-items:center;gap:5px;"><span style="width:5px;height:5px;border-radius:50%;background:${on ? "#34c759" : "#c7c7cc"};flex-shrink:0;"></span><span>${arrow} ${other}</span><span style="font-size:9px;color:#a1a1a6;background:rgba(0,0,0,0.05);border-radius:4px;padding:1px 5px;margin-left:auto;">${l.relation}</span></div>`;
        };
        el.innerHTML = `
          <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:10px;">
            <div style="font-size:14px;font-weight:700;word-break:break-all;">${node.enabled ? "\u25CF" : "\u25CB"} ${node.id}</div>
            <button class="dshpg-close" style="background:none;border:none;font-size:17px;color:#a1a1a6;cursor:pointer;padding:2px 4px;">\xD7</button>
          </div>
          <div style="margin-bottom:10px;display:flex;flex-wrap:wrap;gap:5px;">
            <span style="padding:3px 9px;border-radius:14px;font-size:10.5px;font-weight:600;background:${node.enabled ? "rgba(52,199,89,0.12)" : "rgba(255,59,48,0.1)"};color:${node.enabled ? "#248a3d" : "#d70015"};">${node.enabled ? "\u542F\u7528" : "\u7981\u7528"}</span>
            <span style="padding:3px 9px;border-radius:14px;font-size:10.5px;font-weight:600;background:rgba(0,0,0,0.05);color:#6e6e73;">${node.category}</span>
          </div>
          <div style="margin-bottom:12px;"><div style="font-size:10px;color:#a1a1a6;font-weight:600;letter-spacing:0.5px;text-transform:uppercase;margin-bottom:5px;">\u63CF\u8FF0</div>
            <div style="font-size:12px;color:${this.isDark ? "#a8a8b0" : "#6e6e73"};line-height:1.6;">${node.desc || "\uFF08\u65E0\u63CF\u8FF0\uFF09"}</div></div>
          <div style="margin-bottom:12px;"><div style="font-size:10px;color:#a1a1a6;font-weight:600;letter-spacing:0.5px;text-transform:uppercase;margin-bottom:5px;">\u8FDE\u63A5\u7EDF\u8BA1</div>
            <div style="display:flex;gap:6px;">
              <div style="flex:1;background:rgba(0,0,0,0.03);border-radius:9px;padding:7px;text-align:center;"><div style="font-size:15px;font-weight:700;">${ins.length}</div><div style="font-size:9.5px;color:#a1a1a6;">\u5165\u5EA6</div></div>
              <div style="flex:1;background:rgba(0,0,0,0.03);border-radius:9px;padding:7px;text-align:center;"><div style="font-size:15px;font-weight:700;">${outs.length}</div><div style="font-size:9.5px;color:#a1a1a6;">\u51FA\u5EA6</div></div>
              <div style="flex:1;background:rgba(0,0,0,0.03);border-radius:9px;padding:7px;text-align:center;"><div style="font-size:15px;font-weight:700;">${n.linkCount}</div><div style="font-size:9.5px;color:#a1a1a6;">\u603B\u8FDE\u63A5</div></div>
            </div></div>
          ${outs.length ? `<div style="margin-bottom:12px;"><div style="font-size:10px;color:#a1a1a6;font-weight:600;letter-spacing:0.5px;text-transform:uppercase;margin-bottom:5px;">\u4F9D\u8D56\u4E0B\u6E38 (${outs.length})</div>
            ${outs.map((l) => relRow(l, "\u2192")).join("")}</div>` : ""}
          ${ins.length ? `<div><div style="font-size:10px;color:#a1a1a6;font-weight:600;letter-spacing:0.5px;text-transform:uppercase;margin-bottom:5px;">\u88AB\u4F9D\u8D56 (${ins.length})</div>
            ${ins.map((l) => relRow(l, "\u2190")).join("")}</div>` : ""}`;
        this.wrapper.appendChild(el);
        this.detailEl = el;
        el.querySelector(".dshpg-close")?.addEventListener("click", () => this.hideDetail());
      }
      hideDetail() {
        if (this.detailEl) {
          this.detailEl.remove();
          this.detailEl = null;
        }
      }
      setDark(dark) {
        this.isDark = dark;
        this.tooltip.style.background = dark ? "rgba(28,28,34,0.96)" : "rgba(255,255,255,0.96)";
        this.tooltip.style.color = dark ? "#e4e4e7" : "#333";
        this.tooltip.style.borderColor = dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)";
      }
      dispose() {
        this.state.running = false;
        cancelAnimationFrame(this.raf);
        this.canvas.remove();
        this.tooltip.remove();
        this.hideDetail();
      }
    };
    function GraphSection({ t }) {
      const hostRef = import_react.default.useRef(null);
      const engineRef = import_react.default.useRef(null);
      const [isDark, setIsDark] = import_react.default.useState(
        typeof document !== "undefined" && document.body.hasAttribute("data-ds-dark-theme")
      );
      const [data, setData] = import_react.default.useState(null);
      const [error, setError] = import_react.default.useState(null);
      import_react.default.useEffect(() => {
        let cancelled = false;
        fetch("/dsh-plugin-constellation/graph", { cache: "no-store" }).then((res) => {
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          return res.json();
        }).then((d) => {
          if (!cancelled) setData(d);
        }).catch((e) => {
          if (!cancelled) setError(e.message);
        });
        return () => {
          cancelled = true;
        };
      }, []);
      import_react.default.useEffect(() => {
        if (!hostRef.current || !data) return;
        const engine = new ConstellationCanvas(hostRef.current, data);
        engineRef.current = engine;
        engine.setDark(isDark);
        const obs = new MutationObserver(() => {
          const dark = document.body.hasAttribute("data-ds-dark-theme");
          setIsDark(dark);
          engine.setDark(dark);
        });
        obs.observe(document.body, { attributes: true, attributeFilter: ["data-ds-dark-theme"] });
        return () => {
          obs.disconnect();
          engine.dispose();
          engineRef.current = null;
        };
      }, [data, isDark]);
      if (error) {
        return import_react.default.createElement("div", {
          style: { padding: 40, color: "#d70015", fontSize: 13 }
        }, `\u52A0\u8F7D\u5931\u8D25: ${error}`);
      }
      if (!data) {
        return import_react.default.createElement("div", {
          style: { padding: 40, color: "var(--dsw-alias-fg-muted, #8e8e93)", fontSize: 13 }
        }, "\u52A0\u8F7D\u4E2D\u2026");
      }
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
        import_react.default.createElement(
          "div",
          { style: { padding: "12px 18px 8px", display: "flex", alignItems: "center", gap: 10, flexShrink: 0 } },
          import_react.default.createElement("span", { style: { fontWeight: 700, fontSize: 15, color: isDark ? "#f0f0f2" : "#1d1d1f" } }, t("overlay.title")),
          import_react.default.createElement("span", { style: { fontSize: 11, color: isDark ? "#707078" : "#a1a1a6" } }, `${data.nodes.length} \u63D2\u4EF6 \xB7 ${data.links.length} \u4F9D\u8D56`)
        ),
        import_react.default.createElement("div", {
          ref: hostRef,
          style: { flex: 1, position: "relative", overflow: "hidden", minHeight: 420 }
        })
      );
    }
    var inject = ["slots", "locale"];
    function apply(ctx) {
      const NS = "dsh-plugin-constellation";
      ctx.effect(() => ctx.locale.register(NS, { zh, en }), "dsh-plugin-constellation: dictionaries");
      const t = ctx.locale.bind(NS);
      ctx.slots.inject(
        "settings.section",
        () => ctx.slots.register({
          name: "settings.section",
          id: "dsh-plugin-constellation",
          order: 35,
          label: () => t("nav.label"),
          locale: NS,
          inject: () => ({})
        }, () => import_react.default.createElement(GraphSection, { t }))
      );
    }
    
    return module.exports;
  }
});
