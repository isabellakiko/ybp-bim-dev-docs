# 架构决策记录 (ADR)

## 什么是 ADR？

ADR (Architecture Decision Records) 是记录项目中重要架构决策的文档。它帮助团队：

- 记录为什么做出某个技术决策
- 理解决策的上下文和权衡
- 避免重复讨论已解决的问题
- 为新成员提供历史背景

## ADR 模板

创建新的 ADR 时，请使用以下模板：

```markdown
# ADR-{编号}: {决策标题}

## 状态
{提议中 | 已接受 | 已弃用 | 已替代}

## 上下文
{描述需要做出决策的背景和问题}

## 决策
{描述我们做出的决策}

## 理由
{解释为什么做出这个决策，包括考虑的选项和权衡}

## 后果
{描述这个决策带来的正面和负面影响}

## 替代方案
{列出考虑过但未采用的其他方案}

## 相关决策
{如果有，列出相关的 ADR 编号}

## 参考资料
{相关文档、讨论链接等}

---
日期: YYYY-MM-DD
作者: [名字]
```

## 命名规范

ADR 文件命名格式：`ADR-{编号}-{简短描述}.md`

示例：
- `ADR-001-选择React19作为UI框架.md`
- `ADR-002-使用Vite作为构建工具.md`
- `ADR-003-采用Tailwind-CSS.md`

编号使用三位数字（001, 002, 003...），按时间顺序递增。

## 现有 ADR 列表

当前项目还没有正式的 ADR 记录。未来的架构决策将在此处记录。

### 建议首批创建的 ADR

以下是建议为现有技术选型补充的 ADR：

- [ ] **ADR-001**: 选择 React 19 作为 UI 框架
- [ ] **ADR-002**: 使用 Vite 7 作为构建工具
- [ ] **ADR-003**: 采用 Tailwind CSS v3 作为样式方案
- [ ] **ADR-004**: 选择 React Router 7 进行路由管理
- [ ] **ADR-005**: 使用 React Flow 实现流程可视化
- [ ] **ADR-006**: 采用 pnpm 作为包管理器
- [ ] **ADR-007**: 纯前端架构决策（暂不引入后端）

### 未来可能的 ADR 主题

- 状态管理方案选择（Redux、Zustand、Jotai 等）
- 测试框架选择
- API 客户端选择
- 部署方案选择
- 错误监控和日志方案
- 国际化方案
- 性能监控方案

## 如何创建 ADR

### 步骤 1：识别需要记录的决策

当遇到以下情况时，应该创建 ADR：

- 选择框架或重要库
- 改变架构模式
- 引入新的技术或工具
- 重要的设计决策
- 对系统有长期影响的决策

### 步骤 2：收集信息

- 明确问题和上下文
- 研究可能的解决方案
- 评估各个方案的优缺点
- 与团队讨论

### 步骤 3：编写 ADR

1. 在 `docs/architecture/adr/` 目录下创建新文件
2. 使用上述模板
3. 填写所有必要的章节
4. 确保内容清晰、客观

### 步骤 4：审查和批准

1. 提交 Pull Request
2. 团队成员审查
3. 讨论和修改
4. 合并到主分支

### 步骤 5：更新 ADR 索引

在本文件的"现有 ADR 列表"部分添加新的 ADR 链接。

## ADR 的生命周期

### 状态说明

- **提议中**：正在讨论，尚未做出最终决定
- **已接受**：已经采纳并实施
- **已弃用**：不再使用，但保留记录
- **已替代**：被新的 ADR 替代（需注明替代者）

### 修改已有 ADR

原则上，已接受的 ADR 不应该修改。如果情况变化需要改变决策：

1. 创建新的 ADR 替代旧的
2. 在旧 ADR 中标记为"已替代"
3. 在新 ADR 中引用旧 ADR

这样可以保留完整的决策历史。

## 最佳实践

### Do（推荐做法）

- ✅ 保持 ADR 简洁明了
- ✅ 专注于"为什么"而不是"怎么做"
- ✅ 记录关键的上下文信息
- ✅ 诚实记录权衡和妥协
- ✅ 及时记录，不要事后追溯
- ✅ 使用清晰的语言，避免技术黑话

### Don't（避免做法）

- ❌ 记录琐碎的决策
- ❌ 修改已接受的 ADR（应创建新的）
- ❌ 忘记更新 ADR 状态
- ❌ 使用模糊或主观的语言
- ❌ 遗漏重要的上下文信息

## 工具和资源

### 推荐阅读

- [ADR GitHub 组织](https://adr.github.io/)
- [Michael Nygard 的原始 ADR 文章](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions)
- [ADR Tools](https://github.com/npryce/adr-tools)

### 相关项目文档

- [架构总览](../OVERVIEW.md)
- [技术栈详情](../tech-stack.md)

## 示例

参考其他项目的 ADR 示例：

- [Spotify ADR](https://github.com/backstage/backstage/tree/master/docs/architecture-decisions)
- [AWS Prescriptive Guidance](https://docs.aws.amazon.com/prescriptive-guidance/latest/architectural-decision-records/welcome.html)

---

**文档维护者**：架构团队
**最后更新**：2025-12-02
