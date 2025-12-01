# YBP BIM Development Docs

> Documentation and prototype site for YBP BIM system development

[English](#overview) | [中文](#项目简介)

---

## Overview

YBP (永麦 BIM Platform) is a BIM family library management and quantity automation system. This repository contains development documentation and a prototype visualization site to assist R&D collaboration.

### Key Features

- 📄 **Structured Documentation** - Business logic, design specs, and technical discussions
- 🎨 **Prototype Website** - Interactive visualization of system concepts
- 🔄 **Workflow Visualization** - Core business processes and matching logic
- 🤖 **AI Collaboration** - Configured for Claude Code assisted development

### Tech Stack

| Category | Technology |
|----------|------------|
| Framework | React 19 |
| Build Tool | Vite 7 |
| Styling | Tailwind CSS v3 (Dark Theme) |
| Routing | React Router 7 |
| Diagrams | React Flow (@xyflow/react) |

---

## 项目简介

YBP（永麦 BIM 平台）是一个 BIM 族库管理与工程量自动化系统。本仓库包含开发文档和原型可视化站点，用于协助研发协作。

### 核心理念

```
建模即算量
```

通过 Revit 模型自动计算工程量，取代传统 CAD 手动拉线算量方式。

### 业务流程

```
族(Family) → 品目 → 清单 → 工程量
     ↓         ↓       ↓        ↓
  Revit构件  系统分类  计价项目  数量计算
```

### 参与方

- **永麦**（上海永麦管理咨询有限公司）- 需求方
- **易达**（广州易达建信科技开发有限公司）- 开发方

---

## Quick Start

```bash
cd frontend

# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Build for production
pnpm build
```

## Project Structure

```
YBP/
├── README.md
├── .gitignore
└── frontend/
    ├── src/
    │   ├── pages/          # 3 pages (Home, Logic, Issues)
    │   ├── components/     # Reusable components
    │   └── ...
    ├── docs/
    │   ├── ai-context/     # AI collaboration context
    │   ├── business/       # Business documentation
    │   ├── design/         # Design specifications
    │   └── guides/         # Usage guides
    └── package.json
```

## Documentation

| Document | Description |
|----------|-------------|
| [项目概述](frontend/docs/business/overview/00_项目概述.md) | Project overview |
| [术语与概念](frontend/docs/business/overview/01_术语与概念.md) | Terminology & concepts |
| [清单匹配逻辑](frontend/docs/business/core-logic/02_清单匹配逻辑.md) | List matching logic |
| [工程量计算](frontend/docs/business/core-logic/03_工程量计算.md) | Quantity calculation |
| [待讨论问题](frontend/docs/business/pending/99_待讨论问题.md) | Pending issues |

## License

Private - All rights reserved.

---

**Maintainer**: Stephen
**Last Updated**: 2025-12-01
