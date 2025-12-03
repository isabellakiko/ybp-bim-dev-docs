# 页面文档

本文档说明所有页面的结构、功能和路由配置。

## 页面列表

- [HomePage (/)](#homepage) - 首页概览
- [LogicPage (/logic)](#logicpage) - 业务逻辑
- [IssuesPage (/issues)](#issuespage) - 问题追踪

---

## 路由配置

路由使用 React Router 7，在 `App.jsx` 中配置：

```jsx
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import ScrollToTop from './components/ScrollToTop'
import HomePage from './pages/HomePage'
import LogicPage from './pages/LogicPage'
import IssuesPage from './pages/IssuesPage'

function App() {
  return (
    <Layout>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/logic" element={<LogicPage />} />
        <Route path="/issues" element={<IssuesPage />} />
      </Routes>
    </Layout>
  )
}
```

### 路由表

| 路径 | 组件 | 说明 |
|------|------|------|
| `/` | HomePage | 首页概览 |
| `/logic` | LogicPage | 业务逻辑说明 |
| `/issues` | IssuesPage | 问题追踪列表 |

---

## HomePage

**路径**: `/`
**文件**: `apps/frontend/src/pages/HomePage.jsx`

### 页面说明

项目首页，展示 YBP 族库管理系统的核心概念、工作流程和项目进度。

### 页面结构

```
HomePage
├── Hero Section（主标题区）
│   ├── 状态徽章（易达评审中）
│   ├── 系统名称与介绍
│   └── 快速导航按钮
├── 核心概念（四大概念）
│   ├── 族 (Family)
│   ├── 品目 (Item)
│   ├── 清单 (Bill)
│   └── 工程量 (Quantity)
├── 完整工作流程
│   ├── 配置阶段（上传族、配置规则）
│   └── 使用阶段（下载族、建模、导出数据、匹配出量）
├── 项目进度
│   ├── 需求讨论 ✓
│   ├── 原型设计 ✓
│   ├── 易达评审 ⏳（当前）
│   └── 开发启动
└── 快速入口
    ├── 业务逻辑卡片
    └── 问题追踪卡片
```

### 核心数据

#### 核心概念

```jsx
const coreNodes = [
  { id: 'family', label: '族', sub: 'Family', color: 'from-blue-500 to-blue-600' },
  { id: 'item', label: '品目', sub: 'Item', color: 'from-purple-500 to-purple-600' },
  { id: 'bill', label: '清单', sub: 'Bill', color: 'from-emerald-500 to-emerald-600' },
  { id: 'quantity', label: '工程量', sub: 'Quantity', color: 'from-amber-500 to-amber-600' },
]
```

#### 工作流程

```jsx
const workflowSteps = [
  { phase: '配置', steps: [
    { label: '上传族', desc: 'Revit 插件', icon: '↑' },
    { label: '配置规则', desc: 'YBP 系统', icon: '⚙' },
  ]},
  { phase: '使用', steps: [
    { label: '下载族', desc: 'Revit 插件', icon: '↓' },
    { label: '建模', desc: 'Revit', icon: '🏗' },
    { label: '导出数据', desc: 'BIM 数据包', icon: '📦' },
    { label: '匹配出量', desc: 'YBP 系统', icon: '✓' },
  ]},
]
```

#### 项目里程碑

```jsx
const milestones = [
  { label: '需求讨论', done: true },
  { label: '原型设计', done: true },
  { label: '易达评审', current: true, detail: '排队中' },
  { label: '开发启动', done: false },
]
```

### 交互功能

- 滚动动画：使用 `IntersectionObserver` 实现元素进入视口时的淡入效果
- 悬停效果：卡片悬停时提升阴影和边框高亮
- 路由导航：通过 `react-router-dom` 的 `Link` 组件跳转

### 自定义 Hook

```jsx
function useScrollAnimation() {
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    const elements = ref.current?.querySelectorAll('.animate-on-scroll')
    elements?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return ref
}
```

用于为页面元素添加滚动进入视口时的动画效果。

---

## LogicPage

**路径**: `/logic`
**文件**: `apps/frontend/src/pages/LogicPage.jsx`

### 页面说明

展示 YBP 系统的业务逻辑，包括四种清单匹配规则和三个典型案例。

### 页面结构

```
LogicPage
├── 页面标题
├── 四种匹配规则
│   ├── 无条件匹配
│   ├── 精确值匹配
│   ├── 区间匹配
│   └── 多参数 AND
└── 典型案例（可展开）
    ├── 新风机（精确值匹配）
    ├── MCD-新风机（区间匹配）
    └── 楼板（多参数 AND）
```

### 核心数据

#### 匹配规则

```jsx
const matchTypes = [
  {
    id: 'unconditional',
    name: '无条件匹配',
    desc: '所有族实例都带出该清单',
    example: '排风扇 → 电源清单',
    gradient: 'from-emerald-500 to-teal-500',
  },
  {
    id: 'exact',
    name: '精确值匹配',
    desc: '参数值完全相等时匹配',
    example: '风量 = 3000',
    gradient: 'from-blue-500 to-indigo-500',
  },
  {
    id: 'range',
    name: '区间匹配',
    desc: '参数值在指定范围内匹配',
    example: '2000 ≤ 风量 < 4000',
    gradient: 'from-amber-500 to-orange-500',
  },
  {
    id: 'multi',
    name: '多参数 AND',
    desc: '多个条件同时满足才匹配',
    example: '材质=灰砖 AND 品牌=琛雄',
    gradient: 'from-purple-500 to-pink-500',
  },
]
```

#### 典型案例

**案例 1: 新风机（精确值匹配）**

```jsx
{
  id: 'fresh-air-fan',
  name: '新风机',
  type: '自建族',
  match: '精确值匹配',
  quantity: '计数（台）',
  detail: {
    param: '风量（M³/H）',
    types: ['3000M³/H', '5000M³/H', '7000M³/H'],
    bills: [
      { name: '新风机3000M³/H', condition: '风量 = 3000' },
      { name: '新风机5000M³/H', condition: '风量 = 5000' },
      { name: '新风机7000M³/H', condition: '风量 = 7000' },
    ],
  },
}
```

**案例 2: MCD-新风机（区间匹配）**

```jsx
{
  id: 'mcd-fan',
  name: 'MCD-新风机',
  type: '自建族',
  match: '区间匹配',
  quantity: '计数（台）',
  detail: {
    param: '风量（实例参数）',
    types: ['默认（只需一个）'],
    bills: [
      { name: '供应...4000CMH及以上', condition: '风量 ≥ 4000' },
      { name: '供应...2000-4000CMH', condition: '2000 ≤ 风量 < 4000' },
      { name: '供应...2000CMH及以下', condition: '风量 < 2000' },
      { name: '电源', condition: '无条件' },
    ],
  },
}
```

**案例 3: 楼板（多参数 AND）**

```jsx
{
  id: 'floor-slab',
  name: '楼板',
  type: '系统族',
  match: '多参数 AND',
  quantity: '面积汇总（m²）',
  detail: {
    param: '结构材质 + 品牌',
    types: ['MCD-厨房灰色砖'],
    bills: [
      { name: '灰色砖地面（琛雄）', condition: '材质=厨房灰色砖 AND 品牌=琛雄' },
      { name: '灰色砖地面（共荣）', condition: '材质=厨房灰色砖 AND 品牌=共荣' },
      { name: '灰色砖地面（冠军）', condition: '材质=厨房灰色砖 AND 品牌=冠军' },
    ],
  },
}
```

### 交互功能

- 案例展开/折叠：点击案例卡片展开详细信息
- 滚动动画：与 HomePage 相同的滚动进入动画
- 悬停效果：规则卡片和案例卡片的悬停高亮

### 状态管理

```jsx
const [expandedCase, setExpandedCase] = useState(null)
```

控制当前展开的案例（同一时间只展开一个）。

---

## IssuesPage

**路径**: `/issues`
**文件**: `apps/frontend/src/pages/IssuesPage.jsx`

### 页面说明

项目问题追踪页面，展示待讨论、讨论中和已解决的技术问题。

### 页面结构

```
IssuesPage
├── 页面标题
├── 统计卡片（4个）
│   ├── 全部问题
│   ├── 待讨论
│   ├── 讨论中
│   └── 已解决
└── 问题列表（可筛选、可展开）
    ├── 问题卡片
    │   ├── 状态标识
    │   ├── 优先级（P0/P1/P2）
    │   ├── 标题与描述
    │   └── 详情（可展开）
    │       ├── 问题点
    │       └── 候选方案 / 解决方案
    └── 空状态提示
```

### 核心数据

#### 问题状态配置

```jsx
const statusConfig = {
  pending: {
    label: '待讨论',
    gradient: 'from-amber-500 to-orange-500',
    bg: 'bg-amber-500/10',
    text: 'text-amber-400',
  },
  discussing: {
    label: '讨论中',
    gradient: 'from-blue-500 to-indigo-500',
    bg: 'bg-blue-500/10',
    text: 'text-blue-400',
  },
  resolved: {
    label: '已解决',
    gradient: 'from-emerald-500 to-teal-500',
    bg: 'bg-emerald-500/10',
    text: 'text-emerald-400',
  },
}
```

#### 优先级配置

```jsx
const priorityConfig = {
  P0: { label: 'P0', color: 'text-red-400', bg: 'bg-red-500/10' },
  P1: { label: 'P1', color: 'text-amber-400', bg: 'bg-amber-500/10' },
  P2: { label: 'P2', color: 'text-on-surface-variant', bg: 'bg-surface-bright/50' },
}
```

#### 问题数据示例

```jsx
{
  id: 'quantity-tech',
  title: '工程量计算技术实现',
  priority: 'P0',
  status: 'discussing',
  tag: '当前重点',
  desc: '需要搞清楚易达工程量计算的技术实现方式',
  problems: [
    '计算在哪执行？Revit 插件端 vs 系统服务器端',
    '规则如何配置？系统端配置界面/方式',
    '规则如何传递？Revit 如何识别/解码配置的规则',
    'Revit API 计算引擎如何调用？',
  ],
  solutions: [
    { label: '方向', desc: '系统配置规则 → Revit 解码 → API 计算引擎 → 输出' },
    { label: '原则', desc: '不要写死，功能解耦' },
  ],
}
```

### 交互功能

- 状态筛选：点击统计卡片筛选对应状态的问题
- 问题展开/折叠：点击问题卡片展开详细信息
- 滚动动画：与其他页面相同的滚动进入动画
- 空状态提示：筛选无结果时显示友好提示

### 状态管理

```jsx
const [expandedIssue, setExpandedIssue] = useState(null)
const [filter, setFilter] = useState('all')

const filteredIssues = filter === 'all'
  ? issues
  : issues.filter(i => i.status === filter)

const counts = {
  all: issues.length,
  pending: issues.filter(i => i.status === 'pending').length,
  discussing: issues.filter(i => i.status === 'discussing').length,
  resolved: issues.filter(i => i.status === 'resolved').length,
}
```

---

## 通用特性

### 响应式设计

所有页面支持响应式布局：

- 桌面端：`max-w-6xl` 最大宽度，左右居中
- 移动端：自动适配，网格布局变为单列
- 断点：使用 Tailwind CSS 的 `sm:` 和 `lg:` 前缀

### 滚动动画

所有页面使用相同的滚动动画系统：

```jsx
function useScrollAnimation() {
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    const elements = ref.current?.querySelectorAll('.animate-on-scroll')
    elements?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return ref
}
```

使用方式：
1. 调用 Hook 获取 ref
2. 将 ref 绑定到容器元素
3. 需要动画的元素添加 `animate-on-scroll` 类

### 主题色彩

所有页面使用一致的 Google Material Design 暗色主题：

- 背景：深色渐变网格
- 卡片：半透明背景 + 玻璃态效果
- 强调色：蓝色（`primary`）、紫色（`secondary`）
- 渐变：各功能区使用不同的渐变色区分

### 动画效果

- 淡入动画：`animate-fade-up`
- 悬停提升：`hover-lift`
- 过渡时间：200ms - 300ms
- 旋转展开：展开按钮的箭头旋转 180°
