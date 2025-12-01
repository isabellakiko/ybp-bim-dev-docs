---
description: 每周文档优化，清理冗余内容
allowed-tools: Read, Write, Edit, Bash
---

<task>
每周文档优化：清理 CURRENT.md 冗余内容，更新 CONTEXT.md 状态，生成周报。
</task>

<workflow>

## Step 0: 获取当前时间

**运行以下命令获取时间信息**：

```bash
CURRENT_DATE=$(date +%Y-%m-%d)
CURRENT_WEEK_NUM=$(date +%V)
# macOS 兼容的日期计算
WEEK_START=$(date -v-monday +%Y-%m-%d 2>/dev/null || date -d "last monday" +%Y-%m-%d)
WEEK_END=$(date -v+sunday +%Y-%m-%d 2>/dev/null || date -d "next sunday" +%Y-%m-%d)
echo "本周: $WEEK_START - $WEEK_END (第 $CURRENT_WEEK_NUM 周)"
```

## Step 1: 审查 CURRENT.md

读取 `docs/ai-context/CURRENT.md`，执行：

1. **删除冗余内容**：
   - 重复的信息
   - 过度详细的日志（保留关键信息）
   - 已解决且不再相关的问题

2. **合并重复条目**：
   - 同一功能的多次更新合并为一条
   - 相似的问题合并

3. **统计本周工作量**：
   - 完成的任务数
   - 涉及的文件数
   - 工作时长（估算）

## Step 2: 审查其他文档

检查以下文档是否需要更新：

1. **业务文档**（`docs/business/`）：
   - 是否有新的讨论内容需要记录
   - 待讨论问题是否有更新

2. **CONTEXT.md**：
   - 当前状态是否准确
   - 下一步任务是否需要更新

## Step 3: 更新 CONTEXT.md

更新 `docs/ai-context/CONTEXT.md`：
- 更新「当前状态」
- 更新「下一步任务」
- 更新「最后更新」时间

## Step 4: Token 优化报告

估算文档优化效果：
- 优化前 CURRENT.md 行数/字符数
- 优化后 CURRENT.md 行数/字符数
- 节省百分比

## Step 5: Git 操作

```bash
git add docs/
git commit -m "$(cat <<'EOF'
docs: 每周文档优化 (Week XX)

- 清理 CURRENT.md 冗余内容
- 更新 CONTEXT.md 状态
- 本周完成: [X] 项任务

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
EOF
)"
```

**根据参数**：
- `--push`：自动 push
- `--no-push`：不 push
- 无参数：询问

## Step 6: 输出周报

```
✅ 每周优化完成

## 本周概览 (Week XX)
**时间**: YYYY-MM-DD - YYYY-MM-DD

## 本周完成
- [任务 1]
- [任务 2]

## 文档优化
- CURRENT.md: [优化前行数] → [优化后行数] (节省 XX%)
- CONTEXT.md: [已更新/无需更新]

## 下周计划
- [计划 1]
- [计划 2]

---
周报完成。下周继续！
```

</workflow>
