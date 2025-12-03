# YBP 项目上下文（AI 快速恢复）

> AI 协作记忆文件 - 快速恢复项目上下文，立即开始工作

**最后更新**: 2025-12-03
**项目阶段**: 第二阶段 - 开发准备
**当前状态**: 工程量计算讨论完成，进入业主清单梳理

---

## TL;DR（30秒速览）

**项目名称**: YBP (永麦 BIM Platform)
**项目性质**: BIM 族库管理与工程量自动化系统
**核心理念**: 建模即算量
**技术栈**: React 19 + Vite 7 + Tailwind CSS 3

**参与方**:
- 永麦（上海永麦管理咨询有限公司）- 需求方
- 易达（广州易达建信科技开发有限公司）- 开发方

**已完成**:
- 网页可视化展示（3 页面）
- Google-inspired 暗色主题
- 项目重构为 Monorepo 结构
- 4 层文档架构
- 6 个 Slash Commands

---

## 项目结构

```
YBP/
├── .claude/
│   └── commands/           # 6 个 Slash Commands
│       ├── start.md
│       ├── checkpoint.md
│       ├── end.md
│       ├── weekly.md
│       ├── monthly.md
│       └── audit.md
│
├── apps/
│   └── frontend/           # 前端应用
│       ├── src/
│       │   ├── components/ # 组件
│       │   ├── pages/      # 3 个页面
│       │   └── index.css   # 全局样式
│       ├── package.json
│       └── vite.config.js
│
├── docs/                   # 4 层文档架构
│   ├── ai-context/         # 第1层：AI记忆
│   │   ├── CONTEXT.md
│   │   ├── CURRENT.md
│   │   └── archive/
│   ├── development/        # 第2层：开发文档
│   │   ├── DEVELOPMENT.md
│   │   └── frontend/
│   ├── architecture/       # 第3层：架构
│   │   ├── OVERVIEW.md
│   │   ├── tech-stack.md
│   │   └── adr/
│   ├── project/            # 第4层：项目/业务
│   │   ├── overview/         # 通用信息（跨阶段）
│   │   ├── 01-原型评审/       # 第一阶段（已完成）
│   │   ├── 02-开发准备/       # 第二阶段（进行中）
│   │   ├── issues/           # 问题追踪
│   │   ├── design/
│   │   ├── vision.md
│   │   └── ROADMAP.md
│   └── guides/             # 参考指南
│
├── .github/                # GitHub 配置
├── README.md
└── CONTRIBUTING.md
```

---

## 页面列表（3个）

| 路由 | 页面 | 功能 |
|------|------|------|
| `/` | HomePage | 项目概览 + 完整工作流程 |
| `/logic` | LogicPage | 匹配规则 + 典型案例 |
| `/issues` | IssuesPage | 问题追踪 |

---

## 业务核心概念

> **详细业务逻辑请查看**: [业务逻辑摘要](../project/overview/业务逻辑摘要.md)
>
> 包含：5种清单匹配方式、4种工程量计算方式、参数体系、族类型处理

```
族(Family) → 品目(Item) → 清单(Bill) → 工程量(Quantity)
     ↓           ↓           ↓            ↓
  Revit构件    系统分类     计价项目     数量计算
```

**核心要点**:
- 清单匹配：无条件 / 单参数区间 / 单参数精确 / 多参数AND / 多参数区间联合
- 工程量计算：计数 / 参数汇总 / 带系数 / 跨构件
- 参数体系：几何参数(只读) vs 非几何参数(可维护)
- 族类型：自建族(.rfa) / 系统族(在.rvt中) / 叠层墙 / 幕墙

---

## 设计系统（Google 风格暗色主题）

### 配色方案

```
表面色:
- surface-dim: #111827 (最深背景)
- surface: #1f2937 (主背景，带蓝调)
- surface-bright: #374151 (亮表面)

主色调:
- primary: #60a5fa (柔和蓝色)
- secondary: #a78bfa (紫色)
- tertiary: #34d399 (绿色)

文字色:
- on-surface: #f9fafb (主文字)
- on-surface-variant: #d1d5db (次要文字)
```

### 字体

```css
font-family: 'Times New Roman', Georgia, 'PingFang SC', 'Microsoft YaHei', serif;
```

### 动画系统

