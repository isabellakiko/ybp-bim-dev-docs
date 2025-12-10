# 页面文档

本文档说明所有页面的结构、功能和路由配置。

**最后更新**: 2025-12-10

## 页面列表

- [HomePage (/)](#homepage) - 仪表盘风格首页
- [LogicPage (/logic)](#logicpage) - 业务逻辑
- [IssuesPage (/issues)](#issuespage) - 问题追踪
- [QuantityPage (/quantity/*)](#quantitypage) - 工程量梳理（占位）

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

// 工程量梳理占位页面
function QuantityPage({ title, desc }) {
  return (
    <div className="space-y-6">
      <div className="card p-8 text-center">
        <div className="text-4xl mb-4">🚧</div>
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="text-text-secondary">{desc}</p>
        <p className="text-sm text-text-tertiary mt-4">12月核心任务 · 待数据完善</p>
      </div>
    </div>
  )
}

function App() {
  return (
    <Layout>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/logic" element={<LogicPage />} />
        <Route path="/issues" element={<IssuesPage />} />

        {/* 工程量梳理 - 占位路由 */}
        <Route path="/quantity" element={<QuantityPage title="工程量梳理" desc="业主清单与计算规则配置" />} />
        <Route path="/quantity/owner" element={<QuantityPage title="业主清单" desc="麦当劳、奥乐齐清单工程量分类" />} />
        <Route path="/quantity/pipe" element={<QuantityPage title="水管系统" desc="水管管件计算规则全面梳理" />} />
        <Route path="/quantity/duct" element={<QuantityPage title="风管系统" desc="风管及配件计算规则" />} />
      </Routes>
    </Layout>
  )
}
```

### 路由表

| 路径 | 组件 | 说明 |
|------|------|------|
| `/` | HomePage | 仪表盘风格首页 |
| `/logic` | LogicPage | 业务逻辑（匹配规则+计算类型） |
| `/issues` | IssuesPage | 问题追踪（筛选+列表） |
| `/quantity` | QuantityPage | 工程量梳理总览（占位） |
| `/quantity/owner` | QuantityPage | 业主清单（占位） |
| `/quantity/pipe` | QuantityPage | 水管系统（占位） |
| `/quantity/duct` | QuantityPage | 风管系统（占位） |

---

## Layout 组件

**文件**: `apps/frontend/src/components/Layout.jsx`

### 布局结构

```
┌─────────────────────────────────────────────────────────┐
│                     App Layout                          │
├──────────┬──────────────────────────────────────────────┤
│          │                                              │
│  Sidebar │              Main Content                    │
│  (260px) │                                              │
│          │  ┌────────────────────────────────────────┐  │
│  - 概览   │  │            Top Bar (64px)              │  │
│  - 业务   │  ├────────────────────────────────────────┤  │
│  - 工程量 │  │                                        │  │
│    ├ 业主 │  │            Page Content                │  │
│    ├ 水管 │  │                                        │  │
│    └ 风管 │  │                                        │  │
│  - 问题   │  │                                        │  │
│          │  └────────────────────────────────────────┘  │
└──────────┴──────────────────────────────────────────────┘
```

### 侧边导航配置

```javascript
const navItems = [
  { id: 'home', path: '/', label: '概览', icon: OverviewIcon },
  { id: 'logic', path: '/logic', label: '业务逻辑', icon: LogicIcon },
  {
    id: 'quantity',
    path: '/quantity',
    label: '工程量梳理',
    icon: QuantityIcon,
    badge: 'NEW',
    children: [
      { path: '/quantity/owner', label: '业主清单' },
      { path: '/quantity/pipe', label: '水管系统' },
      { path: '/quantity/duct', label: '风管系统' },
    ],
  },
  { id: 'issues', path: '/issues', label: '问题追踪', icon: IssuesIcon, badge: '3' },
]
```

### 功能特性

- **可折叠**: 展开 260px / 折叠 72px
- **子菜单**: 工程量梳理支持展开子菜单
- **移动端**: 抽屉式导航 + 遮罩
- **顶部栏**: 页面标题 + 搜索/通知按钮（预留）

---

## HomePage

**路径**: `/`
**文件**: `apps/frontend/src/pages/HomePage.jsx`

### 页面说明

仪表盘风格首页，展示关键指标、快速入口和项目进度。

### 页面结构

```
HomePage
├── 统计卡片区（4 个）
│   ├── 族库总数 (📦 1,247 +12%)
│   ├── 清单匹配率 (🎯 94.2% +3.1%)
│   ├── 本月计算量 (📊 28,450 +18%)
│   └── 待处理问题 (🔔 3 -2)
│
├── 双栏布局
│   ├── 左：快速入口（2x2 网格）
│   │   ├── 清单匹配规则 → /logic
│   │   ├── 工程量计算 → /logic
│   │   ├── 业主清单梳理 → /quantity/owner
│   │   └── 水管计算规则 → /quantity/pipe
│   │
│   └── 右：最近活动列表（4 条）
│
├── 核心流程区
│   └── 族 → 品目 → 清单 → 工程量
│
└── 项目阶段区
    └── 原型评审(✓) → 开发准备(◐) → 正式开发(○)
```

### 核心数据

```javascript
const stats = [
  { label: '族库总数', value: '1,247', change: '+12%', trend: 'up', icon: '📦' },
  { label: '清单匹配率', value: '94.2%', change: '+3.1%', trend: 'up', icon: '🎯' },
  { label: '本月计算量', value: '28,450', change: '+18%', trend: 'up', icon: '📊' },
  { label: '待处理问题', value: '3', change: '-2', trend: 'down', icon: '🔔' },
]

const coreFlow = [
  { label: '族', sub: 'Family', color: 'bg-accent-blue' },
  { label: '品目', sub: 'Item', color: 'bg-accent-purple' },
  { label: '清单', sub: 'Bill', color: 'bg-accent-green' },
  { label: '工程量', sub: 'Quantity', color: 'bg-accent-amber' },
]

const phases = [
  { label: '原型评审', date: '2025.11', done: true },
  { label: '开发准备', date: '2025.12', current: true },
  { label: '正式开发', date: '待定', done: false },
]
```

---

## LogicPage

**路径**: `/logic`
**文件**: `apps/frontend/src/pages/LogicPage.jsx`

### 页面说明

展示清单匹配规则和工程量计算类型。

### 页面结构

```
LogicPage
├── 核心流程 Badge 区
│   └── [族] → [品目] → [清单] → [工程量]
│
├── 清单匹配规则区（5 种）
│   ├── 无条件匹配（绿）
│   ├── 单参数精确（蓝）
│   ├── 单参数区间（橙）
│   ├── 多参数 AND（紫）
│   └── 多参数区间联合（粉）
│
├── 工程量计算类型区（4 种）
│   ├── 计数（台/个）
│   ├── 长度（m）
│   ├── 面积（m²）
│   └── 体积（m³）
│
└── 底部信息卡片
```

### 核心数据

```javascript
const matchTypes = [
  { id: 'unconditional', name: '无条件匹配', desc: '所有族实例都带出该清单', example: '排风扇 → 电源清单' },
  { id: 'exact', name: '单参数精确', desc: '参数值完全相等时匹配', example: '风量 = 3000' },
  { id: 'range', name: '单参数区间', desc: '参数值在指定范围内匹配', example: '2000 ≤ 风量 < 4000' },
  { id: 'multi-and', name: '多参数 AND', desc: '多个条件同时满足才匹配', example: '材质=灰砖 AND 品牌=琛雄' },
  { id: 'multi-range', name: '多参数区间联合', desc: '多个参数各自区间匹配', example: '风量 2000-4000 AND 功率 1-3kW' },
]

const quantityTypes = [
  { name: '计数', sub: 'Count', unit: '台/个', example: '风机、设备' },
  { name: '长度', sub: 'Length', unit: 'm', example: '管道、线缆' },
  { name: '面积', sub: 'Area', unit: 'm²', example: '楼板、幕墙' },
  { name: '体积', sub: 'Volume', unit: 'm³', example: '混凝土' },
]
```

---

## IssuesPage

**路径**: `/issues`
**文件**: `apps/frontend/src/pages/IssuesPage.jsx`

### 页面说明

项目问题追踪页面，支持状态筛选和问题列表展示。

### 页面结构

```
IssuesPage
├── 统计卡片区（4 个，可点击筛选）
│   ├── 全部问题 (8)
│   ├── 已解决 (5)
│   ├── 讨论中 (2)
│   └── 待讨论 (1)
│
├── 筛选标签栏
│   └── [全部] [讨论中] [待讨论] [已解决]
│
└── 问题列表
    └── 问题卡片
        ├── 状态点（绿/蓝/橙）
        ├── [P0] [讨论中] 标题
        ├── 描述
        └── [标签1] [标签2] ...
```

### 状态管理

```javascript
const [filter, setFilter] = useState('all')

const filteredIssues = filter === 'all'
  ? issues
  : issues.filter(i => i.status === filter)
```

### 配置

```javascript
const statusConfig = {
  pending: { label: '待讨论', color: 'badge-amber' },
  discussing: { label: '讨论中', color: 'badge-blue' },
  resolved: { label: '已解决', color: 'badge-green' },
}

const priorityConfig = {
  P0: { label: 'P0', color: 'badge-red' },
  P1: { label: 'P1', color: 'badge-amber' },
  P2: { label: 'P2', color: 'bg-bg-active text-text-secondary' },
}
```

---

## QuantityPage

**路径**: `/quantity/*`
**文件**: `apps/frontend/src/App.jsx`（内联组件）

### 页面说明

工程量梳理占位页面，12月核心任务完善后替换为正式页面。

### 占位设计

```jsx
function QuantityPage({ title, desc }) {
  return (
    <div className="space-y-6">
      <div className="card p-8 text-center">
        <div className="text-4xl mb-4">🚧</div>
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="text-text-secondary">{desc}</p>
        <p className="text-sm text-text-tertiary mt-4">12月核心任务 · 待数据完善</p>
      </div>
    </div>
  )
}
```

---

## CSS 类清单

### 布局类

```css
.app-layout { /* 根布局 */ }
.sidebar { /* 侧边导航 */ }
.main-content { /* 主内容区 */ }
```

### 组件类

```css
.card { /* 卡片 */ }
.badge { /* 徽章 */ }
.badge-blue, .badge-green, .badge-amber, .badge-red, .badge-purple { /* 徽章变体 */ }
.btn-ghost { /* 幽灵按钮 */ }
.status-dot { /* 状态点 */ }
.status-dot.success, .status-dot.warning, .status-dot.info { /* 状态变体 */ }
```

### 动画类

```css
.animate-fade-in { /* 淡入 */ }
.animate-fade-up { /* 淡入上移 */ }
```

---

## 响应式设计

所有页面支持响应式布局：

| 断点 | 侧边栏 | 统计卡片 | 内容区 |
|-----|--------|---------|--------|
| < 768px | 抽屉式 | 1-2列 | 全宽 |
| 768-1024px | 折叠式 | 2列 | 全宽 |
| > 1024px | 展开式 | 4列 | 全宽 |

---

## 主题色彩

使用 GitHub Dark 温暖深色调：

```css
/* 背景 */
--bg-base: #0d1117;
--bg-surface: #161b22;
--bg-elevated: #1c2128;
--bg-hover: #262c36;

/* 文字 */
--text-primary: #e6edf3;
--text-secondary: #8b949e;
--text-tertiary: #6e7681;

/* 强调色 */
--accent-blue: #58a6ff;
--accent-green: #3fb950;
--accent-amber: #d29922;
--accent-red: #f85149;
--accent-purple: #a371f7;
```
