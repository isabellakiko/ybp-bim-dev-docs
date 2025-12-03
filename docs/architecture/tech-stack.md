# 技术栈详情

## 核心技术栈

### 框架和库

| 技术 | 版本 | 用途 | 官网 |
|------|------|------|------|
| React | ^19.2.0 | UI 框架 | [reactjs.org](https://react.dev/) |
| React DOM | ^19.2.0 | React 的 DOM 渲染器 | [reactjs.org](https://react.dev/) |
| Vite | ^7.2.4 | 构建工具和开发服务器 | [vitejs.dev](https://vitejs.dev/) |
| React Router DOM | ^7.9.6 | 路由管理 | [reactrouter.com](https://reactrouter.com/) |

### UI 和样式

| 技术 | 版本 | 用途 | 官网 |
|------|------|------|------|
| Tailwind CSS | ^3.4.18 | CSS 框架 | [tailwindcss.com](https://tailwindcss.com/) |
| @tailwindcss/typography | ^0.5.19 | Tailwind 排版插件 | [tailwindcss.com/docs/typography-plugin](https://tailwindcss.com/docs/typography-plugin) |
| PostCSS | ^8.5.6 | CSS 处理器 | [postcss.org](https://postcss.org/) |
| Autoprefixer | ^10.4.22 | CSS 自动添加浏览器前缀 | [github.com/postcss/autoprefixer](https://github.com/postcss/autoprefixer) |

### 可视化

| 技术 | 版本 | 用途 | 官网 |
|------|------|------|------|
| @xyflow/react | ^12.9.3 | 流程图和节点编辑器 | [reactflow.dev](https://reactflow.dev/) |

### Markdown 支持

| 技术 | 版本 | 用途 | 官网 |
|------|------|------|------|
| react-markdown | ^10.1.0 | Markdown 渲染组件 | [github.com/remarkjs/react-markdown](https://github.com/remarkjs/react-markdown) |
| remark-gfm | ^4.0.1 | GitHub Flavored Markdown 支持 | [github.com/remarkjs/remark-gfm](https://github.com/remarkjs/remark-gfm) |
| rehype-highlight | ^7.0.2 | 代码语法高亮 | [github.com/rehypejs/rehype-highlight](https://github.com/rehypejs/rehype-highlight) |
| rehype-raw | ^7.0.0 | 支持 Markdown 中的 HTML | [github.com/rehypejs/rehype-raw](https://github.com/rehypejs/rehype-raw) |

## 开发工具链

### 代码质量

| 技术 | 版本 | 用途 | 官网 |
|------|------|------|------|
| ESLint | ^9.39.1 | JavaScript/React 代码检查 | [eslint.org](https://eslint.org/) |
| @eslint/js | ^9.39.1 | ESLint JavaScript 配置 | [eslint.org](https://eslint.org/) |
| eslint-plugin-react-hooks | ^7.0.1 | React Hooks 规则检查 | [reactjs.org/docs/hooks-rules.html](https://react.dev/warnings/invalid-hook-call-warning) |
| eslint-plugin-react-refresh | ^0.4.24 | React Fast Refresh 支持 | [github.com/facebook/react/tree/main/packages/react-refresh](https://github.com/facebook/react/tree/main/packages/react-refresh) |

### 构建工具

| 技术 | 版本 | 用途 | 官网 |
|------|------|------|------|
| @vitejs/plugin-react | ^5.1.1 | Vite 的 React 插件 | [github.com/vitejs/vite-plugin-react](https://github.com/vitejs/vite-plugin-react) |
| vite-plugin-static-copy | ^3.1.4 | 静态资源复制插件 | [github.com/sapphi-red/vite-plugin-static-copy](https://github.com/sapphi-red/vite-plugin-static-copy) |

### 类型支持

| 技术 | 版本 | 用途 | 官网 |
|------|------|------|------|
| @types/react | ^19.2.5 | React TypeScript 类型定义 | [npmjs.com/@types/react](https://www.npmjs.com/package/@types/react) |
| @types/react-dom | ^19.2.3 | React DOM TypeScript 类型定义 | [npmjs.com/@types/react-dom](https://www.npmjs.com/package/@types/react-dom) |

### 其他工具

| 技术 | 版本 | 用途 | 官网 |
|------|------|------|------|
| globals | ^16.5.0 | 全局变量定义 | [github.com/sindresorhus/globals](https://github.com/sindresorhus/globals) |

## 包管理器

| 工具 | 说明 |
|------|------|
| pnpm | 快速、节省磁盘空间的包管理器 |

### pnpm 特性
- **节省空间**：使用硬链接和符号链接，避免重复安装
- **快速安装**：比 npm/yarn 更快的安装速度
- **严格依赖**：只有在 package.json 中声明的依赖才能被访问
- **Monorepo 支持**：天然支持 workspace 功能

## 版本对照表

### 主要依赖版本历史

| 依赖 | 当前版本 | 最低要求 | 说明 |
|------|----------|----------|------|
| Node.js | - | ≥ 18.0.0 | 建议使用 LTS 版本 |
| pnpm | - | ≥ 8.0.0 | 包管理器 |
| React | 19.2.0 | 19.x | 最新稳定版 |
| Vite | 7.2.4 | 7.x | 最新稳定版 |
| Tailwind CSS | 3.4.18 | 3.x | v3 系列 |

### 浏览器兼容性

| 浏览器 | 最低版本 |
|--------|----------|
| Chrome | ≥ 90 |
| Firefox | ≥ 88 |
| Safari | ≥ 14 |
| Edge | ≥ 90 |

> **注意**：由于使用了现代 ES 模块和 React 19，不支持 IE 11 及更低版本。

## 依赖关系图

```
YBP Frontend
│
├─── React 19
│    ├─── React DOM
│    ├─── React Router DOM 7
│    └─── @xyflow/react
│
├─── Vite 7
│    ├─── @vitejs/plugin-react
│    └─── vite-plugin-static-copy
│
├─── Tailwind CSS 3
│    ├─── @tailwindcss/typography
│    ├─── PostCSS
│    └─── Autoprefixer
│
├─── Markdown 生态
│    ├─── react-markdown
│    ├─── remark-gfm
│    ├─── rehype-highlight
│    └─── rehype-raw
│
└─── 开发工具
     ├─── ESLint 9
     │    ├─── eslint-plugin-react-hooks
     │    └─── eslint-plugin-react-refresh
     └─── TypeScript 类型定义
          ├─── @types/react
          └─── @types/react-dom
```

## 性能影响分析

### 生产构建大小（估算）

| 类别 | 大小 | 说明 |
|------|------|------|
| React + React DOM | ~140 KB | 核心框架（gzip 后） |
| React Router | ~15 KB | 路由库 |
| @xyflow/react | ~80 KB | 流程图库 |
| Tailwind CSS | 按需生成 | 仅包含使用的样式 |
| Markdown 相关 | ~50 KB | 所有 Markdown 处理库 |

### 优化策略

1. **代码分割**
   - 基于路由的懒加载
   - 动态 import 组件

2. **资源优化**
   - Vite 自动处理 Tree-shaking
   - Tailwind JIT 模式按需生成 CSS
   - 图片资源压缩和懒加载

3. **缓存策略**
   - 长期缓存静态资源
   - 服务端设置合理的缓存头

## 更新策略

### 依赖更新原则

1. **安全更新**：及时更新有安全漏洞的依赖
2. **小版本更新**：每月检查并更新小版本
3. **大版本更新**：经过充分测试后更新

### 更新检查命令

```bash
# 检查过时的依赖
pnpm outdated

# 更新所有依赖到安全版本
pnpm update

# 交互式更新依赖
pnpm update -i
```

## 相关文档

- [架构总览](./OVERVIEW.md)
- [前端开发指南](../development/frontend/)
- [package.json 配置](../../apps/frontend/package.json)

## 技术选型决策

详细的技术选型理由和权衡，请参考：
- [ADR 记录](./adr/README.md)
- [架构总览 - 技术选型理由](./OVERVIEW.md#技术选型理由)
