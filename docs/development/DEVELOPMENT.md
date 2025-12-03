# 开发文档

## 快速启动

### 前提条件

- Node.js >= 18
- pnpm >= 8

### 安装依赖

```bash
# 在项目根目录安装所有依赖
pnpm install
```

### 启动开发服务器

```bash
# 进入前端项目目录
cd apps/frontend

# 启动开发服务器
pnpm dev
```

访问 `http://localhost:5173` 查看应用。

## 项目结构

```
YBP/
├── apps/
│   └── frontend/              # 前端应用
│       ├── src/
│       │   ├── components/    # 可复用组件
│       │   ├── pages/         # 页面组件
│       │   ├── App.jsx        # 应用入口
│       │   └── main.jsx       # React 入口
│       ├── public/            # 静态资源
│       └── package.json
├── docs/                      # 项目文档
│   ├── architecture/          # 架构设计
│   ├── development/           # 开发文档
│   ├── guides/                # 使用指南
│   └── project/               # 项目管理
└── README.md
```

## 技术栈

### 核心框架
- **React 19** - UI 框架
- **Vite 7** - 构建工具
- **React Router 7** - 路由管理

### UI 与样式
- **Tailwind CSS v3** - 原子化 CSS
- **Google Material Design** - 设计系统（暗色主题）
- **React Flow** - 流程图与可视化

### Markdown 渲染
- **react-markdown** - Markdown 渲染引擎
- **remark-gfm** - GitHub Flavored Markdown 支持
- **rehype-raw** - 支持 HTML 标签
- **rehype-highlight** - 代码高亮

## 开发命令

### 前端应用（apps/frontend）

```bash
# 开发服务器（热更新）
pnpm dev

# 生产构建
pnpm build

# 预览生产构建
pnpm preview

# 代码检查
pnpm lint
```

## 代码规范

### ESLint 配置

项目使用 ESLint 9 扁平化配置（`eslint.config.js`）：

- 基础规则：`@eslint/js` 推荐配置
- React Hooks：`eslint-plugin-react-hooks` 推荐配置
- React Refresh：`eslint-plugin-react-refresh` Vite 配置
- 自定义规则：
  - 允许大写字母开头的未使用变量（组件名）

### 文件命名规范

- 组件文件：PascalCase，如 `Layout.jsx`、`DocCard.jsx`
- 页面文件：PascalCase + Page 后缀，如 `HomePage.jsx`
- 工具函数：camelCase，如 `utils.js`

### 组件编写规范

```jsx
// 1. Import 导入
import { useState } from 'react'
import { Link } from 'react-router-dom'

// 2. 常量定义
const CONSTANT_VALUE = 'value'

// 3. 工具函数
function helperFunction() {
  // ...
}

// 4. 主组件（使用 export default）
export default function ComponentName({ props }) {
  // Hooks
  const [state, setState] = useState(null)

  // 事件处理
  const handleEvent = () => {
    // ...
  }

  // 渲染
  return (
    <div>
      {/* JSX */}
    </div>
  )
}
```

### Git 提交规范

```bash
# 功能开发
feat: 添加新功能描述

# Bug 修复
fix: 修复问题描述

# 文档更新
docs: 更新文档说明

# 样式调整
style: 样式调整说明

# 代码重构
refactor: 重构说明

# 测试
test: 测试相关

# 构建配置
chore: 构建配置调整
```

## 开发工作流

1. **创建功能分支**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **开发与测试**
   - 编写代码
   - 运行 `pnpm lint` 检查代码规范
   - 本地测试功能

3. **提交代码**
   ```bash
   git add .
   git commit -m "feat: 功能描述"
   ```

4. **合并到主分支**
   ```bash
   git checkout main
   git merge feature/your-feature-name
   ```

## 相关文档

- [组件文档](./frontend/components.md) - 详细的组件 API 文档
- [页面文档](./frontend/pages.md) - 页面结构与路由配置
- [问题排查](./frontend/troubleshooting.md) - 常见问题解决方案
