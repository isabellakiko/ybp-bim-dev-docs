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
| 业务逻辑 | `/logic` | 匹配规则、典型案例 |
| 问题追踪 | `/issues` | 问题筛选与追踪 |

## 目录结构

```
apps/frontend/
├── src/
│   ├── components/            # 可复用组件
│   ├── pages/                 # 3 个页面
│   │   ├── HomePage.jsx       # 首页
│   │   ├── LogicPage.jsx      # 业务逻辑页
│   │   └── IssuesPage.jsx     # 问题追踪页
│   ├── index.css              # 全局样式
│   └── App.jsx                # 路由配置
│
├── public/                    # 静态资源
├── package.json
├── vite.config.js
└── README.md
```

> 注：项目已重构为 Monorepo 结构，所有文档移至根目录 `/docs/`，AI 命令移至根目录 `/.claude/commands/`

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

> 已移至根目录

- `/docs/ai-context/CONTEXT.md` - 项目快照
- `/docs/ai-context/CURRENT.md` - 滚动日志

---

**维护者**: Stephen
**最后更新**: 2025-12-02
