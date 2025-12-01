# YBP 项目文档与可视化

> YBP 族库管理系统 - 需求文档可视化展示

## 项目简介

本项目用于整理永麦与易达关于 YBP/YDC 系统的沟通内容，并通过网页进行可视化展示，便于汇报和演示。

**参与方**：
- **永麦**（上海永麦管理咨询有限公司）- 需求方
- **易达**（广州易达建信科技开发有限公司）- 开发方

**项目目标**：
1. 结构化整理与易达的沟通内容
2. 制作可视化网页用于汇报演示
3. 沉淀知识，便于后续查阅

## 技术栈

- **框架**: React 19
- **构建**: Vite 7
- **样式**: Tailwind CSS v3（暗色主题）
- **路由**: React Router 7
- **流程图**: React Flow (@xyflow/react)

## 快速开始

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build
```

## 页面列表

| 页面 | 路由 | 说明 |
|-----|------|------|
| 首页 | `/` | 项目概览、核心流程、进度 |
| 业务流程 | `/flow` | React Flow 流程图 |
| 场景案例 | `/cases` | 展开式案例卡片 |
| 系统设计 | `/system` | 架构、模块、对比 |
| 文档中心 | `/docs` | 文档列表 |
| 术语表 | `/glossary` | 术语查询 |
| 问题追踪 | `/issues` | 问题筛选 |

## 目录结构

```
frontend/
├── .claude/
│   └── commands/              # AI Slash Commands
│       ├── start.md           # /start - 恢复记忆
│       ├── checkpoint.md      # /checkpoint - 阶段性更新
│       ├── end.md             # /end - 结束会话
│       └── weekly.md          # /weekly - 每周优化
│
├── docs/
│   ├── ai-context/            # AI 记忆层
│   │   ├── CONTEXT.md         # 项目快照
│   │   └── CURRENT.md         # 滚动日志
│   │
│   ├── business/              # 业务文档
│   │   ├── overview/          # 概述（项目背景、术语）
│   │   ├── core-logic/        # 核心逻辑（匹配、计算、参数）
│   │   ├── implementation/    # 实现细节（族处理、原型、案例）
│   │   └── pending/           # 待讨论问题
│   │
│   ├── design/                # 设计文档
│   │
│   └── guides/                # 通用指南
│
├── src/
│   ├── components/            # 组件
│   ├── pages/                 # 页面（7个）
│   └── data/                  # 数据文件
│
└── README.md
```

## 业务核心概念

```
族(Family) → 品目 → 清单 → 工程量
     ↓         ↓       ↓        ↓
  Revit构件  系统分类  计价项目  数量计算
```

**匹配逻辑**：
- 无条件匹配（一对多清单）
- 精确值匹配（风量 = 3000）
- 区间匹配（2000 ≤ 风量 < 4000）
- 多参数 AND 匹配（材质 + 品牌）

## 开发状态

- [x] 项目初始化
- [x] 业务文档整理（9篇）
- [x] AI 协作系统配置
- [x] 暗色主题设计系统
- [x] 7 个页面开发完成
- [x] 响应式适配
- [x] 全站中文化
- [ ] 易达评审（预计 11-26）

## AI 协作

本项目配置了 AI 协作系统，使用 Claude Code 的 Slash Commands 进行记忆管理。

### 常用命令

```bash
/start              # 恢复项目记忆（每次新会话必用）
/start --full       # 完整恢复（读取设计文档）
/checkpoint         # 阶段性更新进度
/end                # 结束会话
/weekly             # 每周文档优化
```

### 核心文件

- `docs/ai-context/CONTEXT.md` - 项目快照
- `docs/ai-context/CURRENT.md` - 滚动日志

---

**维护者**: Stephen
**最后更新**: 2025-11-25
