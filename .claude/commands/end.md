---
description: 每日开发结束，完整更新文档并提交
argument-hint: [--push | --no-push]
allowed-tools: Read, Write, Edit, Bash(date, git)
---

<task>
每日开发结束时，完整总结工作，更新文档，创建 commit 并可选推送。

---

**`/checkpoint` vs `/end` 对比**：

| 特性 | `/checkpoint` | `/end` |
|------|---------------|--------|
| 使用时机 | 完成一个功能/阶段 | 结束当天工作 |
| 文档更新 | CURRENT.md（追加） | CURRENT.md + CONTEXT.md |
| Git 操作 | 可选 commit | 必须 commit |
| 推送 | 不推送 | 可选推送 |
| 频率 | 每 1-2 小时 | 每天一次 |
</task>

<workflow>

## Step 0: 获取当前时间

```bash
CURRENT_DATE=$(date +%Y-%m-%d)
CURRENT_TIME=$(date +%H:%M)
echo "会话结束时间: $CURRENT_DATE $CURRENT_TIME"
```

## Step 1: 总结本次会话

完整总结今天的工作：

1. **所有完成的工作**：列出今天完成的所有功能/任务
2. **遇到的问题和解决方案**：记录所有问题
3. **未完成的工作**：记录未完成的内容
4. **下次会话建议**：建议下次从哪里开始

## Step 2: 更新文档

### 2.1 更新 CURRENT.md

- 如果今天已执行过 `/checkpoint`，补充完善内容
- 如果没有执行过，创建完整的 Day 条目
- 更新任务列表状态

### 2.2 检查是否需要更新 CONTEXT.md

如果今天有重大变化：
- 完成了一个重要功能
- 技术栈变更
- 项目阶段变化

则更新：
- 当前开发状态
- 下一步任务
- 最后更新时间

### 2.3 场景性更新

根据今天的工作内容更新相关文档：
- Bug 修复 → troubleshooting.md
- 新组件 → components.md
- 新页面 → pages.md

## Step 3: Git 操作

```bash
# 检查变更
git status --short

# 添加所有变更
git add .

# 创建 commit
git commit -m "$(cat <<'EOF'
docs: 每日总结 ${CURRENT_DATE}

## 今日完成
- [工作内容 1]
- [工作内容 2]

## 下次继续
- [待续任务]

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
EOF
)"
```

根据参数：
- `--push`：自动推送 `git push`
- `--no-push`：不推送
- 无参数：询问用户是否需要推送

## Step 4: 输出完成报告

```
✅ 每日总结完成

**日期**: ${CURRENT_DATE} ${CURRENT_TIME}

## 今日完成
- [工作内容 1]
- [工作内容 2]
- [工作内容 3]

## 遇到的问题
- [问题 1]: [解决方案]

## 更新的文档
- [x] CURRENT.md
- [其他更新的文档]

## Git 状态
- [x] Commit 已创建
- [ ] 已推送 / 未推送

## 下次会话建议
1. 执行 `/start` 恢复上下文
2. 继续 [任务名称]

---
辛苦了！下次见 👋
```

</workflow>

<tips>
## 会话结束检查清单

### 必做
- [ ] CURRENT.md 已更新
- [ ] 记录了完成的工作
- [ ] 记录了未完成的工作

### 建议
- [ ] 如有重大变化，更新 CONTEXT.md
- [ ] 创建 Git commit
- [ ] 记录下次需要注意的事项
</tips>
