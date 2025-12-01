---
description: 阶段性更新进度，记录当前工作
allowed-tools: Read, Write, Edit, Bash
---

<task>
记录阶段性工作进度，更新 CURRENT.md，可选创建 Git commit。
</task>

<workflow>

## Step 0: 获取当前时间

```bash
CURRENT_DATE=$(date +%Y-%m-%d)
CURRENT_TIME=$(date +%H:%M)
CURRENT_DATETIME="$CURRENT_DATE $CURRENT_TIME"
CURRENT_DAY_OF_WEEK=$(date +%u)
case $CURRENT_DAY_OF_WEEK in
    1) DAY_NAME="周一" ;;
    2) DAY_NAME="周二" ;;
    3) DAY_NAME="周三" ;;
    4) DAY_NAME="周四" ;;
    5) DAY_NAME="周五" ;;
    6) DAY_NAME="周六" ;;
    7) DAY_NAME="周日" ;;
esac
echo "当前时间: $CURRENT_DATETIME ($DAY_NAME)"
```

## Step 1: 回顾本阶段工作

分析本阶段完成的工作：

1. **完成的工作**：列出已完成的任务
2. **修改的文件**：列出涉及的文件和改动
3. **遇到的问题**：记录问题和解决方案（如有）
4. **剩余工作**：列出未完成的任务

## Step 2: 更新 CURRENT.md

1. **读取** `docs/ai-context/CURRENT.md`
2. **判断**：今天（$CURRENT_DATE）是否已有条目
   - 如果没有：添加新的 Day 条目
   - 如果已有：在该条目中追加本阶段工作
3. **写入**更新后的内容

**Day 条目格式**：
```markdown
### Day X - YYYY-MM-DD（周X）- [工作标题]

**工作时长**: Xh
**核心任务**: [任务描述]

#### 1. [工作类别] ✅
- [具体工作内容]
- [具体工作内容]

**涉及文件**：
- `path/to/file` - [修改内容]
```

## Step 3: 检查是否需要更新 CONTEXT.md

如果有以下情况，更新 `docs/ai-context/CONTEXT.md`：
- 技术栈变更
- 新增/删除页面或组件
- 项目阶段变化
- 重要决策

## Step 4: Git 操作（根据参数）

- 如果包含 `--commit`：自动创建 commit（不 push）
- 如果包含 `--skip-git`：跳过 Git 操作
- 如果无参数：询问用户是否需要 commit

**Commit 格式**：
```
docs: checkpoint - [简短描述]

- [变更 1]
- [变更 2]

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

## Step 5: 输出检查点报告

```
✅ Checkpoint 完成

## 本阶段工作
- [工作 1]
- [工作 2]

## 涉及文件
- [文件 1]
- [文件 2]

## 文档更新
- ✅ CURRENT.md 已更新
- [✅/⬜] CONTEXT.md [已更新/无需更新]

## Git 状态
- [commit 状态]

---
继续工作还是结束本次会话？（结束请用 `/end`）
```

</workflow>

<tips>
## 检查点最佳实践

### 何时使用
- 完成一个功能模块
- 解决了一个问题
- 准备切换到其他任务
- 工作了 1-2 小时

### 记录要点
- 具体做了什么（不要太抽象）
- 修改了哪些文件
- 遇到什么问题，如何解决
- 下一步计划
</tips>
