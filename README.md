# dsh-plugin-constellation

🪐 DSH 插件星座图 —— DeepSeek Harness 插件依赖关系可视化。

在设置面板（或侧边栏入口）中打开一张**星座图**，自动扫描当前 profile 中所有已安装插件（官方 + 第三方），按真实 `package.json` 依赖关系生成连线，一眼看清插件生态。

## 功能

- **自动生成依赖**：扫描 profile 的 `node_modules`（共享层 + desktop 层），读取每个插件 `dependencies` / `peerDependencies` 构建真实依赖图，**自动适配未来安装的任何第三方插件**
- **分类聚簇**：Web UI 层 / 客户端插件 / 核心基础设施 / 会话与持久化 / 工具层 / 第三方插件 等 15 个分类，第三方插件单独金色圈
- **启停状态**：启用插件实线 + 呼吸光效 + 信息流动；禁用插件虚线静止
- **交互**：滚轮缩放（鼠标锚点）、拖拽平移、点击节点看详情（上下游依赖链）、搜索定位、分类点击隐藏、深浅色主题跟随
- **完整插件列表**：202 节点 / 1600+ 依赖边 / 0 孤立节点

## 安装

```bash
dsh plugin --profile desktop add github:WSYXIUBA/dsh-plugin-constellation
```

## 使用

1. 打开 DSH Desktop → 设置（侧边栏底部）
2. 左侧导航点击 **🪐 插件星座图**（在"插件市场"上方）
3. 展开星座图：
   - 滚轮缩放、拖拽平移
   - 点击节点 → 详情面板（分类 / 版本 / 描述 / 上下游依赖）
   - 搜索框输入 → 高亮定位节点
   - 点击分类标签 → 隐藏/显示该分类

## 开发

```bash
npm install          # 安装依赖
npm run typecheck    # 类型检查（host + client）
npm run build        # 构建 → lib/ + client/client.js
```

### 项目结构

```
src/
  index.ts           # host 半侧：扫描 node_modules + 构建依赖图 + HTTP 路由
  client/
    index.tsx        # client 半侧：settings.section 入口 + Canvas 星座图渲染
build.mjs            # 构建脚本（tsc host + esbuild client）
cordis.patch.yml     # 插件 bundle patch
```

### 技术要点

- **host→client 桥**：dshmarket 同款 HTTP 路由模式（`webServer.register` + client `fetch` 相对路径），不依赖 typert remote
- **数据源**：`ctx.pluginInventory.list()` 提供官方启停状态；node_modules 全量扫描提供依赖边
- **安装规范**：包声明 `dsh.bundle.patch` 后，`dsh plugin add` 自动加入 profile `dsh.profile.bundles`，市场 UI 可识别/卸载

## License

MIT