---
description: 恢复 YBP 项目记忆，快速了解项目状态
allowed-tools: Read, Bash, Glob
---

<task>
恢复 YBP 项目上下文，快速了解项目状态，准备开始工作。
</task>

<workflow>

## Step 0: 获取当前时间

**运行以下命令获取时间信息**：

```bash
CURRENT_DATE=$(date +%Y-%m-%d)
CURRENT_TIME=$(date +%H:%M)
CURRENT_DATETIME="$CURRENT_DATE $CURRENT_TIME"
CURRENT_WEEK_NUM=$(date +%V)
echo "当前时间: $CURRENT_DATETIME (第 $CURRENT_WEEK_NUM 周)"
```

## Step 1: 读取核心文档

**必读文档**（所有模式）：
1. `docs/ai-context/CONTEXT.md` - 项目快照（包含：技术栈、设计系统、项目结构、开发状态）
2. `docs/ai-context/CURRENT.md` - 当前进度（包含：最近工作、已解决问题、下一步）

**根据参数额外读取**：
- `--full` 模式：同时读取 `docs/design/00_网页设计总览.md`
- `--code` 模式：读取 `src/components/Layout.jsx` 了解布局结构
- `--data` 模式：读取 `src/data/` 目录了解数据结构

## Step 2: 检查项目状态

**运行以下命令检查当前状态**：

```bash
# 检查 dev server 是否运行
lsof -i :5173 2>/dev/null | head -2 || echo "Dev server 未运行"

# 检查最近修改的文件
ls -lt src/pages/*.jsx 2>/dev/null | head -3
```

## Step 3: 输出恢复报告

**输出格式**：

```
✅ 已恢复 YBP 项目上下文

## 项目概况
- **性质**: YBP 族库管理系统 - 需求文档可视化展示
- **技术栈**: React 19 + Vite 7 + Tailwind CSS 3 + React Flow
- **当前阶段**: [从 CONTEXT.md 获取]

## 设计系统
- **主题**: 暗色主题
- **主色**: #388BFD (蓝色)
- **背景**: #0D1117 (base) / #161B22 (card)

## 页面列表 (7个)
- / - 首页
- /flow - 业务流程
- /cases - 场景案例
- /system - 系统设计
- /docs - 文档中心
- /glossary - 术语表
- /issues - 问题追踪

## 组件清单
- Layout.jsx - 页面布局
- ScrollToTop.jsx - 滚动恢复
- Button.jsx - 按钮组件
- Section.jsx - 页面区块

## 最近工作
[从 CURRENT.md 获取]

## Dev Server
[检查状态：运行中/未运行]

---
**已恢复上下文。需要启动 dev server 请运行 `pnpm dev`**
**我们从哪里开始？**
```

## Step 4: 等待用户指示

恢复上下文后，等待用户说明本次要做什么。

如果 dev server 未运行，提醒用户可以运行 `pnpm dev` 启动。

</workflow>

<tips>
## 快速恢复要点

### 技术栈
- React 19 + Vite 7
- Tailwind CSS v3（不是 v4）
- React Flow (@xyflow/react)
- 不使用 TypeScript

### 设计约束
- 暗色主题
- 中文优先
- 最小字体 text-sm (14px)
- 文字颜色使用 text-text-primary

### 常用命令
```bash
pnpm dev        # 启动开发服务器
pnpm build      # 构建生产版本
```

### 目录结构
```
src/
├── components/  # 组件
├── pages/       # 页面 (7个)
├── data/        # 数据文件 (7个)
└── index.css    # Tailwind 配置
```
</tips>
