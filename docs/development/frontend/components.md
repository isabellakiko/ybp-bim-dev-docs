# 组件文档

本文档详细说明所有可复用的前端组件。

## 组件列表

- [Layout](#layout) - 应用布局框架
- [MarkdownRenderer](#markdownrenderer) - Markdown 渲染器
- [ScrollToTop](#scrolltotop) - 页面切换滚动控制

---

## Layout

应用的主布局组件，包含头部导航、页面内容区域和底部信息。

### 功能说明

- 响应式导航栏（桌面端横向、移动端折叠菜单）
- 玻璃态（Glassmorphism）效果的固定顶栏
- 渐变背景装饰
- 自动高亮当前页面导航项

### Props

```jsx
{
  children: ReactNode  // 页面内容
}
```

### 使用示例

```jsx
import Layout from './components/Layout'

function App() {
  return (
    <Layout>
      <YourPageContent />
    </Layout>
  )
}
```

### 导航配置

导航项在组件内部定义（`navItems` 常量）：

```jsx
const navItems = [
  { path: '/', label: '概览' },
  { path: '/logic', label: '业务逻辑' },
  { path: '/issues', label: '问题追踪' },
]
```

如需新增导航项，直接在该数组中添加配置。

---

## MarkdownRenderer

Markdown 内容渲染组件，支持 GitHub Flavored Markdown 语法。

### 功能说明

- 渲染标准 Markdown 语法
- 支持 GFM 扩展（表格、删除线、任务列表等）
- 支持内联 HTML 标签
- 代码高亮显示
- 自定义 Tailwind Typography 样式

### Props

```jsx
{
  content: string  // Markdown 文本内容
}
```

### 使用示例

```jsx
import MarkdownRenderer from './components/MarkdownRenderer'

function Article() {
  const markdownContent = `
# 标题

这是一段文字，支持 **粗体** 和 *斜体*。

## 代码示例

\`\`\`javascript
console.log('Hello World')
\`\`\`
  `

  return <MarkdownRenderer content={markdownContent} />
}
```

### 支持的插件

- `remark-gfm` - GitHub Flavored Markdown
- `rehype-raw` - 允许 HTML 标签
- `rehype-highlight` - 代码高亮

---

## ScrollToTop

页面切换时自动滚动到顶部的工具组件。

### 功能说明

- 监听路由变化
- 路由变化时自动滚动到页面顶部
- 无 UI 渲染（返回 null）

### Props

无 Props（组件不接受任何参数）

### 使用示例

```jsx
import { BrowserRouter } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* 路由配置 */}
      </Routes>
    </BrowserRouter>
  )
}
```

---

## 设计规范

所有组件遵循以下设计原则：

### 颜色系统

基于 Google Material Design 暗色主题：

```css
/* Tailwind 自定义颜色变量 */
--surface: #121212
--surface-dim: #0a0a0a
--surface-bright: #1e1e1e
--on-surface: #e8e8e8
--on-surface-variant: #a0a0a0
--primary: #90caf9
--secondary: #ce93d8
--outline-variant: rgba(255, 255, 255, 0.12)
```

### 圆角规范

- 小圆角：`rounded-lg` (8px)
- 中圆角：`rounded-2xl` (16px)
- 大圆角：`rounded-3xl` (24px)
- 圆形：`rounded-full`

### 间距规范

- 组件内部间距：`p-4` ~ `p-6`
- 组件之间间距：`gap-4` ~ `gap-6`
- 页面边距：`px-6 lg:px-8`

### 动画规范

- 过渡时间：`duration-200` / `duration-300`
- 悬停效果：`hover-lift`（自定义类，提升阴影）
- 淡入动画：`animate-fade-up`（自定义动画）

---

**最后更新**: 2025-12-02
