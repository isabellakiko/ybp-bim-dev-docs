# 问题排查

本文档记录前端开发过程中遇到的常见问题及解决方案。

---

## 开发环境问题

### 依赖安装失败

**问题描述**：运行 `pnpm install` 时报错

**可能原因**：
- Node.js 版本不兼容
- pnpm 版本过低
- 网络连接问题

**解决方案**：

```bash
# 1. 检查 Node.js 版本（需要 >= 18）
node --version

# 2. 检查 pnpm 版本（需要 >= 8）
pnpm --version

# 3. 更新 pnpm
npm install -g pnpm@latest

# 4. 清除缓存后重新安装
pnpm store prune
rm -rf node_modules
pnpm install
```

---

### 开发服务器启动失败

**问题描述**：运行 `pnpm dev` 时报错

**可能原因**：
- 端口 5173 被占用
- Vite 配置错误
- 依赖缺失

**解决方案**：

```bash
# 1. 检查端口占用（macOS/Linux）
lsof -i :5173

# 2. 杀死占用进程
kill -9 <PID>

# 3. 重新安装依赖
pnpm install

# 4. 尝试不同端口启动
pnpm dev -- --port 3000
```

---

## 构建问题

### 生产构建失败

**问题描述**：运行 `pnpm build` 时报错

**可能原因**：
- ESLint 检查失败
- 未处理的异常代码
- 内存不足

**解决方案**：

```bash
# 1. 先运行 lint 检查具体错误
pnpm lint

# 2. 清理构建缓存
rm -rf dist

# 3. 重新构建
pnpm build

# 4. 如果内存不足，增加 Node.js 内存限制
NODE_OPTIONS="--max-old-space-size=4096" pnpm build
```

---

## 路由问题

### 页面刷新后 404

**问题描述**：开发环境正常，但生产环境刷新页面后显示 404

**原因**：服务器未配置 SPA 路由回退

**解决方案**：

配置服务器将所有请求重定向到 `index.html`

**Nginx 配置**：
```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

**Vite Preview 配置**：
```js
// vite.config.js
export default {
  preview: {
    port: 4173,
    strictPort: true,
  }
}
```

---

### 路由跳转不滚动到顶部

**问题描述**：切换页面后，页面停留在之前的滚动位置

**原因**：缺少 `ScrollToTop` 组件

**解决方案**：

确保在 `App.jsx` 中添加了 `ScrollToTop` 组件：

```jsx
import ScrollToTop from './components/ScrollToTop'

function App() {
  return (
    <Layout>
      <ScrollToTop />  {/* 必须在 Layout 和 Routes 之间 */}
      <Routes>
        {/* ... */}
      </Routes>
    </Layout>
  )
}
```

---

## 样式问题

### Tailwind 样式不生效

**问题描述**：添加的 Tailwind 类名不起作用

**可能原因**：
- Tailwind 配置未包含该文件路径
- 使用了动态类名（Tailwind 无法静态分析）
- 类名拼写错误

**解决方案**：

```js
// tailwind.config.js - 检查 content 配置
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",  // 确保包含所有源文件
  ],
  // ...
}
```

**避免动态类名**：
```jsx
// ❌ 错误：动态拼接类名
const color = 'blue'
<div className={`text-${color}-500`}></div>

// ✅ 正确：使用完整类名
const colorClasses = {
  blue: 'text-blue-500',
  red: 'text-red-500',
}
<div className={colorClasses[color]}></div>
```

---

### 自定义颜色变量未生效

**问题描述**：CSS 变量在某些地方不生效

**原因**：CSS 变量作用域问题或未正确引入

**解决方案**：

确保在 `index.css` 中正确定义了变量：

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --surface: #121212;
    --surface-dim: #0a0a0a;
    --surface-bright: #1e1e1e;
    /* ... */
  }
}
```

并在 `tailwind.config.js` 中引用：

```js
export default {
  theme: {
    extend: {
      colors: {
        surface: 'var(--surface)',
        // ...
      }
    }
  }
}
```

---

## 组件问题

