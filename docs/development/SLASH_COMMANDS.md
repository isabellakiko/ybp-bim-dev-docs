# Slash Commands 使用指南

> YBP 项目 AI 协作命令参考文档

**最后更新**: 2025-12-08
**命令数量**: 8 个

---

## 概述

Slash Commands 是与 Claude Code 协作的核心工具，帮助实现：
- 快速恢复项目上下文
- 自动化文档更新
- 标准化开发工作流

---

## 命令总览

| 命令 | 用途 | 使用频率 | 主要参数 |
|------|------|----------|----------|
| `/start` | 恢复项目记忆 | 每次会话开始 | `--full`, `--phase`, `--bug` |
| `/checkpoint` | 阶段性保存进度 | 完成功能后 | `--commit`, `--skip-git` |
| `/end` | 每日结束 | 每天结束时 | `--push`, `--no-push` |
| `/weekly` | 每周文档优化 | 每周日 | `--push` |
| `/monthly` | 每月归档 | 每月初 | `--push` |
| `/audit` | 项目健康检查 | 定期 | `--quick`, `--full`, `--security` |
| `/deep-audit` | 全面深度审计 | Phase 完成后 | `--no-fix`, `--no-push` |
| `/fix` | ESLint 自动修复 | 按需 | `--check`, `--staged` |

---

## 详细说明

### `/start` - 恢复项目记忆

**用途**: 每次开始新会话时恢复项目上下文

**参数**:
- 无参数: 快速启动，读取 CONTEXT.md + CURRENT.md
- `--full`: 完整启动，读取所有核心文档
- `--phase`: 深入当前阶段，读取阶段文档和待讨论问题
- `--bug`: Bug 修复模式，额外读取 troubleshooting.md
- `--component`: 组件开发模式，额外读取 components.md + pages.md

**示例**:
```bash
/start          # 日常快速启动
/start --full   # 首次使用或长时间未开发
/start --phase  # 深入当前阶段需求梳理
/start --bug    # 准备修复 Bug
```

**输出**: 项目概况、项目阶段、Dev Server 状态

---

### `/checkpoint` - 阶段性保存

**用途**: 完成一个功能/阶段后保存进度

**参数**:
- 无参数: 更新文档，询问是否 commit
- `--commit`: 自动创建 commit（不 push）
- `--skip-git`: 跳过 Git 操作

**执行内容**:
1. 总结当前工作
2. 更新 CURRENT.md（添加/补充 Day 条目）
3. 根据工作内容更新相关文档
4. 可选创建 Git commit

**示例**:
```bash
/checkpoint           # 保存进度，询问 commit
/checkpoint --commit  # 保存并自动 commit
```

---

### `/end` - 每日结束

**用途**: 每日开发结束时完整总结

**参数**:
- 无参数: 创建 commit，询问是否 push
- `--push`: 自动推送
- `--no-push`: 不推送

**执行内容**:
1. 完整总结今天工作
2. 更新 CURRENT.md
3. 检查是否需要更新 CONTEXT.md
4. 创建 Git commit
5. 可选推送到远程

**示例**:
```bash
/end          # 结束并询问推送
/end --push   # 结束并自动推送
```

---

### `/weekly` - 每周优化

**用途**: 每周日执行，优化文档，生成周报

**参数**:
- 无参数: 优化文档，询问是否 push
- `--push`: 自动推送

**执行内容**:
1. 审查 CURRENT.md，识别并删除冗余
2. 检查文档同步状态
3. 更新 CONTEXT.md（如有进展）
4. 统计本周工作
5. 生成 Token 优化报告
6. 输出周报

**示例**:
```bash
/weekly         # 周优化
/weekly --push  # 优化并推送
```

---

### `/monthly` - 每月归档

**用途**: 每月初执行，归档上月日志

**参数**:
- 无参数: 归档，询问是否 push
- `--push`: 自动推送

**执行内容**:
1. 归档 CURRENT.md 到 `archive/YYYY-MM.md`
2. 创建新月份 CURRENT.md
3. 更新 CONTEXT.md
4. 审查所有文档
5. 清理过期归档（超过 6 个月）
6. 输出月报

**示例**:
```bash
/monthly         # 月度归档
/monthly --push  # 归档并推送
```

---

### `/audit` - 项目健康检查

**用途**: 全面检查项目健康状态

**参数**:
- `--quick`: 快速检查（代码质量 + Git 状态）
- 无参数: 标准检查
- `--full`: 完整检查（含构建测试）
- `--security`: 重点安全扫描

**检查内容**:
1. 代码质量（ESLint、TODO/FIXME）
2. 依赖健康（过时依赖、安全漏洞）
3. 性能指标（构建时间、产物大小）
4. 文档同步状态
5. Git 状态

**输出**: 健康度评分 + 行动建议

**示例**:
```bash
/audit           # 标准检查
/audit --quick   # 快速检查
/audit --full    # 完整检查
/audit --security # 安全扫描
```

---

### `/deep-audit` - 全面深度审计

**用途**: Phase 完成后执行，不放过任何文件和代码行

**参数**:
- 无参数: 审计 → 修复 → 提交 → 推送
- `--no-fix`: 仅审计，不修复
- `--no-push`: 修复并提交，但不推送

**检查内容**:
1. 代码结构 - 组件/页面/样式/配置
2. 文档系统 - 全部文档逐行检查
3. Slash Commands - 命令完整性审计
4. 设计系统 - CSS 变量/字体/颜色
5. 依赖健康 - package.json vs 文档
6. 冗余检测 - 重复文件/过时内容

**输出**: 详细审计报告 + 自动修复

**示例**:
```bash
/deep-audit           # 完整审计 + 自动修复
/deep-audit --no-fix  # 仅审计，不修复
/deep-audit --no-push # 修复但不推送
```

---

### `/fix` - ESLint 自动修复

**用途**: 快速修复可自动修复的代码问题

**参数**:
- 无参数: 修复全部文件
- `--check`: 仅检查，不修复
- `--staged`: 仅修复已 staged 的文件

**执行内容**:
1. 运行 ESLint
2. 自动修复可修复的问题
3. 输出修复报告

**示例**:
```bash
/fix           # 修复全部
/fix --check   # 仅检查
/fix --staged  # 修复 staged 文件
```

---

## 每日工作流

```
会话开始
    │
    ▼
/start                 ← 恢复上下文
    │
    ▼
开发功能 A
    │
    ▼
/checkpoint --commit   ← 保存进度
    │
    ▼
开发功能 B
    │
    ▼
/end --push           ← 每日结束
```

## 每周/每月维护

```
每周日: /weekly --push       ← 文档优化
每月初: /monthly --push      ← 归档
定期:   /audit --full        ← 健康检查
Phase后: /deep-audit         ← 全面深度审计
按需:   /fix                 ← ESLint 修复
```

---

## 命令文件位置

```
.claude/commands/
├── start.md
├── checkpoint.md
├── end.md
├── weekly.md
├── monthly.md
├── audit.md
├── deep-audit.md
└── fix.md
```

---

## 注意事项

1. **时间命令**: macOS 使用 `date -v` 语法
2. **包管理器**: 自动检测 pnpm/npm/yarn/bun
3. **Git 安全**: 不会修改已推送的 commit

---

**维护者**: Stephen
**参考**: [02-Slash-Commands完整配置.md](../guides/02-Slash-Commands完整配置.md)
