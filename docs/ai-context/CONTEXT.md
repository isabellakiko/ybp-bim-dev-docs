# YBP 项目上下文（AI 快速恢复）

> AI 协作记忆文件 - 快速恢复项目上下文，立即开始工作

**最后更新**: 2025-12-10
**项目阶段**: 第四阶段 - 开发准备
**当前状态**: 文档系统优化，业主清单梳理进行中

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
- 网页可视化展示（3 页面 + 4 占位路由）
- GitHub Dark 温暖深色调 + 侧边导航
- 项目重构为 Monorepo 结构
- 4 层文档架构
- 9 个 Slash Commands

---

## 项目结构（核心）

```
YBP/
├── apps/frontend/src/      # 前端应用（3 页面 + 组件）
├── docs/
│   ├── ai-context/         # AI 记忆 ⭐
│   ├── project/            # 业务文档（阶段制）
│   │   ├── overview/       # 跨阶段信息
│   │   ├── 01-原型评审/    # 第一阶段（完成）
│   │   └── 02-开发准备/    # 第四阶段（进行中）
│   └── guides/             # 参考指南
└── .claude/commands/       # 8 个 Slash Commands
```

> 完整结构详见 [架构总览](../architecture/OVERVIEW.md)

---

## 页面列表（7个路由）

| 路由 | 页面 | 功能 |
|------|------|------|
| `/` | HomePage | 仪表盘风格首页（统计+快速入口+活动） |
| `/logic` | LogicPage | 匹配规则 + 计算类型 |
| `/issues` | IssuesPage | 问题追踪（筛选+列表） |
| `/quantity` | QuantityPage | 工程量梳理总览（占位） |
| `/quantity/owner` | QuantityPage | 业主清单（占位） |
| `/quantity/pipe` | QuantityPage | 水管系统（占位） |
| `/quantity/duct` | QuantityPage | 风管系统（占位） |

---

## 业务核心

> 详见 [业务逻辑摘要](../project/overview/业务逻辑摘要.md)

```
族(Family) → 品目(Item) → 清单(Bill) → 工程量(Quantity)
```

**核心理念**: 建模即算量 - 基于 Revit 模型自动计算工程量

---

## 设计系统

**风格**: GitHub Dark 温暖深色调
**布局**: 侧边导航（260px 展开 / 72px 折叠）+ 主内容区
**字体**: 系统字体栈（-apple-system, BlinkMacSystemFont, PingFang SC）

**核心配色**:
```css
/* 背景色（层次渐进，非纯黑）*/
--bg-base:      #0d1117;  /* 最深背景 */
--bg-surface:   #161b22;  /* 主表面 */
--bg-elevated:  #1c2128;  /* 卡片背景 */
--bg-hover:     #262c36;  /* 悬浮状态 */

/* 文字色 */
--text-primary:   #e6edf3;  /* 主文字 */
--text-secondary: #8b949e;  /* 次要文字 */
--text-tertiary:  #6e7681;  /* 辅助文字 */

/* 强调色 */
--accent-blue:   #58a6ff;
--accent-green:  #3fb950;
--accent-amber:  #d29922;
--accent-red:    #f85149;
--accent-purple: #a371f7;
```

**组件类**: `.card`, `.badge`, `.btn-ghost`, `.status-dot`

> 详见 CSS 变量定义: `apps/frontend/src/index.css`
> 详见 设计文档: `docs/project/design/00_网页设计总览.md`

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

### 第四阶段（开发准备）🚧 进行中
- ✅ 项目重构为 Monorepo 结构
- ✅ 4 层文档架构 + 8 个 Slash Commands
- ✅ 工程量计算技术讨论（12-03 会议）
- ✅ 插件功能点确认
- 🚧 AI 协作文档系统优化
- 🚧 业主清单工程量梳理（12月核心任务）

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

### 12月核心任务

> 详见 [交接进度](../project/overview/参与方.md#交接进度12月底截止)

| 任务 | 状态 |
|------|------|
| 水管工程量计算规则 | ⏳ 待开始 |
| 系统名称属性应用范围 | ⏳ 待开始 |
| 业主清单工程量分类表 | ⏳ 待开始 |

---

## 协作偏好

### 设计约束
- ✅ GitHub Dark 温暖深色调（非纯黑）
- ✅ 系统字体栈（非衬线体）
- ✅ 侧边导航布局
- ✅ 中文优先
- ❌ 不使用 TypeScript
- ❌ 不使用 Tailwind v4

---

## 快速导航

### AI 记忆
- [当前进度](CURRENT.md) ⭐

### 项目文档
- [项目总览](../project/overview/README.md)
- [第四阶段](../project/02-开发准备/README.md) - 开发准备（进行中）
- [交接清单](../project/overview/参与方.md) - 12月底截止

### 开发参考
- [开发规范](../development/DEVELOPMENT.md)
- [架构总览](../architecture/OVERVIEW.md)
- [项目愿景](../project/vision.md)

---

**维护者**: Stephen
**更新频率**: 每次重大变更时更新
