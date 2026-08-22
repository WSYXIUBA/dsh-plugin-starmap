# dsh-plugin-constellation

🪐 DSH 插件星座图 —— DeepSeek Harness 插件依赖关系可视化。

在设置面板（或侧边栏 🪐 按钮）中打开一张**星座图**，自动扫描所有 profile 中已安装插件（官方 + 第三方），按真实 `package.json` 依赖关系生成连线，一眼看清插件生态。

## 功能

### 可视化
- **自动生成依赖**：动态枚举 `~/.dsh/profiles` 下每个 profile（desktop / web / 自定义），扫描全部 node_modules 层，读取 `dependencies` / `peerDependencies` 构建真实依赖图
- **bundles 权威分类**：以 profile 的 `dsh.profile.bundles` 为第三方插件的权威来源，未来安装的任何第三方插件自动正确分类，无需硬编码规则
- **双布局**：分类环布局 + 力导向布局（确定性力模拟，无第三方依赖）一键切换，平滑过渡
- **分类聚簇**：15 个分类（Web UI 层 / 客户端插件 / 核心基础设施 / 第三方插件 …），第三方插件金色圈
- **启停 + 运行状态**：启用实线呼吸光效；禁用虚线静止；**加载失败红色警示**；加载中橙色

### 分析工具
- **实时状态**：每 5 秒通过官方 remote（`pluginInventory`）刷新启停/运行状态，不可用时自动回退 HTTP
- **卸载影响分析**：点击节点 → "卸载影响分析"，高亮全部传递依赖方（谁会因移除它而受影响）
- **孤儿检测**：不被任何 bundle 引用、也不被任何插件传递依赖的残留包，灰色虚线圈标出（实测能找出残留的重复安装）
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
dsh plugin --profile desktop add github:WSYXIUBA/dsh-plugin-constellation
```

## 使用

1. 打开 DSH Desktop → 设置 → 左侧 **🪐 插件星座图**，或点击侧边栏底部 🪐 按钮
2. 工具栏：搜索框 / 布局切换 / 导出 PNG / 导出 JSON / 刷新
3. 分类标签条：点击隐藏/显示分类
4. 节点交互：悬停看摘要、点击看详情、双击聚焦、右键快捷操作

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
    index.tsx        # client 半侧：设置入口 + 侧边栏入口 + Canvas 星座图渲染 + 搜索/布局/导出/影响分析
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
