---
description: 结束本次会话，完整更新文档并提交
allowed-tools: Read, Write, Edit, Bash
---

<task>
结束本次开发会话，完整更新所有文档，创建 Git commit 并可选 push。
</task>

<workflow>

## Step 0: 获取当前时间

```bash
CURRENT_DATE=$(date +%Y-%m-%d)
CURRENT_TIME=$(date +%H:%M)
CURRENT_DATETIME="$CURRENT_DATE $CURRENT_TIME"
echo "会话结束时间: $CURRENT_DATETIME"
```

## Step 1: 总结本次会话

分析整个会话完成的所有工作：

1. **所有完成的工作**（按类别分组）
2. **修改的文件清单**
3. **遇到的问题和解决方案**
4. **未完成的工作**
5. **下次会话建议**

## Step 2: 更新文档

### 2.1 更新 CURRENT.md

读取并更新 `docs/ai-context/CURRENT.md`：
- 如果已有今天的条目，补充完善
- 如果没有，创建完整的 Day 条目
- 确保记录完整的工作内容

### 2.2 检查是否需要更新 CONTEXT.md

如果有以下变化，更新 `docs/ai-context/CONTEXT.md`：
- 新增/删除页面或组件
- 技术栈变更
- 项目阶段完成
- 重要设计决策

更新内容：
- 「当前状态」
- 「开发状态」
- 「最后更新」时间

## Step 3: Git 操作

**检查 Git 状态**：

```bash
git status --short
git log -1 --format="%h %s" 2>/dev/null || echo "无 Git 历史"
```

**根据参数操作**：
- 如果包含 `--push`：自动 commit + push
- 如果包含 `--no-push`：只 commit 不 push
- 如果无参数：commit 后询问是否 push

**Commit 格式**：
```
docs: 更新开发进度 [YYYY-MM-DD]

本次会话完成：
- [工作 1]
- [工作 2]

下一步计划：
- [计划 1]

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

## Step 4: 输出完成报告

```
✅ 会话结束

## 本次会话总结
**时间**: [结束时间]

## 完成工作
- [工作 1]
- [工作 2]

## 涉及文件
- [文件 1]
- [文件 2]

## 文档更新
- ✅ CURRENT.md
- [✅/⬜] CONTEXT.md

## Git 状态
- Commit: [commit hash 或 "未提交"]
- Push: [是/否/未执行]

## 下次会话建议
- [建议 1]
- [建议 2]

---
下次见！使用 `/start` 恢复上下文。
```

</workflow>

<tips>
## 会话结束检查清单

### 必做
- [ ] CURRENT.md 已更新
- [ ] 记录了完成的工作
- [ ] 记录了未完成的工作

### 建议
- [ ] 如果有重大变化，更新 CONTEXT.md
- [ ] 如果有代码变更，创建 commit
- [ ] 记录下次需要注意的事项
</tips>
