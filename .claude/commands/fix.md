---
description: ESLint 自动修复，一键修复可自动修复的代码问题
argument-hint: [--check | --staged]
allowed-tools: Bash(cd apps/frontend && pnpm lint:*), Bash(pnpm lint:*)
---

<task>
执行 ESLint 自动修复，修复所有可自动修复的代码问题。
</task>

<workflow>

## Step 1: 解析参数

**参数说明**：
- 无参数：修复全部文件
- `--check`：仅检查，不修复
- `--staged`：仅修复已 staged 的文件

---

## Step 2: 执行修复/检查

### 默认模式（无参数）

```bash
cd apps/frontend && pnpm lint --fix
```

### 检查模式（--check）

```bash
cd apps/frontend && pnpm lint
```

### Staged 模式（--staged）

```bash
cd apps/frontend && npx lint-staged
```

> 注：如果项目未配置 lint-staged，此模式会失败。建议使用默认模式。

---

## Step 3: 输出报告

**报告格式**：

```
📊 ESLint 修复报告
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔧 模式: [修复/检查/Staged]

📈 结果:
  - Errors: X 个
  - Warnings: X 个

✅ 状态: [通过/有警告/有错误]

💡 剩余需手动修复的问题:
  [列出无法自动修复的问题，如有]
```

</workflow>

<examples>
## 使用示例

```bash
# 修复全部
/fix

# 仅检查，不修复
/fix --check

# 仅修复 staged 文件（commit 前使用）
/fix --staged
```
</examples>

<tips>
## 使用建议

| 场景 | 推荐命令 |
|------|----------|
| 日常开发 | `/fix` |
| 提交前检查 | `/fix --check` |
| 只修复暂存文件 | `/fix --staged` |

## 与 /deep-audit 的关系

| 命令 | 用途 | ESLint 处理 |
|------|------|-------------|
| `/fix` | 快速修复代码规范 | 仅 ESLint |
| `/deep-audit` | 全面审计 | 包含 ESLint + 更多 |

**建议**：
- 日常开发使用 `/fix` 快速修复
- Phase 完成后使用 `/deep-audit` 全面审计
</tips>
