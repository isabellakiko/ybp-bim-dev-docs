---
description: 全面深度审计，不放过任何文件和代码行，自动优化并提交
argument-hint: [--no-fix | --no-push]
allowed-tools: Read, Write, Edit, Bash, Glob, Grep, Task, TodoWrite
---

<task>
执行全面深度审计：探索每个文件、每行代码，对比文档与代码实际状态，**自动修复所有问题并提交**。

**审计范围（不放过任何角落）**：
1. 代码结构 - 组件/页面/样式/配置
2. 文档系统 - AI 上下文/开发文档/架构文档/项目文档
3. Slash Commands - 所有 .claude/commands/*.md 命令
4. 设计系统 - CSS 变量/字体/颜色/动画
5. 依赖健康 - package.json vs 文档记录
6. 冗余检测 - 重复文件/过时内容/空目录

**默认行为**：审计 → 修复 → 提交 → 推送
**参数说明**：
- `--no-fix`: 仅审计，不修复
- `--no-push`: 修复并提交，但不推送
</task>

<workflow>

## Step 0: 初始化审计任务

**创建任务清单**（使用 TodoWrite）：
```
1. [pending] 代码结构全面探索
2. [pending] 文档系统全面探索
3. [pending] Slash Commands 审计
4. [pending] 设计系统审计
5. [pending] 依赖健康审计
6. [pending] 对比分析并识别问题
7. [pending] 生成审计报告
8. [pending] 执行全部优化
9. [pending] 提交并推送变更
```

**获取当前时间**：
```bash
AUDIT_DATE=$(date +%Y-%m-%d)
AUDIT_TIME=$(date +%H:%M)
echo "审计时间: $AUDIT_DATE $AUDIT_TIME"
```

---

## Step 1: 代码结构全面探索（标记 in_progress）

### 1.1 组件目录完整扫描

**扫描所有组件**：
```bash
echo "=== 组件 ===" && ls -la apps/frontend/src/components/
```

**记录格式**：
```
实际组件列表:
├── 组件名称 1
├── 组件名称 2
└── ...
```

### 1.2 页面深度扫描

```bash
echo "=== 页面 ===" && ls -la apps/frontend/src/pages/
```

### 1.3 样式系统扫描

```bash
cat apps/frontend/src/index.css | head -100
```

### 1.4 配置文件扫描

```bash
cat apps/frontend/package.json
cat apps/frontend/vite.config.js
cat apps/frontend/tailwind.config.js
```

---

## Step 2: 文档系统全面探索（标记 in_progress）

### 2.1 扫描所有文档文件

```bash
find docs -name "*.md" -type f | sort
find docs -name "*.md" -type f | wc -l
```

### 2.2 必须完整读取的核心文档

1. `docs/ai-context/CONTEXT.md` - 项目上下文（逐行检查）
2. `docs/ai-context/CURRENT.md` - 当前进度（逐行检查）
3. `docs/development/frontend/components.md` - 组件文档
4. `docs/development/frontend/pages.md` - 页面文档
5. `docs/architecture/tech-stack.md` - 技术栈详解
6. `docs/project/ROADMAP.md` - 路线图

---

## Step 3: Slash Commands 审计（标记 in_progress）

### 3.1 扫描所有命令文件

```bash
ls -la .claude/commands/
```

### 3.2 逐一检查每个命令

**检查项**：
```
命令: /[name]
├── 描述: [读取 description]
├── 参数: [读取 argument-hint]
├── 允许工具: [读取 allowed-tools]
├── 工作流完整性: [检查是否有遗漏步骤]
├── 文档引用准确性: [检查引用的文件路径是否存在]
└── 问题: [列出发现的问题]
```

---

## Step 4: 设计系统审计（标记 in_progress）

### 4.1 对比 CSS 变量与文档

```bash
grep -E "^\s+--" apps/frontend/src/index.css | head -50
```

### 4.2 检查 Tailwind 配置

```bash
cat apps/frontend/tailwind.config.js
```

### 4.3 检查字体系统

```bash
grep "font-family" apps/frontend/src/index.css
grep -A 5 "fonts.googleapis.com" apps/frontend/index.html 2>/dev/null || echo "无 Google Fonts"
```

---

## Step 5: 依赖健康审计（标记 in_progress）

```bash
cat apps/frontend/package.json
cd apps/frontend && pnpm outdated 2>/dev/null || echo "跳过 outdated 检查"
cd apps/frontend && pnpm audit 2>/dev/null || echo "跳过 audit 检查"
```

---

## Step 6: 对比分析并识别问题（标记 in_progress）

**对比维度**：
- 代码中的组件 vs components.md 记录
- 代码中的页面结构 vs pages.md 记录
- package.json vs tech-stack.md
- 实际完成情况 vs CONTEXT.md/ROADMAP.md 记录
- 命令引用的文件 vs 实际存在的文件
- 实际 CSS 变量 vs 设计系统文档

**问题分类**：
```
P0 - 严重（立即修复）:
1. [问题描述]

P1 - 中等（今日修复）:
1. [问题描述]

P2 - 轻微（本周修复）:
1. [问题描述]
```

---

## Step 7: 生成审计报告（标记 in_progress）

**写入** `docs/reports/deep-audit-YYYY-MM-DD.md`

报告模板：
```markdown
# 深度审计报告

**审计时间**: YYYY-MM-DD HH:MM
**审计范围**: 全面

---

## 1. 代码结构统计

| 类型 | 数量 |
|------|------|
| 组件 | X 个 |
| 页面 | X 个 |
| 样式文件 | X 个 |

## 2. 文档系统统计

| 类型 | 数量 |
|------|------|
| Markdown 文档 | X 个 |
| Slash Commands | X 个 |

## 3. 发现的问题

### P0 - 严重
- [问题列表]

### P1 - 中等
- [问题列表]

### P2 - 轻微
- [问题列表]

## 4. 修复记录

| 问题 | 修复方式 | 状态 |
|------|----------|------|
| ... | ... | ✅ |

## 5. 建议

1. [建议 1]
2. [建议 2]
```

---

## Step 8: 执行全部优化（标记 in_progress）

**注意**：除非包含 `--no-fix` 参数，否则自动执行修复

- 更新 CONTEXT.md/CURRENT.md/ROADMAP.md
- 更新 components.md/pages.md/tech-stack.md
- 优化 Slash Commands
- 清理冗余文件

---

## Step 9: 提交并推送变更（标记 in_progress）

**注意**：除非包含 `--no-push` 参数，否则自动推送

```bash
git add .
git commit -m "$(cat <<'EOF'
docs: 全面深度审计与自动优化

审计范围:
- 代码结构: X 个文件
- 文档系统: X 个文件
- Slash Commands: X 个命令
- 设计系统: 已检查

发现并修复:
- P0 严重问题: X 处
- P1 中等问题: X 处
- P2 轻微问题: X 处

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
EOF
)"

git push
```

---

## Step 10: 完成审计

**输出完成报告**：
```
═══════════════════════════════════════════════════════════
✅ 全面深度审计完成！
═══════════════════════════════════════════════════════════

📊 审计统计:
├── 扫描代码文件: X 个
├── 扫描文档文件: X 个
├── 审计 Slash Commands: X 个
└── 总计扫描: X 项

🔧 修复统计:
├── P0 严重问题: X 处 ✅ 已修复
├── P1 中等问题: X 处 ✅ 已修复
├── P2 轻微问题: X 处 ✅ 已修复
└── 总计修复: X 处

📝 生成报告: docs/reports/deep-audit-YYYY-MM-DD.md

⏰ 下次建议审计: 一周后或重大变更后
═══════════════════════════════════════════════════════════
```

</workflow>

<tips>
## 使用建议

```bash
# 完整审计 + 自动修复 + 推送（推荐）
/deep-audit

# 仅审计，不修复（用于检查）
/deep-audit --no-fix

# 审计修复，不推送（本地验证）
/deep-audit --no-push
```

## 与 /audit 的区别

| 特性 | /audit | /deep-audit |
|------|--------|-------------|
| 审计深度 | 标准检查 | 不放过任何文件 |
| Slash Commands | 不检查 | 全面检查 |
| 设计系统 | 不检查 | CSS 变量审计 |
| 默认行为 | 仅报告 | 自动修复 + 推送 |
| 使用频率 | 每周 | 每个 Phase 完成后 |
</tips>
