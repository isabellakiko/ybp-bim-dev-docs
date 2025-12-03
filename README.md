# YBP 永麦 BIM 平台

> BIM 族库管理与工程量自动化系统 - 开发文档与原型站点

---

## 项目简介

YBP（永麦 BIM 平台）是一个 BIM 族库管理与工程量自动化系统。本仓库包含开发文档和原型可视化站点，用于协助研发协作。

### 核心理念

```
建模即算量
```

通过 Revit 模型自动计算工程量，取代传统 CAD 手动拉线算量方式。

### 业务流程

```
族(Family) → 品目 → 清单 → 工程量
     ↓         ↓       ↓        ↓
  Revit构件  系统分类  计价项目  数量计算
```

### 参与方

- **永麦**（上海永麦管理咨询有限公司）- 需求方
- **易达**（广州易达建信科技开发有限公司）- 开发方

---

## 核心特性

- **4 层文档架构** - 结构化的文档管理系统
- **原型网站** - 交互式系统概念可视化
- **工作流可视化** - 核心业务流程与匹配逻辑展示
- **AI 协作** - 6 个 Slash Commands 支持 Claude Code 辅助开发

---

## 技术栈

| 分类 | 技术 |
|------|------|
| 框架 | React 19 |
| 构建工具 | Vite 7 |
| 样式 | Tailwind CSS v3（暗色主题）|
| 路由 | React Router 7 |
| 流程图 | React Flow (@xyflow/react) |
| 包管理器 | pnpm |

---

## 快速开始

```bash
cd apps/frontend

# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build
```

---

## 项目结构

```
YBP/
├── .claude/
│   └── commands/           # 6 个 Slash Commands
│       ├── start.md        # 恢复项目记忆
│       ├── checkpoint.md   # 阶段性保存
│       ├── end.md          # 每日结束
│       ├── weekly.md       # 每周优化
│       ├── monthly.md      # 每月归档
│       └── audit.md        # 健康检查
│
├── apps/
│   └── frontend/           # 前端应用
│       ├── src/
│       │   ├── pages/      # 3 个页面（首页、业务逻辑、问题追踪）
│       │   ├── components/ # 可复用组件
│       │   └── index.css   # 全局样式
│       └── package.json
│
├── docs/                   # 4 层文档架构
│   ├── ai-context/         # 第 1 层：AI 记忆
│   │   ├── CONTEXT.md      # 项目快照
│   │   └── CURRENT.md      # 当前进度
│   ├── development/        # 第 2 层：开发文档
│   │   ├── DEVELOPMENT.md  # 开发指南
│   │   └── frontend/       # 前端文档
│   ├── architecture/       # 第 3 层：架构
│   │   ├── OVERVIEW.md     # 架构总览
│   │   └── tech-stack.md   # 技术栈详情
│   ├── project/            # 第 4 层：项目/业务
│   │   ├── overview/         # 通用信息（跨阶段）
│   │   ├── 01-原型评审/       # 第一阶段（已完成）
│   │   ├── 02-开发准备/       # 第二阶段（进行中）
│   │   ├── issues/           # 问题追踪
│   │   ├── design/           # 设计规范
│   │   ├── vision.md         # 项目愿景
│   │   └── ROADMAP.md        # 路线图
│   ├── guides/             # 参考指南
│   └── reports/            # 审计报告
│
├── .github/                # GitHub 模板
├── README.md
├── CONTRIBUTING.md
└── LICENSE
```

---

## 文档导航

### AI 协作命令

| 命令 | 说明 |
|------|------|
| `/start` | 恢复项目记忆 |
| `/checkpoint` | 阶段性保存进度 |
| `/end` | 每日结束总结 |
| `/weekly` | 每周文档优化 |
| `/monthly` | 每月归档 |
| `/audit` | 项目健康检查 |

### 业务文档

| 文档 | 说明 |
|------|------|
| [项目总览](docs/project/overview/README.md) | 阶段摘要与模块状态 |
| [项目概述](docs/project/01-原型评审/00_项目概述.md) | 项目背景与目标 |
| [术语表](docs/project/overview/glossary.md) | 核心术语定义 |
| [清单匹配逻辑](docs/project/01-原型评审/02_清单匹配逻辑.md) | 匹配规则详解 |
| [工程量计算](docs/project/01-原型评审/03_工程量计算.md) | 计算逻辑说明 |
| [待讨论问题](docs/project/issues/open/99_待讨论问题.md) | 待确认事项 |

### 开发文档

| 文档 | 说明 |
|------|------|
| [开发指南](docs/development/DEVELOPMENT.md) | 开发规范与流程 |
| [Slash Commands](docs/development/SLASH_COMMANDS.md) | 命令使用指南 |
| [组件文档](docs/development/frontend/components.md) | 组件 API 文档 |
| [页面文档](docs/development/frontend/pages.md) | 页面结构说明 |
| [架构总览](docs/architecture/OVERVIEW.md) | 系统架构设计 |
| [技术栈](docs/architecture/tech-stack.md) | 技术选型详情 |

---

## 许可证

[MIT License](LICENSE)

---

**维护者**: Stephen
**最后更新**: 2025-12-02
