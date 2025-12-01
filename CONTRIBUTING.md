# Contributing | 贡献指南

[English](#contributing-guide) | [中文](#贡献指南)

---

## Contributing Guide

Thank you for your interest in contributing to YBP BIM Development Docs!

### Getting Started

1. **Fork** the repository
2. **Clone** your fork locally
3. **Install** dependencies: `cd frontend && pnpm install`
4. **Create** a new branch: `git checkout -b feature/your-feature`

### Development Workflow

```bash
# Start dev server
cd frontend
pnpm dev

# Run linting
pnpm lint

# Build for production
pnpm build
```

### Commit Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>: <description>

[optional body]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```
feat: add quantity calculation page
docs: update matching logic documentation
fix: resolve routing issue on mobile
```

### Pull Request Process

1. Update documentation if needed
2. Ensure all checks pass
3. Request review from maintainers
4. Squash and merge after approval

---

## 贡献指南

感谢您对 YBP BIM 开发文档项目的关注！

### 开始之前

1. **Fork** 本仓库
2. **Clone** 到本地
3. **安装依赖**: `cd frontend && pnpm install`
4. **创建分支**: `git checkout -b feature/你的功能`

### 开发流程

```bash
# 启动开发服务器
cd frontend
pnpm dev

# 代码检查
pnpm lint

# 构建生产版本
pnpm build
```

### 提交规范

遵循 [约定式提交](https://www.conventionalcommits.org/zh-hans/):

```
<类型>: <描述>

[可选正文]
```

**类型说明:**
- `feat`: 新功能
- `fix`: 修复问题
- `docs`: 文档更新
- `style`: 代码格式调整
- `refactor`: 代码重构
- `test`: 测试相关
- `chore`: 构建/工具相关

**示例:**
```
feat: 添加工程量计算页面
docs: 更新清单匹配逻辑文档
fix: 修复移动端路由问题
```

### Pull Request 流程

1. 如有必要，更新相关文档
2. 确保所有检查通过
3. 请求维护者审核
4. 审核通过后合并

---

## Questions | 问题咨询

如有问题，请通过 [Issues](https://github.com/isabellakiko/ybp-bim-dev-docs/issues) 提出。
