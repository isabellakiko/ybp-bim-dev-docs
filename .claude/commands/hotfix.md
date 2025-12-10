---
description: 紧急修复快速路径，最小化改动范围
argument-hint: <issue-description>
allowed-tools: Read, Edit, Bash(git)
---

<task>
快速定位并修复紧急问题，最小化改动范围。

**适用场景**：
- 生产环境 Bug
- 阻塞性问题
- 需要立即部署的修复

**核心原则**：
- 只修复问题，不做优化
- 最小改动范围
- 快速验证
</task>

<workflow>

## Step 1: 快速定位问题

**根据描述定位**：
```bash
# 搜索相关代码
grep -r "关键词" apps/frontend/src/ --include="*.jsx"
```

**常见问题位置**：
- 组件：`apps/frontend/src/components/`
- 页面：`apps/frontend/src/pages/`
- 样式：`apps/frontend/src/index.css`

---

## Step 2: 最小化修复

**原则**：
- 只改必要的代码
- 不做重构或优化
- 不改无关文件

---

## Step 3: 快速验证

```bash
# 快速检查
cd apps/frontend && pnpm lint
cd apps/frontend && pnpm build
```

---

## Step 4: 记录修复

**更新 troubleshooting.md**：

```markdown
### [问题描述]

**问题**: [简述问题]
**原因**: [根因分析]
**修复**: [修复方法]
**日期**: [YYYY-MM-DD]
```

---

## Step 5: 提交修复

```bash
git add -A
git commit -m "fix: [简述修复内容]"
```

</workflow>

<tips>

## 紧急修复检查清单

- [ ] 问题已复现
- [ ] 修复已验证
- [ ] 改动最小化
- [ ] 已记录到 troubleshooting.md
- [ ] 已提交 Git

## 后续建议

修复完成后，建议：
1. 使用 `/investigate` 深入分析根因
2. 考虑是否需要 `/refactor` 改进代码结构
3. 使用 `/checkpoint` 记录进度

</tips>
