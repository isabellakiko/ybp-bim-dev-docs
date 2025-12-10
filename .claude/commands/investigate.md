---
description: 问题调查与根因分析
argument-hint: <issue-description>
allowed-tools: Read, Grep, Glob, Bash(git log, git diff, git blame)
---

<task>
深入调查问题根因，提供分析报告。

**适用场景**：
- Bug 复现和分析
- 性能问题排查
- 行为异常追踪
- 历史变更追溯

**输出物**：问题诊断报告
</task>

<workflow>

## Step 1: 收集信息

**复现问题**：
- 问题现象是什么？
- 在什么条件下发生？
- 是否可稳定复现？

**收集数据**：
- 错误信息 / 日志
- 相关代码片段
- 浏览器控制台输出

---

## Step 2: 追溯历史

**建议使用 Explore 模式**：让 Claude 自由探索代码历史。

```bash
# 查看最近提交
git log --oneline -20

# 查看文件变更历史
git log --oneline -10 -- <file-path>

# 查看代码归属
git blame <file-path>

# 对比版本差异
git diff <commit1>..<commit2> -- <file-path>
```

---

## Step 3: 根因分析

**使用 think 关键词**：请 Claude 使用 think 模式深度分析问题根因。

**分析维度**：
1. **直接原因**：哪行代码导致了问题？
2. **间接原因**：为什么会写出这样的代码？
3. **系统原因**：是否有结构性问题？

---

## Step 4: 输出诊断报告

**报告格式**：

```markdown
## 问题诊断报告

### 问题现象
[描述问题表现]

### 复现步骤
1. [步骤 1]
2. [步骤 2]
3. [步骤 3]

### 根因分析
[分析问题根本原因]

### 相关代码
- 文件：`<file-path>:<line>`
- 变更：`<commit-hash>`

### 修复建议
[提供修复方案]

### 预防措施
[提供预防措施]
```

</workflow>

<tips>

## 常用 Git 命令

| 命令 | 用途 |
|------|------|
| `git log --oneline -N` | 查看最近 N 次提交 |
| `git blame <file>` | 查看代码行归属 |
| `git diff A..B` | 对比两个版本 |
| `git show <commit>` | 查看提交详情 |
| `git bisect` | 二分查找问题提交 |

## 与其他命令的关系

| 场景 | 命令组合 |
|------|----------|
| 发现问题 | `/investigate` → 诊断 |
| 需要快速修复 | `/investigate` → `/hotfix` |
| 需要改进结构 | `/investigate` → `/refactor` |
| 完成修复 | `/investigate` → `/checkpoint` |

</tips>
