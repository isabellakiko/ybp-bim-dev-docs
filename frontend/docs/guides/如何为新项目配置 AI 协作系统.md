# 如何为新项目配置 AI 协作系统

> 完整指南：从零到一建立高效的 AI 协作文档系统与工作流

**文档性质**: 独立参考指南（可复用于任何新项目）
**创建日期**: 2025-11-23
**维护者**: Stephen Kaylon Chan
**适用场景**: 任何需要与 AI 长期协作的软件项目

---

## 📖 目录

1. [为什么需要这个系统](#1-为什么需要这个系统)
2. [系统价值与收益](#2-系统价值与收益)
3. [核心设计理念](#3-核心设计理念)
4. [文档架构设计（4 层）](#4-文档架构设计4-层)
5. [Slash Commands 配置](#5-slash-commands-配置)
6. [AI 记忆恢复机制](#6-ai-记忆恢复机制)
7. [Git 工作流配置](#7-git-工作流配置)
8. [详细实施步骤（从零到一）](#8-详细实施步骤从零到一)
9. [最佳实践与避坑指南](#9-最佳实践与避坑指南)
10. [常见问题 FAQ](#10-常见问题-faq)

---

## 1. 为什么需要这个系统

### 问题场景

在与 AI 长期协作开发项目时，你可能遇到过：

**🔴 问题 1：AI 记忆丢失**
- 每次新会话，AI 都不记得项目状态
- 需要反复解释项目背景、技术栈、设计决策
- 浪费大量时间在上下文恢复上

**🔴 问题 2：文档混乱**
- 文档散落各处，没有统一组织
- AI 文档和开发者文档混在一起
- 找不到需要的信息，文档价值低

**🔴 问题 3：进度跟踪困难**
- 不知道上次做到哪里了
- 没有系统的进度记录
- 无法回顾开发历程

**🔴 问题 4：工作流低效**
- 每次结束会话都要手动更新文档
- 没有标准化流程
- 容易遗漏重要信息

### 解决方案

本指南提供的 **AI 协作系统** 包含：

✅ **4 层文档架构** - 分离关注点，提高信息检索效率
✅ **Slash Commands 工作流** - 自动化日常操作，节省 73% 时间
✅ **AI 记忆恢复机制** - 30 秒快速恢复项目上下文
✅ **Git 工作流集成** - 版本控制 + 文档更新一体化
✅ **归档机制** - 长期项目也能保持文档轻量

---

## 2. 系统价值与收益

### 定量收益

| 指标 | 优化前 | 优化后 | 提升 |
|------|--------|--------|------|
| **AI 上下文恢复时间** | ~2 分钟（复制粘贴 395 行） | ~30 秒（`/start`） | 75% |
| **每日会话结束时间** | ~10 分钟（复制粘贴 403 行） | ~2 分钟（`/end --push`） | 80% |
| **每周文档维护时间** | ~30 分钟 | ~10 分钟（`/weekly`） | 67% |
| **每月文档维护时间** | ~60 分钟 | ~20 分钟（`/monthly`） | 67% |
| **月度总时间节省** | ~5.5 小时 | ~1.5 小时 | **73%** |
| **AI Token 消耗** | ~5000 tokens/会话 | ~3000 tokens/会话 | **40%** |

### 定性收益

✅ **AI 协作体验提升**
- AI 能准确理解项目状态
- 减少重复解释，提高对话质量
- AI 建议更贴合项目实际情况

✅ **项目可维护性提升**
- 完整的开发历程记录
- 重要决策有 ADR 文档支撑
- 问题排查有 troubleshooting 记录

✅ **知识沉淀**
- 所有开发经验都有文档记录
- 团队成员快速上手
- 可复用的最佳实践

---

## 3. 核心设计理念

### 3.1 分离关注点（Separation of Concerns）

**原则**：AI 文档 vs 开发者文档分离

- **AI 文档**（`ai-context/`）：为 AI 恢复记忆设计，追求简洁高效
- **开发者文档**（`development/`, `architecture/`, `project/`）：为人类阅读设计，追求详细完整

### 3.2 渐进式信息披露（Progressive Disclosure）

**原则**：快速启动 → 按需深入

- **快速启动**（`/start`）：只读取核心文档（CONTEXT.md + CURRENT.md）
- **场景启动**（`/start --bug`）：额外读取场景相关文档（troubleshooting.md）
- **完整启动**（`/start --full`）：读取所有核心文档（vision.md + design.md + ADR）

### 3.3 自动化优先（Automation First）

**原则**：能自动化的绝不手动

- **Slash Commands**：将重复操作封装为命令（`/start`, `/checkpoint`, `/end`）
- **时间工具调用**：自动获取准确时间，避免计算错误
- **智能 commit**：检测现有 commit，避免重复提交

### 3.4 轻量化设计（Lightweight）

**原则**：保持文档精简，避免膨胀

- **定期优化**（`/weekly`）：删除冗余内容，压缩详细日志
- **归档机制**（`/monthly`）：历史内容归档，保持 CURRENT.md 轻量
- **Token 优化**：AI 上下文从 ~5000 降至 ~3000 tokens

---

## 4. 文档架构设计（4 层）

### 4.1 架构总览

```
docs/
├── ai-context/          # 第 1 层：AI 记忆层（核心，最高优先级）
│   ├── CONTEXT.md       # 项目快照（AI 上下文中枢）⭐
│   ├── CURRENT.md       # 滚动开发日志（本周/本月进度）⭐
│   └── archive/         # 历史归档（超过 1 个月的 CURRENT.md）
│
├── development/         # 第 2 层：开发文档层（开发者参考）
│   ├── frontend/        # 前端开发文档
│   │   ├── components.md      # 组件快速参考
│   │   ├── pages.md           # 页面开发要点
│   │   └── troubleshooting.md # 故障排查指南
│   ├── backend/         # 后端开发文档（未来）
│   ├── DEVELOPMENT.md   # 开发规范总览
│   └── SLASH_COMMANDS.md # Slash Commands 使用指南
│
├── architecture/        # 第 3 层：架构层（技术决策）
│   ├── OVERVIEW.md      # 架构总览
│   ├── tech-stack.md    # 技术栈详细说明
│   └── adr/             # Architecture Decision Records
│       ├── README.md    # ADR 索引
│       ├── 001-xxx.md   # ADR 001
│       └── 002-xxx.md   # ADR 002
│
└── project/             # 第 4 层：项目层（愿景与规划）
    ├── vision.md        # 个人愿景、背景、风格偏好 ⭐
    ├── design.md        # 功能设计、网站结构
    ├── ROADMAP.md       # 开发路线图
    └── DEPLOYMENT.md    # 部署文档
```

### 4.2 各层详细说明

#### 第 1 层：AI 记忆层（`ai-context/`）

**目标**：为 AI 快速恢复项目上下文

**核心文件**：

1. **CONTEXT.md**（项目快照）⭐
   - **作用**：AI 上下文恢复中枢，30 秒了解项目全貌
   - **内容**：
     - TL;DR（30 秒速览）
     - 项目本质（类型、特点）
     - 当前开发状态（阶段、已完成、待完成）
     - 技术栈（前端、后端、工具）
     - 下一步任务（优先级排序）
     - 协作偏好（开发节奏、设计风格、Git 规范）
     - 快速导航（文档链接）
   - **更新频率**：每周或重大变更时更新
   - **Token 效率**：~2800 tokens（优化后）

2. **CURRENT.md**（滚动开发日志）⭐
   - **作用**：记录本周/本月开发进度，AI 了解最近完成了什么
   - **内容**：
     - 本周概览（时间范围、Week X）
     - Day-by-day 开发日志（Day 1, Day 2, ...）
     - 本周任务（待办列表）
     - 技术亮点（新技术、新方案）
     - 遇到的问题与解决方案
   - **更新频率**：每次 `/checkpoint` 或 `/end` 自动更新
   - **归档机制**：每月归档到 `archive/YYYY-MM.md`

3. **archive/**（历史归档）
   - **作用**：存储超过 1 个月的 CURRENT.md
   - **命名**：`YYYY-MM.md`（如 `2025-11.md`）
   - **清理策略**：超过 6 个月的归档可压缩或删除

**设计原则**：
- ✅ 简洁高效（~3000 tokens 以内）
- ✅ 快速检索（TL;DR + 分层导航）
- ✅ 实时更新（自动化工作流）

#### 第 2 层：开发文档层（`development/`）

**目标**：为开发者提供详细的技术参考

**核心文件**：

1. **frontend/components.md**
   - 所有组件的快速参考（名称、用途、Props、示例）
   - 定期更新（新增组件时）

2. **frontend/pages.md**
   - 所有页面的开发要点（路由、状态、特殊逻辑）

3. **frontend/troubleshooting.md**
   - 常见问题与解决方案（Bug 修复记录）
   - 每次修复 Bug 后更新

4. **DEVELOPMENT.md**
   - 开发规范总览（代码规范、Git 规范、目录结构）

5. **SLASH_COMMANDS.md**
   - Slash Commands 使用指南（命令总览、参数说明、最佳实践）

**设计原则**：
- ✅ 详细完整（包含代码示例、截图）
- ✅ 易于查找（分类清晰、目录完整）
- ✅ 持续更新（与代码同步）

#### 第 3 层：架构层（`architecture/`）

**目标**：记录技术决策，支撑长期可维护性

**核心文件**：

1. **OVERVIEW.md**
   - 架构总览（系统架构图、技术选型、设计模式）

2. **tech-stack.md**
   - 技术栈详细说明（版本、用途、选型理由）
   - 每月审查一次（与 package.json 对比）

3. **adr/**（Architecture Decision Records）
   - ADR 模板：
     ```markdown
     # ADR-XXX: [标题]

     **日期**: YYYY-MM-DD
     **状态**: 已接受 / 已拒绝 / 已废弃

     ## 背景
     [描述问题和上下文]

     ## 决策
     [描述做出的决策]

     ## 理由
     [解释为什么这样决策]

     ## 后果
     [正面后果 + 负面后果]

     ## 替代方案
     [考虑过但未采用的方案]
     ```

**设计原则**：
- ✅ 决策可追溯（为什么这样做）
- ✅ 持续更新（技术选型变化时）
- ✅ 团队共识（重大决策必须有 ADR）

#### 第 4 层：项目层（`project/`）

**目标**：定义项目愿景、规划、设计

**核心文件**：

1. **vision.md**⭐
   - 个人愿景、背景、风格偏好
   - AI 理解开发者意图的关键文档
   - 首次使用 `/start --full` 时必读

2. **design.md**
   - 功能设计、网站结构、页面详细设计

3. **ROADMAP.md**
   - 开发路线图（Phase 1, Phase 2, ...）

4. **DEPLOYMENT.md**
   - 部署文档（Vercel、域名、环境变量）

**设计原则**：
- ✅ 愿景驱动（为什么做这个项目）
- ✅ 用户视角（产品功能、用户体验）
- ✅ 长期规划（Roadmap 清晰）

---

## 5. Slash Commands 配置

### 5.1 什么是 Slash Commands

Slash Commands 是 Claude Code 的自定义工作流命令，将重复操作封装为可复用的命令。

**示例**：
- `/start` - 恢复项目记忆
- `/checkpoint` - 阶段性更新进度
- `/end` - 结束每日开发
- `/weekly` - 每周文档优化
- `/monthly` - 每月归档
- `/audit` - 项目健康检查

### 5.2 目录结构

```
.claude/
└── commands/
    ├── start.md       # /start 命令
    ├── checkpoint.md  # /checkpoint 命令
    ├── end.md         # /end 命令
    ├── weekly.md      # /weekly 命令
    ├── monthly.md     # /monthly 命令
    └── audit.md       # /audit 命令
```

### 5.3 命令文件格式

每个 `.md` 文件包含：

```markdown
---
description: 命令描述（显示在 UI 中）
argument-hint: [参数提示]
allowed-tools: Read, Write, Edit, Bash(...)
---

<task>
命令的任务描述
</task>

<workflow>
## Step 0: 获取当前时间（必须）

**运行以下命令获取时间信息**：

```bash
CURRENT_DATE=$(date +%Y-%m-%d)
CURRENT_TIME=$(date +%H:%M)
CURRENT_DATETIME="$CURRENT_DATE $CURRENT_TIME"
CURRENT_WEEK_NUM=$(date +%V)
```

## Step 1: [步骤标题]

[详细步骤说明]

...
</workflow>
```

### 5.4 核心命令详细配置

#### 5.4.1 `/start` - 恢复记忆

**文件**：`.claude/commands/start.md`

**核心逻辑**：
```markdown
<workflow>
## 读取文档

**必读**（所有模式）：
1. docs/ai-context/CONTEXT.md
2. docs/ai-context/CURRENT.md

**根据参数读取**：
- `--full` 模式：vision.md + design.md + ADR
- `--bug` 模式：troubleshooting.md
- `--component` 模式：components.md
- `--architecture` 模式：OVERVIEW.md
- `--deploy` 模式：DEPLOYMENT.md
- `--content` 模式：design.md + mockData.js
- `--performance` 模式：tech-stack.md（性能优化部分）

## 验证理解

输出格式：
```
✅ 已恢复上下文

## 验证理解

1. ✅ **项目类型**：[从 CONTEXT.md 获取]
2. ✅ **当前阶段**：[从 CONTEXT.md 获取]
3. ✅ **技术栈**：[从 CONTEXT.md 获取]
4. ✅ **下一步任务**：[从 CURRENT.md 获取]
5. ✅ **设计原则**：[核心约束]
6. ✅ **核心约束**：[技术约束]

---

**已恢复上下文。当前阶段：[Phase X.Y]，下一步：[任务]。我们从哪里开始？**
```
</workflow>
```

**参数**：
- 无参数 / `--quick`：快速启动（默认）
- `--full`：完整启动（首次使用）
- `--bug`：Bug 修复模式
- `--component`：组件开发模式
- `--architecture`：架构调整模式
- `--deploy`：部署场景模式
- `--content`：内容创作模式
- `--performance`：性能优化模式

#### 5.4.2 `/checkpoint` - 阶段性更新

**文件**：`.claude/commands/checkpoint.md`

**核心逻辑**：
```markdown
<workflow>
## Step 0: 获取当前时间

```bash
CURRENT_DATE=$(date +%Y-%m-%d)
CURRENT_TIME=$(date +%H:%M)
CURRENT_DAY_OF_WEEK=$(date +%u)
case $CURRENT_DAY_OF_WEEK in
    1) DAY_NAME="周一" ;;
    2) DAY_NAME="周二" ;;
    # ... 其他
esac
```

## Step 1: 总结当前工作

1. 完成的工作
2. 遇到的问题和解决方案
3. 剩余工作

## Step 2: 更新文档

1. **检查并更新 CURRENT.md**
   - 判断今天（$CURRENT_DATE）是否已有 Day X 条目
   - 如果没有：添加新的 Day X 条目
   - 如果已有：在该条目中追加本阶段工作内容

2. **场景更新**（根据工作内容自动判断）
   - Bug 修复场景：创建 troubleshooting 文档
   - 组件开发场景：更新 components 文档
   - 新功能场景：考虑是否更新 README.md

## Step 3: Git 操作（根据参数）

- 如果包含 `--commit`：自动创建 commit（不 push）
- 如果包含 `--skip-git`：跳过 Git 操作
- 如果无参数：询问用户是否需要 commit

## Step 4: 输出检查点报告
</workflow>
```

**参数**：
- 无参数：询问是否需要 commit
- `--commit`：自动创建 commit（不 push）
- `--skip-git`：跳过 Git 操作

#### 5.4.3 `/end` - 每日结束

**文件**：`.claude/commands/end.md`

**核心逻辑**：
```markdown
<workflow>
## Step 0: 获取当前时间

```bash
CURRENT_DATE=$(date +%Y-%m-%d)
CURRENT_TIME=$(date +%H:%M)
NEXT_DAY=$(date -d tomorrow +%d)
# 判断明天是否是下月第一天（归档判断）
if [ "$NEXT_DAY" == "01" ]; then
    NEED_ARCHIVE=true
fi
```

## Step 1: 总结本次会话

1. 所有完成的工作
2. 遇到的问题和解决方案
3. 未完成的工作
4. 下次会话建议

## Step 2: 更新文档（完整更新）

1. 更新 CURRENT.md（如果 /checkpoint 已更新，则补充完善）
2. 更新场景相关文档
3. 检查是否需要更新 CONTEXT.md（重大变化）

## Step 3: Git 操作（智能 commit）

**检查是否已有 checkpoint commit**：
```bash
LAST_COMMIT_DATE=$(git log -1 --format=%cd --date=short)
LAST_COMMIT_MSG=$(git log -1 --format=%s)
if [ "$LAST_COMMIT_DATE" == "$CURRENT_DATE" ] && [[ "$LAST_COMMIT_MSG" == *"checkpoint"* ]]; then
    # 使用 git commit --amend 追加到 checkpoint commit
    USE_AMEND=true
else
    # 创建新的 commit
    USE_AMEND=false
fi
```

**根据参数推送**：
- 如果包含 `--push`：自动推送到远程
- 如果包含 `--no-push`：不推送到远程
- 如果无参数：询问用户是否需要 push

## Step 4: 归档判断（仅月末）

如果 `NEED_ARCHIVE=true` 或包含 `--archive` 参数：
1. 自动执行 `/monthly` 流程
2. 归档 CURRENT.md 到 `archive/YYYY-MM.md`
3. 创建新月份 CURRENT.md 模板

## Step 5: 输出完成报告
</workflow>
```

**参数**：
- 无参数：创建 commit，询问是否 push
- `--push`：自动推送到远程
- `--no-push`：不推送到远程
- `--archive`：强制归档（月中也可以）

#### 5.4.4 `/weekly` - 每周排查

**文件**：`.claude/commands/weekly.md`

**核心逻辑**：
```markdown
<workflow>
## Step 0: 获取当前时间

```bash
WEEK_START=$(date -d "last monday" +%Y-%m-%d)
WEEK_END=$(date -d "next sunday" +%Y-%m-%d)
WEEK_COMMITS=$(git log --since="$WEEK_START" --until="$WEEK_END 23:59:59" --oneline | wc -l)
```

## Step 1: 审查 CURRENT.md

1. 删除冗余内容（重复信息、过度详细的日志）
2. 合并重复条目
3. 压缩详细日志（保留关键信息）
4. 统计本周工作量（commits、完成任务数）

## Step 2: 审查其他文档

1. troubleshooting 文档（是否有过时内容）
2. components 文档（是否与代码同步）
3. CONTEXT.md（是否需要更新状态）

## Step 3: Token 优化报告

1. 统计优化前 Token（估算）
2. 统计优化后 Token
3. 计算节省百分比

## Step 4: 更新 CONTEXT.md

1. 更新"当前状态"
2. 更新"下周任务"

## Step 5: Git 操作

创建 commit + 可选 push

## Step 6: 输出周报
</workflow>
```

**参数**：
- 无参数：创建 commit，询问是否 push
- `--push`：自动推送到远程
- `--no-push`：不推送到远程

#### 5.4.5 `/monthly` - 每月排查

**文件**：`.claude/commands/monthly.md`

**核心逻辑**：
```markdown
<workflow>
## Step 0: 获取当前时间

```bash
CURRENT_MONTH=$(date +%Y-%m)
NEXT_MONTH=$(date -d "+1 month" +%Y-%m)
NEXT_MONTH_FIRST_DAY="$NEXT_MONTH-01"
NEXT_MONTH_WEEK_NUM=$(date -d "$NEXT_MONTH_FIRST_DAY" +%V)
```

## Step 1: 强制归档 CURRENT.md

1. 复制到 `archive/$CURRENT_MONTH.md`
2. 创建新月份 CURRENT.md 模板（使用 $NEXT_MONTH 变量）

## Step 2: 更新 CONTEXT.md

1. 更新项目阶段
2. 更新代码统计
3. 更新下月任务

## Step 3: 审查所有文档（彻底）

1. 列出所有文档
2. 检查过时文档
3. 检查文档链接
4. 检查文档命名
5. **审查 tech-stack.md**（新增）：
   - 读取 tech-stack.md 中的版本
   - 读取 package.json 中的实际版本
   - 对比差异，建议更新

## Step 4: 清理 archive 目录

1. 检查超过 6 个月的归档
2. 建议处理方式（压缩或删除）

## Step 5: Token 成本总报告

1. 统计所有 AI 文档 Token
2. 对比上月
3. 优化建议

## Step 6: Git 操作

创建 commit + 可选 push

## Step 7: 输出月报
</workflow>
```

**参数**：
- 无参数：创建 commit，询问是否 push
- `--push`：自动推送到远程（推荐）
- `--no-push`：不推送到远程

#### 5.4.6 `/audit` - 项目健康检查

**文件**：`.claude/commands/audit.md`

**核心逻辑**：
```markdown
<workflow>
## Step 0: 获取当前时间

```bash
CURRENT_DATE=$(date +%Y-%m-%d)
CURRENT_WEEK_NUM=$(date +%V)
```

## Step 1: 代码质量检查

1. ESLint 检查
2. 未使用依赖检查（depcheck）

## Step 2: 依赖健康检查

1. 过时依赖统计（pnpm outdated）
2. 安全漏洞扫描（pnpm audit）
3. tech-stack.md vs package.json 版本一致性检查

## Step 3: 性能指标追踪（--full 模式）

1. 构建性能测试（time pnpm build）
2. 读取历史 metrics.json（如果存在）
3. 对比变化趋势

## Step 4: 待办事项汇总

1. 从 CURRENT.md 提取待办项（P0/P1/P2）
2. 从代码提取 TODO/FIXME 注释

## Step 5: 文档同步检查

1. 组件文档完整性（src/components vs components.md）
2. 页面文档完整性（src/features vs pages.md）
3. tech-stack.md 版本一致性

## Step 6: Git 状态检查

1. 未提交文件统计
2. 本周 commits 统计

## Step 7: 输出审计报告

生成 `docs/reports/audit-$CURRENT_DATE.md`
</workflow>
```

**参数**：
- 无参数：标准检查
- `--quick`：快速检查（跳过性能测试）
- `--full`：完整检查（包含性能测试）
- `--security`：安全检查（重点安全漏洞）

### 5.5 关键设计要点

#### 5.5.1 时间工具调用（Critical）

**问题**：手动写时间容易出错（~20% 错误率）

**解决方案**：每个命令都必须在 Step 0 调用时间工具

```bash
CURRENT_DATE=$(date +%Y-%m-%d)
CURRENT_TIME=$(date +%H:%M)
CURRENT_DATETIME="$CURRENT_DATE $CURRENT_TIME"
CURRENT_WEEK_NUM=$(date +%V)
```

**好处**：
- ✅ 时间 100% 准确
- ✅ 自动填充文档中的时间字段
- ✅ 避免月末/周末计算错误

#### 5.5.2 智能 commit 策略

**问题**：`/checkpoint` 和 `/end` 可能在同一天执行，导致重复 commit

**解决方案**：`/end` 检测今天是否已有 checkpoint commit

```bash
LAST_COMMIT_DATE=$(git log -1 --format=%cd --date=short)
LAST_COMMIT_MSG=$(git log -1 --format=%s)
if [ "$LAST_COMMIT_DATE" == "$CURRENT_DATE" ] && [[ "$LAST_COMMIT_MSG" == *"checkpoint"* ]]; then
    USE_AMEND=true  # 使用 git commit --amend
else
    USE_AMEND=false  # 创建新 commit
fi
```

#### 5.5.3 自动归档判断

**问题**：手动判断月末容易忘记

**解决方案**：`/end` 自动检测明天是否是下月第一天

```bash
NEXT_DAY=$(date -d tomorrow +%d)
if [ "$NEXT_DAY" == "01" ]; then
    NEED_ARCHIVE=true  # 自动执行归档
fi
```

---

## 6. AI 记忆恢复机制

### 6.1 核心文件：CONTEXT.md

**作用**：AI 上下文恢复中枢，30 秒了解项目全貌

**模板**：

```markdown
# 项目上下文（AI 快速恢复）

> AI 协作记忆文件 - 快速恢复项目上下文，立即开始工作

**最后更新**: YYYY-MM-DD HH:MM
**项目阶段**: Phase X.Y（阶段描述）
**当前状态**: 状态描述

---

## TL;DR（30秒速览）

**项目性质**: [项目类型]
**技术栈**: [核心技术栈]
**核心特点**: [3-5 个特点]
**开发进度**: [已完成 + 进行中]
**下一步**: [下一步任务]

**关键决策** (参考 ADR 文档):
- [ADR-001](../architecture/adr/001-xxx.md) - [决策标题]
- [ADR-002](../architecture/adr/002-xxx.md) - [决策标题]

---

## 🎯 项目本质

这是一个 **[项目类型]**，展示：

- [功能点 1]
- [功能点 2]
- [功能点 3]

**设计理念**:
- [设计理念 1]
- [设计理念 2]
- [设计理念 3]

---

## 📊 当前开发状态

### ✅ Phase 1: [阶段名称]（YYYY-MM-DD）

**已完成**：
- ✅ [功能 1]
- ✅ [功能 2]

### 🚧 Phase 2: [阶段名称]（下一步）

**待完成任务**：
- [ ] [任务 1]
- [ ] [任务 2]

---

## 🛠️ 技术栈

### 前端
- **框架**: [框架 + 版本]
- **语言**: [语言]
- **包管理**: [包管理工具]
- **样式**: [样式方案]

### 后端（如果有）
- **框架**: [框架 + 版本]
- **语言**: [语言]
- **数据库**: [数据库]

---

## 🎯 下一步任务

### 当前焦点：[焦点任务]

**优先级 1**（本周完成）:
1. [任务 1]
2. [任务 2]

**优先级 2**（下周）:
1. [任务 1]
2. [任务 2]

---

## 🤝 协作偏好（重要！必读）

### 开发节奏
- ✅ **每次只执行一步** - 不要一次性做太多改动
- ✅ **说明原因和目的** - 每一步都要解释为什么
- ✅ **等待确认** - 完成一步后等待用户确认

### 设计风格
- ✅ [设计原则 1]
- ✅ [设计原则 2]
- ❌ [禁止事项]

### Git 提交规范
```
<type>: <subject>

type 类型：
- feat:      新功能
- fix:       修复 bug
- docs:      文档更新
- refactor:  重构
- perf:      性能优化
```

---

## 📚 快速导航（深度了解）

### 核心文档
- [当前进度](CURRENT.md) - 本周/本月开发进度 ⭐
- [项目总览](../../README.md) - 快速了解项目
- [开发规范](../development/DEVELOPMENT.md) - 代码规范

### 项目文档
- [个人愿景](../project/vision.md) - 开发者背景、愿景 ⭐
- [功能设计](../project/design.md) - 网站结构与功能设计
- [架构总览](../architecture/OVERVIEW.md) - 技术架构说明
- [ADR 索引](../architecture/adr/README.md) - 架构决策记录 ⭐

---

## 💡 快速恢复上下文（AI 专用）

### 标准流程（使用 Slash Commands）

**恢复记忆，快速开始**：
```bash
/start                  # 快速启动
/start --full           # 完整启动（首次使用）
```

**开发过程中**：
```bash
/checkpoint             # 完成一个功能后记录进度
/checkpoint --commit    # 自动创建 commit
```

**每日结束**：
```bash
/end                    # 更新文档 + commit（询问是否 push）
/end --push             # 更新文档 + commit + push
```

---

**维护者**: [姓名]
**文件作用**: AI 上下文快速恢复中枢
**Token 效率**: ~2800 tokens
**更新频率**: 每周更新一次（周日），重大变更时立即更新
**最后更新**: YYYY-MM-DD HH:MM
```

### 6.2 核心文件：CURRENT.md

**作用**：滚动开发日志，记录本周/本月进度

**模板**：

```markdown
# 当前开发进度（滚动日志）

> 本周/本月开发进度记录 - AI 了解最近完成了什么

**本周时间**: YYYY-MM-DD - YYYY-MM-DD（第 XX 周）
**最后更新**: YYYY-MM-DD HH:MM
**当前阶段**: Phase X.Y

---

## 📅 本周概览

**Week X（第 XX 周）**: YYYY-MM-DD - YYYY-MM-DD

**本周目标**：
- [目标 1]
- [目标 2]

**本周完成**：
- ✅ [完成项 1]
- ✅ [完成项 2]

**工作时长**: Xh
**Commits**: X 次
**核心成果**: [1-2 句话总结]

---

## 📝 Day-by-Day 开发日志

### Day 1 - YYYY-MM-DD（周一）⭐ [标题]

**工作时长**: Xh
**核心任务**: [任务描述]

**完成工作**：
- ✅ [工作内容 1]
- ✅ [工作内容 2]

**技术亮点**：
- [亮点 1]
- [亮点 2]

**遇到的问题与解决方案**：
- **问题**: [问题描述]
- **解决方案**: [解决方案]

**涉及文件**（X 个文件，~X 行修改）：
- `path/to/file1.js` - [修改内容]
- `path/to/file2.js` - [修改内容]

---

### Day 2 - YYYY-MM-DD（周二）⭐ [标题]

[同上格式]

---

## ✅ 本周任务

### P0（Critical - 必须完成）
- [ ] [任务 1]
- [ ] [任务 2]

### P1（High - 应该完成）
- [ ] [任务 1]
- [ ] [任务 2]

### P2（Medium - 可以完成）
- [ ] [任务 1]
- [ ] [任务 2]

---

## 💡 技术亮点

1. **[亮点标题 1]**
   - [详细描述]
   - 技术：[技术栈]

2. **[亮点标题 2]**
   - [详细描述]
   - 技术：[技术栈]

---

## 🐛 遇到的问题与解决方案

### 问题 1: [问题标题]

- **现象**: [问题现象]
- **原因**: [根本原因]
- **解决方案**: [解决方案]
- **参考文档**: [链接]（如果创建了 troubleshooting 文档）

---

## 📊 本周统计

- **工作时长**: Xh
- **Commits**: X 次
- **新增功能**: X 个
- **Bug 修复**: X 个
- **文档更新**: X 个
- **代码行数**: ~X 行（新增 X，删除 X）

---

## 🎯 下周计划

### 优先级 1
1. [任务 1]
2. [任务 2]

### 优先级 2
1. [任务 1]
2. [任务 2]

---

**维护者**: [姓名]
**更新频率**: 每次 `/checkpoint` 或 `/end` 自动更新
**归档机制**: 每月归档到 `archive/YYYY-MM.md`
**最后更新**: YYYY-MM-DD HH:MM
```

### 6.3 归档机制

**目的**：保持 CURRENT.md 轻量，避免 Token 膨胀

**触发时机**：
- 每月最后一天执行 `/end`
- 每月第一天执行 `/monthly`
- 手动执行 `/end --archive`

**归档流程**：
1. 复制 `CURRENT.md` 到 `archive/YYYY-MM.md`
2. 创建新月份 `CURRENT.md` 模板（使用时间变量自动填充）
3. 检查超过 6 个月的归档，建议压缩或删除

**归档文件命名**：
- `archive/2025-11.md` - 2025 年 11 月归档
- `archive/2025-12.md` - 2025 年 12 月归档

---

## 7. Git 工作流配置

### 7.1 Commit Message 规范

**格式**（Conventional Commits）：

```
<type>(<scope>): <subject>

<body>

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

**Type 类型**：
- `feat`: 新功能
- `fix`: Bug 修复
- `docs`: 文档更新
- `refactor`: 重构
- `perf`: 性能优化
- `style`: 代码格式
- `test`: 测试
- `chore`: 构建/工具

**示例**：

```bash
git commit -m "$(cat <<'EOF'
feat(blog): 添加移动端优化

- 优化博客列表移动端布局
- 修复代码块横向滚动
- 提升字体大小至 14px 最小值

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
EOF
)"
```

### 7.2 智能 Commit 策略

**问题**：`/checkpoint` 和 `/end` 在同一天执行，导致重复 commit

**解决方案**：

```bash
# 检查今天是否已有 checkpoint commit
LAST_COMMIT_DATE=$(git log -1 --format=%cd --date=short)
LAST_COMMIT_MSG=$(git log -1 --format=%s)

if [ "$LAST_COMMIT_DATE" == "$CURRENT_DATE" ] && [[ "$LAST_COMMIT_MSG" == *"checkpoint"* ]]; then
    # 使用 git commit --amend 追加到 checkpoint commit
    git commit --amend -m "新的 commit message"
else
    # 创建新的 commit
    git commit -m "新的 commit message"
fi
```

### 7.3 分支策略（可选）

**简单项目**（个人项目）：
- 只使用 `main` 分支
- 每个功能完成后直接 commit 到 main

**复杂项目**（团队项目）：
- `main` - 生产分支（稳定）
- `develop` - 开发分支
- `feature/xxx` - 功能分支
- `hotfix/xxx` - 紧急修复分支

---

## 8. 详细实施步骤（从零到一）

### 8.1 前置准备

**环境要求**：
- ✅ Git 已安装并配置
- ✅ Claude Code CLI 已安装
- ✅ 项目已初始化（`git init`）

### 8.2 Step 1: 创建文档目录结构

```bash
# 创建文档目录
mkdir -p docs/ai-context/archive
mkdir -p docs/development/frontend
mkdir -p docs/development/backend
mkdir -p docs/architecture/adr
mkdir -p docs/project
mkdir -p docs/guides
mkdir -p docs/reports

# 创建 Slash Commands 目录
mkdir -p .claude/commands
```

**验证**：

```bash
tree docs/ .claude/
```

应输出：

```
docs/
├── ai-context/
│   └── archive/
├── development/
│   ├── frontend/
│   └── backend/
├── architecture/
│   └── adr/
├── project/
├── guides/
└── reports/

.claude/
└── commands/
```

### 8.3 Step 2: 创建核心 AI 文档

#### 2.1 创建 CONTEXT.md

```bash
# 复制本指南第 6.1 节的模板
# 替换 [占位符] 为实际内容
```

**关键字段**：
- `**最后更新**`: 使用 `date +"%Y-%m-%d %H:%M"` 获取
- `**项目阶段**`: 如 "Phase 1.0（MVP 开发）"
- `**当前状态**`: 如 "准备前端开发"

#### 2.2 创建 CURRENT.md

```bash
# 复制本指南第 6.2 节的模板
# 使用时间变量自动填充
```

**自动填充时间**：

```bash
CURRENT_DATE=$(date +%Y-%m-%d)
WEEK_START=$(date -d "last monday" +%Y-%m-%d)
WEEK_END=$(date -d "next sunday" +%Y-%m-%d)
WEEK_NUM=$(date +%V)
```

### 8.4 Step 3: 创建开发文档

#### 3.1 创建 DEVELOPMENT.md

```markdown
# 开发规范

## 代码规范

### 文件命名
- 组件文件：PascalCase.jsx + PascalCase.css
- 工具文件：camelCase.js
- CSS 类名：kebab-case

### 目录结构
```
src/
├── features/          # 功能模块（Feature-based）
│   ├── home/
│   ├── blog/
│   └── about/
├── components/        # 共享组件
├── utils/             # 工具函数
└── styles/            # 全局样式
```

## Git 规范

[复制第 7.1 节的内容]

## 最佳实践

- ✅ 每次只做一件事
- ✅ 保持 commit 小而频繁
- ✅ 文档与代码同步更新
```

#### 3.2 创建 components.md

```markdown
# 组件快速参考

## UI 组件

### AppleButton

**用途**：Apple 风格按钮组件

**Props**：
- `children` - 按钮文本
- `onClick` - 点击事件
- `variant` - 样式变体（primary, secondary）

**示例**：
```jsx
<AppleButton onClick={handleClick} variant="primary">
  点击我
</AppleButton>
```

**文件位置**：`src/components/AppleButton.jsx`
```

### 8.5 Step 4: 创建架构文档

#### 4.1 创建 OVERVIEW.md

```markdown
# 架构总览

## 系统架构

[项目架构图]

## 技术选型

### 前端
- **React** - UI 框架
- **Vite** - 构建工具
- **Tailwind CSS** - 样式方案

### 选型理由
- React：成熟生态，易于维护
- Vite：快速构建，HMR 体验好
- Tailwind CSS：快速开发，易于定制

## 设计模式

- Feature-based 架构
- Component-driven 开发
```

#### 4.2 创建 tech-stack.md

```markdown
# 技术栈详细说明

## 前端技术栈

### 核心框架

| 技术 | 版本 | 用途 | 选型理由 |
|------|------|------|---------|
| React | 19.2.0 | UI 框架 | 成熟生态，易于维护 |
| Vite | 7.2.0 | 构建工具 | 快速构建，HMR 好 |
| Tailwind CSS | 3.4.18 | 样式方案 | 快速开发，易定制 |

## 版本管理策略

- **Major 版本更新**：谨慎评估，需要测试
- **Minor 版本更新**：推荐更新，通常向后兼容
- **Patch 版本更新**：安全更新，建议立即更新

## 月度审查

每月执行 `/monthly` 时，对比 tech-stack.md 与 package.json 版本一致性。
```

#### 4.3 创建 ADR 模板

**文件**：`docs/architecture/adr/template.md`

```markdown
# ADR-XXX: [标题]

**日期**: YYYY-MM-DD
**状态**: 已接受 / 已拒绝 / 已废弃
**作者**: [姓名]

## 背景

[描述问题和上下文]

## 决策

[描述做出的决策]

## 理由

[解释为什么这样决策]

## 后果

**正面后果**：
- [后果 1]
- [后果 2]

**负面后果**：
- [后果 1]
- [后果 2]

## 替代方案

### 方案 1: [方案名称]
- **优点**: [优点]
- **缺点**: [缺点]
- **未采用原因**: [原因]

### 方案 2: [方案名称]
- **优点**: [优点]
- **缺点**: [缺点]
- **未采用原因**: [原因]

## 参考资料

- [链接 1]
- [链接 2]
```

**创建第一个 ADR**：

```markdown
# ADR-001: 选择 JavaScript 而非 TypeScript

**日期**: 2025-11-20
**状态**: 已接受
**作者**: Stephen Kaylon Chan

## 背景

项目初期需要选择开发语言：JavaScript 或 TypeScript。

## 决策

选择 JavaScript（非 TypeScript）作为项目开发语言。

## 理由

1. **学习重心**：专注于 Spring Boot 后端学习，前端保持简洁
2. **开发速度**：无需配置 TypeScript，快速启动
3. **灵活性**：JavaScript 更灵活，适合快速迭代

## 后果

**正面后果**：
- 前端开发速度快
- 配置简单，易于维护

**负面后果**：
- 缺少类型检查，可能有运行时错误
- IDE 智能提示较弱

## 替代方案

### TypeScript
- **优点**: 类型安全，IDE 智能提示好
- **缺点**: 配置复杂，学习成本高
- **未采用原因**: 不符合当前学习重心

## 参考资料

- [TypeScript 官方文档](https://www.typescriptlang.org/)
```

### 8.6 Step 5: 创建项目文档

#### 5.1 创建 vision.md

```markdown
# 个人愿景与项目背景

## 关于我

[自我介绍：教育背景、工作经历、技能]

## 为什么做这个项目

[项目动机、目标、预期收益]

## 设计风格偏好

- ✅ [偏好 1]
- ✅ [偏好 2]
- ❌ [禁止事项]

## 学习目标

1. [目标 1]
2. [目标 2]
```

#### 5.2 创建 design.md

```markdown
# 功能设计

## 网站结构

- 首页
- 博客
- 关于
- 联系

## 页面详细设计

### 首页

**功能**：[功能描述]

**设计要点**：
- [要点 1]
- [要点 2]
```

#### 5.3 创建 ROADMAP.md

```markdown
# 开发路线图

## Phase 1: MVP（YYYY-MM-DD - YYYY-MM-DD）

**目标**：完成核心功能

**任务**：
- [ ] 任务 1
- [ ] 任务 2

## Phase 2: 优化（YYYY-MM-DD - YYYY-MM-DD）

**目标**：性能优化

**任务**：
- [ ] 任务 1
- [ ] 任务 2
```

### 8.7 Step 6: 配置 Slash Commands

#### 6.1 创建 /start 命令

**文件**：`.claude/commands/start.md`

复制本指南第 5.4.1 节的完整内容。

#### 6.2 创建 /checkpoint 命令

**文件**：`.claude/commands/checkpoint.md`

复制本指南第 5.4.2 节的完整内容。

#### 6.3 创建 /end 命令

**文件**：`.claude/commands/end.md`

复制本指南第 5.4.3 节的完整内容。

#### 6.4 创建 /weekly 命令

**文件**：`.claude/commands/weekly.md`

复制本指南第 5.4.4 节的完整内容。

#### 6.5 创建 /monthly 命令

**文件**：`.claude/commands/monthly.md`

复制本指南第 5.4.5 节的完整内容。

#### 6.6 创建 /audit 命令

**文件**：`.claude/commands/audit.md`

复制本指南第 5.4.6 节的完整内容。

### 8.8 Step 7: 验证配置

#### 7.1 验证文档结构

```bash
tree docs/ .claude/
```

应输出完整的目录结构。

#### 7.2 验证 Slash Commands

启动 Claude Code CLI，测试命令：

```bash
/start --full
```

应输出：

```
✅ 已恢复上下文

## 验证理解

1. ✅ **项目类型**：[从 CONTEXT.md 获取]
2. ✅ **当前阶段**：[从 CONTEXT.md 获取]
...
```

#### 7.3 验证工作流

测试完整工作流：

```bash
# 1. 启动会话
/start

# 2. 开发功能...

# 3. 阶段性更新
/checkpoint --commit

# 4. 每日结束
/end --push
```

### 8.9 Step 8: 首次 Git Commit

```bash
# 添加所有文件
git add .

# 创建首次 commit
git commit -m "$(cat <<'EOF'
docs: 初始化 AI 协作系统

- 创建 4 层文档架构（ai-context, development, architecture, project）
- 配置 6 个 Slash Commands（start, checkpoint, end, weekly, monthly, audit）
- 建立 AI 记忆恢复机制（CONTEXT.md + CURRENT.md）
- 配置 Git 工作流（Conventional Commits）

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
EOF
)"

# 推送到远程（如果有）
git push origin main
```

---

## 9. 最佳实践与避坑指南

### 9.1 最佳实践

#### 9.1.1 文档维护

✅ **DO**：
- 每次开发结束必须执行 `/end`
- 每周日执行 `/weekly` 优化文档
- 每月初执行 `/monthly` 归档
- 重大决策必须创建 ADR
- Bug 修复必须创建 troubleshooting 文档

❌ **DON'T**：
- 不要手动更新 CURRENT.md（使用 Slash Commands）
- 不要让 CURRENT.md 超过 1 个月不归档
- 不要在 CONTEXT.md 中写详细日志（应该简洁）

#### 9.1.2 AI 协作

✅ **DO**：
- 每次新会话必须执行 `/start`
- 首次使用执行 `/start --full`
- 根据任务类型选择场景参数（`--bug`, `--component` 等）
- 完成阶段性工作执行 `/checkpoint`

❌ **DON'T**：
- 不要跳过 `/start`，直接开始开发
- 不要在一次会话中完成太多工作（建议 2-3 小时一个 checkpoint）

#### 9.1.3 Git 工作流

✅ **DO**：
- 使用 Conventional Commits 格式
- 每个功能完成后立即 commit
- 使用 `/checkpoint --commit` 自动创建 commit
- 每日结束执行 `/end --push` 推送代码

❌ **DON'T**：
- 不要手动写 commit message（让 AI 生成）
- 不要积累太多未提交的文件
- 不要在 commit message 中写流水账

### 9.2 常见陷阱与避坑

#### 陷阱 1: 文档膨胀

**问题**：CURRENT.md 越来越大，Token 消耗增加

**解决方案**：
- 每周执行 `/weekly` 删除冗余内容
- 每月执行 `/monthly` 归档历史内容
- 控制 CURRENT.md 在 ~2000 tokens 以内

#### 陷阱 2: 时间计算错误

**问题**：手动写时间容易出错（周末、月末计算错误）

**解决方案**：
- 所有 Slash Commands 必须在 Step 0 调用时间工具
- 使用 `date` 命令自动获取准确时间

**示例**：

```bash
# ❌ 错误：手动写时间
CURRENT_DATE="2025-11-23"  # 可能写错

# ✅ 正确：自动获取
CURRENT_DATE=$(date +%Y-%m-%d)
```

#### 陷阱 3: 重复 commit

**问题**：`/checkpoint` 和 `/end` 在同一天执行，导致重复 commit

**解决方案**：
- `/end` 检测今天是否已有 checkpoint commit
- 如果有，使用 `git commit --amend` 追加

#### 陷阱 4: 文档不同步

**问题**：代码更新了，但文档没更新（如 components.md）

**解决方案**：
- 每周执行 `/audit` 检查文档同步
- 新增组件时，立即更新 components.md
- 使用 `/checkpoint` 自动提醒更新文档

#### 陷阱 5: ADR 缺失

**问题**：重大决策没有 ADR 记录，后期难以追溯

**解决方案**：
- 重大技术选型必须创建 ADR
- ADR 模板标准化（使用 template.md）
- 定期审查 ADR（每月执行 `/monthly`）

---

## 10. 常见问题 FAQ

### Q1: 为什么要分离 AI 文档和开发者文档？

**A**: 关注点分离（Separation of Concerns）

- **AI 文档**（`ai-context/`）：追求简洁高效，快速恢复上下文（~3000 tokens）
- **开发者文档**（`development/`, `architecture/`, `project/`）：追求详细完整，人类深度阅读

如果混在一起：
- AI 每次恢复上下文需要读取大量无关内容，Token 浪费
- 开发者查找文档困难，信息检索效率低

### Q2: 为什么要用 Slash Commands 而不是手动更新？

**A**: 自动化优先（Automation First）

**时间节省**：
- 手动更新：~10 分钟/次
- Slash Commands：~2 分钟/次
- 月度总节省：~5.5 小时 → ~1.5 小时（73%）

**质量提升**：
- 手动更新容易遗漏（忘记更新某个文档）
- Slash Commands 标准化流程，不会遗漏

### Q3: 为什么要每月归档 CURRENT.md？

**A**: 保持文档轻量（Lightweight）

**问题**：
- CURRENT.md 不归档，会越来越大（超过 10000 tokens）
- AI 每次恢复上下文需要读取大量历史内容，效率低

**解决方案**：
- 每月归档到 `archive/YYYY-MM.md`
- 保持 CURRENT.md 在 ~2000 tokens 以内

### Q4: 为什么要用 ADR 记录决策？

**A**: 决策可追溯（Traceability）

**问题**：
- 3 个月后忘记为什么选择 JavaScript 而非 TypeScript
- 新团队成员不理解技术选型

**解决方案**：
- ADR 记录决策背景、理由、后果、替代方案
- 后期可追溯，团队共识

### Q5: 为什么要定期执行 `/audit`？

**A**: 预防系统混乱（Prevention）

**问题**：
- 代码质量下降（ESLint errors 增加）
- 依赖过时（安全漏洞）
- 文档不同步（代码更新，文档未更新）

**解决方案**：
- 每周执行 `/audit --quick` 快速检查
- 每月执行 `/audit --full` 完整检查
- 提前发现问题，避免积累

### Q6: 如何在团队中使用这个系统？

**A**: 团队协作配置

**步骤**：
1. 团队 leader 先配置好系统（按本指南）
2. 创建团队 onboarding 文档（简化版 vision.md）
3. 每个成员执行 `/start --full` 恢复上下文
4. 团队共享 ADR，重大决策需要评审

**注意**：
- CONTEXT.md 和 CURRENT.md 由团队 leader 维护
- 每个成员可以有自己的 `/checkpoint`
- 统一使用 Conventional Commits 规范

### Q7: 如果 AI 没有正确理解项目怎么办？

**A**: 检查 CONTEXT.md 和 vision.md

**可能原因**：
1. CONTEXT.md 信息不完整（缺少 TL;DR、协作偏好等）
2. vision.md 未详细描述设计风格偏好
3. AI 未执行 `/start --full`（首次使用必须 `--full`）

**解决方案**：
1. 完善 CONTEXT.md（参考本指南第 6.1 节模板）
2. 完善 vision.md（详细描述设计风格、禁止事项）
3. 重新执行 `/start --full`

### Q8: 如何优化 Token 消耗？

**A**: 定期优化文档

**优化策略**：
1. **每周**执行 `/weekly`：删除 CURRENT.md 冗余内容
2. **每月**执行 `/monthly`：归档历史内容
3. **使用场景参数**：`/start --bug`（只读取相关文档）
4. **CONTEXT.md 控制在 ~2800 tokens**
5. **CURRENT.md 控制在 ~2000 tokens**

**优化效果**：
- 优化前：~5000 tokens/会话
- 优化后：~3000 tokens/会话（减少 40%）

### Q9: 如果误操作导致文档混乱怎么办？

**A**: 使用系统排查指南

参考本目录下的 `系统健康排查与优化指南.md`（第二个文档）。

**快速恢复步骤**：
1. 执行 `/audit --full` 全面检查
2. 对比 Git 历史（`git log --oneline`）
3. 必要时回滚到上一个稳定版本（`git reset --hard <commit>`）
4. 重新执行 `/weekly` 或 `/monthly` 优化

### Q10: 这个系统适合什么类型的项目？

**A**: 适合需要长期 AI 协作的项目

**适用场景**：
✅ 个人项目（6 个月以上）
✅ 小团队项目（2-5 人）
✅ 学习项目（需要记录学习历程）
✅ 长期维护的项目

**不适用场景**：
❌ 一次性脚本（1-2 天完成）
❌ 纯实验性项目（随时废弃）
❌ 大团队项目（10+ 人，需要更复杂的协作工具）

---

## 📚 附录

### 附录 A: 完整目录结构示例

```
your-project/
├── .claude/
│   └── commands/
│       ├── start.md
│       ├── checkpoint.md
│       ├── end.md
│       ├── weekly.md
│       ├── monthly.md
│       └── audit.md
│
├── docs/
│   ├── ai-context/
│   │   ├── CONTEXT.md
│   │   ├── CURRENT.md
│   │   └── archive/
│   │       ├── 2025-11.md
│   │       └── 2025-12.md
│   │
│   ├── development/
│   │   ├── frontend/
│   │   │   ├── components.md
│   │   │   ├── pages.md
│   │   │   └── troubleshooting.md
│   │   ├── backend/
│   │   │   └── api.md
│   │   ├── DEVELOPMENT.md
│   │   └── SLASH_COMMANDS.md
│   │
│   ├── architecture/
│   │   ├── OVERVIEW.md
│   │   ├── tech-stack.md
│   │   └── adr/
│   │       ├── README.md
│   │       ├── template.md
│   │       ├── 001-choose-javascript.md
│   │       └── 002-feature-based-architecture.md
│   │
│   ├── project/
│   │   ├── vision.md
│   │   ├── design.md
│   │   ├── ROADMAP.md
│   │   └── DEPLOYMENT.md
│   │
│   ├── guides/
│   │   ├── 如何为新项目配置 AI 协作系统.md
│   │   └── 系统健康排查与优化指南.md
│   │
│   └── reports/
│       └── audit-2025-11-23.md
│
├── src/
│   └── [项目代码]
│
├── README.md
├── package.json
└── .gitignore
```

### 附录 B: 时间工具命令参考

```bash
# 基础时间
CURRENT_DATE=$(date +%Y-%m-%d)          # 2025-11-23
CURRENT_TIME=$(date +%H:%M)             # 14:30
CURRENT_DATETIME="$CURRENT_DATE $CURRENT_TIME"  # 2025-11-23 14:30

# 星期相关
CURRENT_DAY_OF_WEEK=$(date +%u)         # 1-7 (周一到周日)
CURRENT_WEEK_NUM=$(date +%V)            # 47（第几周）

# 月份相关
CURRENT_MONTH=$(date +%Y-%m)            # 2025-11
CURRENT_DAY=$(date +%d)                 # 23

# 计算相关
NEXT_DAY=$(date -d tomorrow +%d)        # 24
WEEK_START=$(date -d "last monday" +%Y-%m-%d)   # 2025-11-17
WEEK_END=$(date -d "next sunday" +%Y-%m-%d)     # 2025-11-23
NEXT_MONTH=$(date -d "+1 month" +%Y-%m) # 2025-12

# 星期中文转换
case $CURRENT_DAY_OF_WEEK in
    1) DAY_NAME="周一" ;;
    2) DAY_NAME="周二" ;;
    3) DAY_NAME="周三" ;;
    4) DAY_NAME="周四" ;;
    5) DAY_NAME="周五" ;;
    6) DAY_NAME="周六" ;;
    7) DAY_NAME="周日" ;;
esac
```

### 附录 C: Git 命令参考

```bash
# 检查状态
git status --short

# 检查最新 commit
git log -1 --format=%cd --date=short    # 最新 commit 日期
git log -1 --format=%s                  # 最新 commit message

# 统计 commits
git log --since="2025-11-17" --until="2025-11-23 23:59:59" --oneline | wc -l

# 智能 commit
LAST_COMMIT_DATE=$(git log -1 --format=%cd --date=short)
LAST_COMMIT_MSG=$(git log -1 --format=%s)
if [ "$LAST_COMMIT_DATE" == "$CURRENT_DATE" ] && [[ "$LAST_COMMIT_MSG" == *"checkpoint"* ]]; then
    git commit --amend -m "新的 commit message"
else
    git commit -m "新的 commit message"
fi

# 使用 HEREDOC 创建 commit
git commit -m "$(cat <<'EOF'
feat(blog): 添加移动端优化

- 优化博客列表移动端布局
- 修复代码块横向滚动

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
EOF
)"
```

---

## 🎯 总结

本指南提供了完整的 AI 协作系统配置方案，包括：

✅ **4 层文档架构** - 分离关注点，提高检索效率
✅ **6 个 Slash Commands** - 自动化日常操作，节省 73% 时间
✅ **AI 记忆恢复机制** - 30 秒快速恢复项目上下文
✅ **Git 工作流集成** - 版本控制 + 文档更新一体化
✅ **归档机制** - 长期项目也能保持文档轻量

**关键成功要素**：
1. **分离关注点**：AI 文档 vs 开发者文档
2. **自动化优先**：使用 Slash Commands 替代手动操作
3. **渐进式信息披露**：快速启动 → 按需深入
4. **轻量化设计**：定期优化，保持文档精简

**预期收益**：
- 时间节省：73%（每月 ~5.5h → ~1.5h）
- Token 优化：40%（~5000 → ~3000 tokens）
- 协作质量提升：AI 更准确理解项目状态

---

**下一步**：
1. 按照第 8 节详细实施步骤配置系统
2. 执行 `/start --full` 验证配置
3. 开始第一个功能开发
4. 执行 `/checkpoint` 记录进度
5. 执行 `/end --push` 结束会话

**需要帮助**？
- 参考本目录下的 `系统健康排查与优化指南.md`
- 检查常见问题 FAQ（第 10 节）
- 查看附录 A-C 的参考资料

---

**维护者**: Stephen Kaylon Chan
**创建日期**: 2025-11-23
**版本**: v1.0
**最后更新**: 2025-11-23