### MarkdownRenderer 代码高亮不显示

**问题描述**：Markdown 代码块没有语法高亮

**原因**：缺少 `rehype-highlight` 插件或样式

**解决方案**：

1. 确认已安装插件：
```bash
pnpm add rehype-highlight
```

2. 在 `MarkdownRenderer.jsx` 中添加插件：
```jsx
import rehypeHighlight from 'rehype-highlight'

<ReactMarkdown
  remarkPlugins={[remarkGfm]}
  rehypePlugins={[rehypeRaw, rehypeHighlight]}
>
  {content}
</ReactMarkdown>
```

3. 引入代码高亮样式（在 `index.css` 或组件中）：
```css
@import 'highlight.js/styles/github-dark.css';
```

---

### 组件 Props 类型错误

**问题描述**：传递 Props 时控制台报警告

**原因**：Props 类型不匹配或缺少必需 Props

**解决方案**：

检查组件文档确认正确的 Props 类型，例如：

```jsx
// DocCard 必需的 Props
<DocCard
  doc={{
    id: 'doc-001',      // 必需
    title: '文档标题',   // 必需
    date: '2025-01-15',  // 可选
    summary: '摘要',     // 可选
    tags: ['标签1']      // 可选
  }}
  basePath="/docs"      // 必需
  type="communication"  // 可选，默认 'communication'
/>
```

---

## 性能问题

### 页面滚动卡顿

**问题描述**：滚动时动画掉帧

**可能原因**：
- 滚动监听过于频繁
- 动画效果过多
- 浏览器性能限制

**解决方案**：

1. 使用 `IntersectionObserver` 替代 `scroll` 事件监听（已使用）
2. 减少同时触发的动画数量
3. 使用 `will-change` CSS 属性优化动画：

```css
.hover-lift {
  will-change: transform, box-shadow;
}
```

4. 使用 `requestAnimationFrame` 节流滚动事件（如需要）

---

### 首屏加载慢

**问题描述**：首次访问加载时间过长

**可能原因**：
- 资源文件过大
- 未启用代码分割
- 未优化图片

**解决方案**：

1. 使用动态导入进行代码分割：
```jsx
// 路由级别代码分割
const HomePage = lazy(() => import('./pages/HomePage'))
```

2. 优化图片格式和大小
3. 启用 Gzip/Brotli 压缩（服务器配置）
4. 使用 CDN 加速静态资源

---

## ESLint 问题

### ESLint 报错：未使用的变量

**问题描述**：定义的组件或变量未使用时报错

**解决方案**：

如果是大写字母开头的组件，已在 `eslint.config.js` 中配置忽略：

```js
rules: {
  'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
}
```

其他情况需要删除未使用的代码，或添加 ESLint 注释：
```jsx
// eslint-disable-next-line no-unused-vars
const unusedVariable = 'value'
```

---

## React 问题

### Warning: Each child should have a unique "key"

**问题描述**：列表渲染时缺少 key 属性

**解决方案**：

为列表项添加唯一的 key：

```jsx
// ❌ 错误
{items.map((item) => <div>{item}</div>)}

// ✅ 正确
{items.map((item, index) => (
  <div key={item.id || index}>{item}</div>
))}
```

优先使用稳定的唯一 ID，避免使用 index（会导致性能问题）。

---

### Warning: Cannot update during an existing state transition

**问题描述**：在渲染过程中更新状态导致警告

**解决方案**：

将状态更新移到事件处理器或 `useEffect` 中：

```jsx
// ❌ 错误：在渲染时更新状态
function Component() {
  setState(newValue)  // 不允许
  return <div>...</div>
}

// ✅ 正确：在 useEffect 中更新
function Component() {
  useEffect(() => {
    setState(newValue)
  }, [dependency])
  return <div>...</div>
}
```

---

## 待补充

本文档将持续更新，如果您遇到新的问题并找到解决方案，请记录在此。

### 问题模板

```markdown
### 问题标题

**问题描述**：简要描述问题现象

**可能原因**：
- 原因1
- 原因2

**解决方案**：

具体的解决步骤...
```
