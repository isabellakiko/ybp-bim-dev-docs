---
description: 项目健康检查，代码质量、依赖、文档同步
argument-hint: [--quick | --full | --security | --docs]
allowed-tools: Read, Bash(date, git, pnpm, find, wc)
---

<task>
执行项目健康检查，生成审计报告，识别问题并提供建议。
</task>

<workflow>

## Step 0: 获取当前时间和项目信息

```bash
CURRENT_DATE=$(date +%Y-%m-%d)
CURRENT_TIME=$(date +%H:%M)
CURRENT_WEEK_NUM=$(date +%V)

echo "审计时间: $CURRENT_DATE $CURRENT_TIME (第 $CURRENT_WEEK_NUM 周)"
```

## Step 1: 解析参数

| 参数 | 检查范围 | 预计时间 | 使用场景 |
|------|----------|----------|----------|
| `--quick` | 代码质量 + Git 状态 | 2-3 分钟 | 日常快速检查 |
| 无参数 | 标准检查 | 5-10 分钟 | 每周例行检查 |
| `--full` | 全部检查（含构建测试） | 10-15 分钟 | 大版本后 |
| `--security` | 重点安全漏洞扫描 | 3-5 分钟 | 上线前 |
| `--docs` | 文档同步审计 | 5-8 分钟 | Phase 完成后 |

**--docs 模式特殊检查**:
- CONTEXT.md 准确性（阶段、技术栈、状态）
- CURRENT.md 时效性（最后更新时间）
- 组件文档完整性（components.md vs 实际组件）
- 页面文档同步（pages.md vs 实际页面）
- 交接清单进度（参与方.md 进度表）

## Step 2: 代码质量检查

### 2.1 ESLint 检查

```bash
cd apps/frontend && pnpm lint 2>&1 || true
```

### 2.2 未使用依赖检查

```bash
cd apps/frontend && pnpm exec depcheck 2>&1 || echo "depcheck 未安装"
```

### 2.3 TODO/FIXME 统计

```bash
grep -r "TODO\|FIXME" apps/frontend/src --include="*.jsx" --include="*.js" 2>/dev/null | wc -l
```

## Step 3: 依赖健康检查

### 3.1 过时依赖统计

```bash
cd apps/frontend && pnpm outdated 2>&1 || true
```

### 3.2 安全漏洞扫描

```bash
cd apps/frontend && pnpm audit 2>&1 || true
```

## Step 4: 性能指标追踪（--full 模式）

### 4.1 构建性能测试

```bash
cd apps/frontend && time pnpm build 2>&1
```

### 4.2 产物大小统计

```bash
du -sh apps/frontend/dist 2>/dev/null || echo "未构建"
```

## Step 5: 文档同步检查

### 5.1 组件文档完整性

```bash
ACTUAL_COMPONENTS=$(find apps/frontend/src/components -name "*.jsx" 2>/dev/null | wc -l)
echo "实际组件数: $ACTUAL_COMPONENTS"
```

对比 docs/development/frontend/components.md 记录的组件数

### 5.2 CONTEXT.md 准确性

检查 CONTEXT.md 中的：
- 项目阶段是否准确
- 技术栈版本是否正确
- 下一步任务是否与 CURRENT.md 一致

## Step 6: Git 状态检查

```bash
echo "=== Git 状态 ==="
git status --short | wc -l
echo "本周 commits:"
git log --since="$(date -v-7d +%Y-%m-%d)" --oneline | wc -l
```

## Step 7: 生成审计报告

```
📋 项目健康度审计报告

**审计时间**: ${CURRENT_DATE} ${CURRENT_TIME}
**审计模式**: [--quick | 标准 | --full | --security]

---

## 1️⃣ 代码质量 [✅/⚠️/❌]

| 指标 | 结果 | 状态 |
|------|------|------|
| ESLint errors | X 个 | ✅/❌ |
| ESLint warnings | X 个 | ✅/⚠️ |
| TODO/FIXME | X 个 | ✅/⚠️ |

---

## 2️⃣ 依赖健康 [✅/⚠️/❌]

| 指标 | 结果 | 状态 |
|------|------|------|
| 可更新依赖 | X 个 | ⚠️ |
| 安全漏洞 (Critical) | X 个 | ✅/❌ |
| 安全漏洞 (High) | X 个 | ✅/❌ |

---

## 3️⃣ 性能指标 [✅/⚠️/❌]

| 指标 | 结果 | 基准 | 状态 |
|------|------|------|------|
| 构建时间 | Xs | <5s | ✅/⚠️ |
| 产物大小 | XMB | <3MB | ✅/⚠️ |

---

## 4️⃣ 文档同步 [✅/⚠️/❌]

| 文档 | 状态 | 说明 |
|------|------|------|
| components.md | ✅/⚠️ | X/Y 已文档化 |
| pages.md | ✅/⚠️ | X/Y 已文档化 |
| CONTEXT.md | ✅/⚠️ | [准确/需更新] |

---

## 5️⃣ Git 状态

| 指标 | 结果 |
|------|------|
| 未提交文件 | X 个 |
| 本周 commits | X 次 |

---

## 📊 综合健康度评分

**总评**: XX/100 [✅优秀 | ⚠️良好 | ❌需改进]

---

## 🎯 行动建议

### 立即处理 (Critical)
1. [建议 1]

### 本周完成 (High)
1. [建议 2]

### 下周计划 (Medium)
1. [建议 3]
```

</workflow>
