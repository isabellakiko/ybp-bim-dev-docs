---
description: 代码重构辅助，安全地进行代码结构调整
argument-hint: [--scope <file|component|page>] [--dry-run]
allowed-tools: Read, Grep, Glob, Bash(git)
---

<task>
辅助进行代码重构，确保重构安全性和可追溯性。

**适用场景**：
- 组件 API 改动
- 样式系统升级
- 工具函数重命名
- 页面结构重组

**参数说明**：
- `--scope <范围>`: 指定重构范围（file/component/page）
- `--dry-run`: 只分析不执行，输出影响报告
</task>

<workflow>

## Step 1: 理解重构范围

**使用 Explore 模式**：建议进入 Explore 模式，深入理解待重构代码的依赖关系。

**分析要点**：
- 哪些文件会受影响
- 哪些组件依赖此代码
- 是否有测试覆盖

```bash
# 查找引用（示例）
grep -r "functionName" apps/frontend/src/ --include="*.jsx"
```

---

## Step 2: 制定重构计划

**使用 think 关键词**：请 Claude 使用 think 模式深度分析重构方案。

**计划内容**：
1. 具体的重构步骤
2. 每步的风险点
3. 回滚方案

---

## Step 3: 执行重构

**注意事项**：
- 每次只改一个文件
- 改完立即验证
- 保持 Git 历史清晰

---

## Step 4: 验证重构

```bash
# 运行 lint 检查
cd apps/frontend && pnpm lint

# 运行构建检查
cd apps/frontend && pnpm build
```

**检查清单**：
- [ ] lint 无错误
- [ ] build 成功
- [ ] 功能正常

</workflow>

<tips>

## 与其他命令的关系

| 命令 | 用途 | 重构后使用 |
|------|------|-----------|
| `/fix` | 修复 lint 问题 | 重构后运行 |
| `/checkpoint` | 保存进度 | 重构完成后 |
| `/audit` | 检查质量 | 大重构后 |

## 安全原则

1. **小步快跑**：每次只改一个点
2. **及时验证**：改完立即检查
3. **可回滚**：保持清晰的 Git 历史
4. **文档同步**：重构后更新相关文档

</tips>
