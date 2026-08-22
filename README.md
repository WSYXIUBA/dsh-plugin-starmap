# dsh-plugin-starmap

🪐 DSH 插件星图 —— DeepSeek Harness 插件依赖关系可视化。

在设置面板（“星图设置”）里自定义**背景颜色 / 背景图片 / 背景透明度**，通过侧边栏底部 🪐 按钮打开居中弹窗查看星图——背景可半透明直接透视主页，画布自带缓动视差星空。

## 功能

### 设置（设置面板 → 星图设置）
- **背景颜色**：取色器自选，或"自动（跟随主题）"——深色主题深空靛蓝 `#0d1326`、浅色主题雾霭淡蓝 `#e9eef8`（刻意不用纯黑/纯白）
- **背景图片**：PNG / JPG / WebP / GIF（≤12MB），铺满窗口，与颜色叠加
- **背景透明度**：0–100% 滑杆，调低可直接透视主页，0 为完全透明；棋盘格实时预览
- 设置持久化在 `~/.dsh/dsh-plugin-starmap/settings.json`，即时保存

### 可视化
- **四类关系线**：npm 依赖（package.json deps/peer，实线）· 服务注入（Cordis `inject=[…]`，点线连向 ⚙服务枢纽）· 客户端模块（`dsh.client.inject`，虚线）· Profile 归属（bundle 成员，灰线）；工具栏可按类型开关
- **服务/Profile 枢纽**：每个被注入的 Cordis 服务是一个 ⚙枢纽节点（不猜测提供方——未知的提供方只是缺一条线，错误的提供方是谎言）；每个 profile 是 ●枢纽连向其 bundle 成员
- **自动生成**：动态枚举 `~/.dsh/profiles` 下每个 profile（desktop / web / 自定义），扫描全部 node_modules 层，读取 `dependencies` / `peerDependencies` / 入口 JS 的 inject 声明 / `dsh.client.inject`
- **bundles 权威分类**：以 profile 的 `dsh.profile.bundles` 为第三方插件的权威来源，未来安装的任何第三方插件自动正确分类，无需硬编码规则
- **双布局**：分类环布局 + 力导向布局（确定性力模拟，无第三方依赖）一键切换，平滑过渡
- **分类聚簇**：17 个分类（Web UI 层 / 核心基础设施 / 服务枢纽 / Profile 枢纽 / 第三方插件 …）
- **启停 + 运行状态**：启用实线呼吸光效；禁用虚线静止；**加载失败红色警示**；加载中橙色
- **视差星空背景**：透明画布下 140 颗缓动闪烁星星随平移产生视差

### 分析工具
- **实时状态**：每 5 秒通过官方 remote（`pluginInventory`）刷新启停/运行状态，不可用时自动回退 HTTP
- **卸载影响分析**：点击节点 → "卸载影响分析"，沿 npm 依赖 + 客户端模块线高亮全部传递受影响方（服务/Profile 线无卸载语义，不参与传播）
- **孤儿检测**：不被任何 bundle 引用、也不被任何插件 npm/client 依赖的残留包，灰色虚线圈标出（实测能找出残留的重复安装）
- **安装来源**：详情面板显示版本 / 安装源（`^1.8.0`、`github:u/r`）/ 所属 profile

### 交互
- 滚轮缩放（鼠标锚点）、拖拽平移、**双击聚焦**节点
- **搜索框**：输入即高亮匹配，Enter / Shift+Enter 循环跳转定位
- **分类隐藏**：点击分类标签条隐藏/显示分类，一键"全部显示"
- **右键菜单**：聚焦 / 复制包名 / 打开仓库主页 / npm 页面 / 影响分析
- 详情面板（O(1) 索引查询）：入度/出度/总连接、上下游依赖点击跳转
- **导出**：PNG 全景图（1920×1200，含标题统计）/ JSON 完整数据
- 深浅色主题跟随、窗口 resize 自适应、不可见时自动暂停渲染省电
- 侧边栏底部 🪐 快捷入口，全屏浮层查看

## 安装

```bash
dsh plugin --profile desktop add github:WSYXIUBA/dsh-plugin-starmap
```

## 使用

1. **打开星图**：点击侧边栏底部 🪐 按钮，居中弹窗展示（Esc / 点遮罩关闭）
2. **自定义背景**：设置 → 星图设置 → 颜色 / 图片 / 透明度，即时生效
3. 工具栏：搜索框 / 布局切换 / 导出 PNG / 导出 JSON / 刷新
4. 分类标签条：点击隐藏/显示分类
5. 节点交互：悬停看摘要、点击看详情、双击聚焦、右键快捷操作

## 开发

```bash
npm install          # 安装依赖
npm run typecheck    # 类型检查（host + client）
npm run build        # 构建 → lib/ + client/client.js
node verify-scan.mjs # 离线验证扫描/分类/孤儿检测逻辑（不依赖 Cordis）
node deploy.mjs      # 同步构建产物到本机 profile（开发调试用）
```

### 项目结构

```
src/
  index.ts           # host 半侧：动态 profile 枚举 + node_modules 扫描 + 依赖图 + 孤儿检测 + HTTP 路由（mtime 缓存）
  client/
    index.tsx        # client 半侧：设置入口 + 侧边栏入口 + Canvas 星图渲染 + 搜索/布局/导出/影响分析
build.mjs            # 构建脚本（tsc host + esbuild client）
verify-scan.mjs      # 扫描逻辑离线验证（镜像 host 实现）
deploy.mjs           # 开发部署脚本
cordis.patch.yml     # 插件 bundle patch
```

### 技术要点

- **host→client 桥**：dshmarket 同款 HTTP 路由模式（`webServer.register` + client `fetch` 相对路径）；状态刷新优先走官方 typert remote（`ctx.remote.pluginInventory`）
- **数据源**：`ctx.pluginInventory.list()` 提供启停状态 + fiber 运行相位（active/failed/loading）；node_modules 全量扫描提供依赖边
- **性能**：邻接索引 O(1) 悬停/详情查询；host 侧 mtime 键控图缓存（`?refresh=1` 强制重建）；IntersectionObserver + visibilitychange 不可见即停 rAF
- **安全**：所有来自 package.json 的字符串（id/描述/来源）在 innerHTML 拼接前转义
- **安装规范**：包声明 `dsh.bundle.patch` 后，`dsh plugin add` 自动加入 profile `dsh.profile.bundles`，市场 UI 可识别/卸载

## License

MIT
