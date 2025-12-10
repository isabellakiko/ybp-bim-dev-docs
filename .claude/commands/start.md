---
description: 恢复 YBP 项目记忆，快速了解项目状态
argument-hint: [--full | --phase | --bug | --component]
allowed-tools: Read, Bash(date, lsof, ls)
---

<task>
恢复 YBP 项目上下文，快速了解项目状态，准备开始工作。
</task>

<workflow>

## Step 0: 获取当前时间

```bash
CURRENT_DATE=$(date +%Y-%m-%d)
CURRENT_TIME=$(date +%H:%M)
CURRENT_WEEK_NUM=$(date +%V)
echo "当前时间: $CURRENT_DATE $CURRENT_TIME (第 $CURRENT_WEEK_NUM 周)"
```

## Step 1: 解析参数

| 参数 | 读取文档 | 场景 |
|------|----------|------|
| 无参数 | CONTEXT.md + CURRENT.md | 日常快速启动 |
| `--full` | 全部核心文档 | 首次使用或长时间未开发 |
| `--phase` | + 当前阶段文档 | 深入需求梳理场景 |
| `--bug` | + troubleshooting.md | Bug 修复场景 |
| `--component` | + components.md + pages.md | 组件开发场景 |

## Step 2: 读取核心文档

**必读文档**（所有模式）：
1. `docs/ai-context/CONTEXT.md` - 项目快照
2. `docs/ai-context/CURRENT.md` - 当前进度

**--full 模式额外读取**：
- `docs/project/overview/README.md` - 项目总览
- `docs/project/vision.md`
- `docs/project/ROADMAP.md`
- `docs/architecture/OVERVIEW.md`

**--phase 模式额外读取**（当前阶段：02-开发准备）：
- `docs/project/02-开发准备/README.md`
- `docs/project/02-开发准备/工程量计算规则梳理.md` ⭐ 12月核心
- `docs/project/02-开发准备/工程量计算/README.md`
- `docs/project/02-开发准备/插件功能/README.md`
- `docs/project/issues/open/99_待讨论问题.md`
- `docs/project/overview/参与方.md` - 交接清单

**--bug 模式额外读取**：
- `docs/development/frontend/troubleshooting.md`

**--component 模式额外读取**：
- `docs/development/frontend/components.md`
- `docs/development/frontend/pages.md`

## Step 3: 检查项目状态

```bash
# 检查环境版本
echo "=== 环境信息 ==="
node -v
pnpm -v

# 检查 dev server 是否运行
lsof -i :5173 2>/dev/null | head -2 || echo "Dev server 未运行"

# 检查最近修改的文件
ls -lt apps/frontend/src/pages/*.jsx 2>/dev/null | head -3
```

## Step 4: 输出恢复报告

```
✅ 已恢复 YBP 项目上下文

## 项目概况
- **名称**: YBP (永麦 BIM Platform)
- **性质**: BIM 族库管理与工程量自动化系统
- **核心理念**: 建模即算量
- **技术栈**: React 19 + Vite 7 + Tailwind CSS 3

## 项目阶段
- **第一阶段（原型评审）**: ✅ 完成
- **第二阶段（开发准备）**: 🚧 进行中
  - 业主清单工程量梳理（12月核心）
  - 水管计算规则
  - 1月交接准备（李昱接管）

## 项目结构
```
YBP/
├── apps/frontend/    # 前端应用
├── docs/             # 4层文档架构
│   ├── ai-context/   # AI记忆
│   ├── project/      # 项目文档（阶段制）
│   │   ├── overview/     # 跨阶段信息
│   │   ├── 01-原型评审/   # 第一阶段
│   │   └── 02-开发准备/   # 第二阶段
│   └── ...
└── .claude/commands/ # Slash Commands
```

## Dev Server
[运行中/未运行]

---
**需要启动 dev server 请运行 `cd apps/frontend && pnpm dev`**
**我们从哪里开始？**
```

</workflow>

<tips>
## 快速参考

### 技术栈
- React 19 + Vite 7
- Tailwind CSS v3（暗色主题）
- React Router 7
- 不使用 TypeScript

### 常用命令
```bash
cd apps/frontend
pnpm dev      # 启动开发服务器
pnpm build    # 构建生产版本
pnpm lint     # 代码检查
```

### 文档导航
- `docs/ai-context/` - AI 记忆
- `docs/project/overview/业务逻辑摘要.md` - 核心业务逻辑
- `docs/project/01-原型评审/` - 第一阶段文档
- `docs/project/02-开发准备/` - 第二阶段文档（当前）
- `docs/project/issues/` - 问题追踪

### Slash Commands
- `/start` - 恢复项目记忆
- `/start --phase` - 深入当前阶段需求
- `/checkpoint` - 阶段性保存
- `/end` - 每日结束
</tips>