```css
.animate-fade-up    /* 入场淡入上移 */
.animate-on-scroll  /* Intersection Observer 滚动触发 */
.hover-lift         /* 悬浮上浮+阴影 */
.glass              /* 玻璃效果（backdrop-blur） */
.gradient-mesh      /* 多色渐变网格背景 */
```

---

## 技术栈

| 技术 | 版本 | 用途 |
|-----|------|------|
| React | 19 | UI 框架 |
| Vite | 7 | 构建工具 |
| React Router | 7 | 路由管理 |
| Tailwind CSS | 3 | 样式系统 |
| React Flow | 12 | 流程图 |
| pnpm | - | 包管理器 |

---

## 当前开发状态

### 第一阶段（原型评审）✅ 完成
- ✅ 网页可视化开发（3 页面）
- ✅ Google 风格 UI
- ✅ 族库维护逻辑梳理
- ✅ 需求文档 7 篇

### 第二阶段（开发准备）🚧 进行中
- ✅ 项目重构为 Monorepo 结构
- ✅ 4 层文档架构 + 阶段制文档
- ✅ 6 个 Slash Commands
- ✅ 工程量计算技术讨论（12-03 会议）
- ✅ 插件功能点确认（独立插件+集成通用代码）
- 🚧 业主清单工程量梳理（12月核心任务）
- ⏳ 族库维护遗留问题

---

## 后续开发

### 职责范围

**Stephen 负责**（12月）：
- 全面梳理业主清单工程量计算部分
- 输出：水管计算规则、系统名称应用范围、业主清单分类表
- 12月底前完成，准备交接

**1月起**：
- 李昱全面接管 YBP 系统开发

**不在范围内**：
- 清单库维护、版本管理 → 黄增沛 ↔ 李昱 直接对接
- 清单分类维护 → 李工与黄工另行对接

### 第二阶段工作模块

| 模块 | 状态 | 说明 |
|------|------|------|
| 工程量计算 | ✅ 已讨论 | 幕墙/跨品目/系统名称细分已确认，水管需专项梳理 |
| 插件功能 | ✅ 已确认 | 独立插件，类似功能集成通用代码 |
| 族库维护 | ⏳ 遗留问题 | 待李工与黄工对接 |

### 12月核心任务：业主清单工程量梳理

**总目标**：全面梳理 YBP 业主清单的工程量计算部分

| 任务 | 说明 | 状态 |
|------|------|------|
| 业主清单梳理 | 麦当劳、奥乐齐，分类 Revit自带 vs 需代码实现 | 待开始 |
| 水管系统专项 | 所有管件（双头、三通、变径等）计算规则 | 待开始 |
| 风管系统专项 | "系统名称"细分功能应用范围 | 待开始 |

**协作**：薛飘飘（建模）、造价人员（计价规则）

### 12-03 会议结论摘要

| 议题 | 结论 |
|------|------|
| 评审范围 | 三个模块全部在范围内，12-04 评审 |
| 插件功能 | 独立插件，类似功能集成通用插件代码 |
| 幕墙工程量 | 系统端可自定义配置组合基础量 |
| 跨品目清单 | 确认支持 |
| 排水管变径 | 需后续专项梳理所有管件情况 |
| 系统名称细分 | 插件端不难，系统端通过品目配置关联 |

---

## 协作偏好

### 设计约束
- ✅ Google 风格暗色主题
- ✅ Times New Roman 字体
- ✅ 中文优先
- ❌ 不使用 TypeScript
- ❌ 不使用 Tailwind v4

### Slash Commands

```bash
/start              # 恢复项目记忆
/checkpoint         # 阶段性保存进度
/end                # 每日结束
/weekly             # 每周文档优化
/monthly            # 每月归档
/audit              # 项目健康检查
```

---

## 快速导航

### AI 记忆
- [当前进度](CURRENT.md) ⭐

### 项目文档
- [项目总览](../project/overview/README.md) - 阶段摘要
- [第一阶段](../project/01-原型评审/README.md) - 原型评审（完成）
- [第二阶段](../project/02-开发准备/README.md) - 开发准备（进行中）
- [待讨论问题](../project/issues/open/99_待讨论问题.md)

### 开发参考
- [开发规范](../development/DEVELOPMENT.md)
- [架构总览](../architecture/OVERVIEW.md)
- [项目愿景](../project/vision.md)

---

**维护者**: Stephen
**更新频率**: 每次重大变更时更新
