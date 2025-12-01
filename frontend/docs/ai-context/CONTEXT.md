# YBP 项目上下文（AI 快速恢复）

> AI 协作记忆文件 - 快速恢复项目上下文，立即开始工作

**最后更新**: 2025-11-27 15:21
**项目阶段**: Phase 5 - 工程量计算模块推进
**当前状态**: 网页完成，转向工程量计算技术调研

---

## TL;DR（30秒速览）

**项目性质**: YBP 族库管理系统 - 需求文档可视化展示网站
**参与方**: 永麦（需求方）+ 易达（开发方）
**技术栈**: React 19 + Vite 7 + Tailwind CSS 3

**已完成功能**:
- 3 个页面（精简自 7 个）
- Google-inspired 暗色主题
- 动画系统（fade-up, scroll, hover-lift）
- 完整业务流程展示

**页面列表**:
- `/` - 首页（项目概览 + 完整工作流程）
- `/logic` - 业务逻辑（匹配规则 + 案例）
- `/issues` - 问题追踪

---

## 设计系统（v2 - Google 风格）

### 配色方案

```
表面色（带蓝调深灰，非纯黑）:
- surface-dim: #111827 (最深背景)
- surface: #1f2937 (主背景)
- surface-bright: #374151 (亮表面)

主色调:
- primary: #60a5fa (柔和蓝色)
- secondary: #a78bfa (紫色)
- tertiary: #34d399 (绿色)

文字色:
- on-surface: #f9fafb (主文字)
- on-surface-variant: #d1d5db (次要文字)

边框: #4b5563
```

### 字体

```css
font-family: 'Times New Roman', Georgia, 'PingFang SC', 'Microsoft YaHei', serif;
```

### 动画系统

```css
.animate-fade-up    /* 入场淡入上移 */
.animate-on-scroll  /* Intersection Observer 滚动触发 */
.hover-lift         /* 悬浮上浮+阴影 */
.glass              /* 玻璃效果（backdrop-blur） */
.gradient-mesh      /* 多色渐变网格背景 */
```

---

## 业务核心概念

```
族(Family) → 品目(Item) → 清单(Bill) → 工程量(Quantity)
     ↓           ↓           ↓            ↓
  Revit构件    系统分类     计价项目     数量计算
```

### 完整业务流程

```
配置阶段（一次性）:
  族 → Revit 插件上传 → YBP 系统品目配置
                        ├── 构件属性 → 清单匹配规则
                        └── 工程量属性 → 出量规则

使用阶段（每个项目）:
  下载族 → 建模 → 导出 BIM 数据包 → 新建项目上传 → 匹配出量
```

### 匹配类型

- 无条件匹配（一对多）
- 精确值匹配
- 区间匹配
- 多参数 AND 匹配

---

## 项目结构

```
src/
├── components/
│   └── Layout.jsx        # 布局（Header + Footer）
├── pages/                 # 页面（3个）
│   ├── HomePage.jsx      # 首页
│   ├── LogicPage.jsx     # 业务逻辑
│   └── IssuesPage.jsx    # 问题追踪
├── App.jsx               # 路由配置
├── main.jsx              # 入口
└── index.css             # 全局样式 + 动画
```

**已删除**:
- src/data/*.js（数据内联到组件）
- src/components/ui/（简化组件结构）
- FlowPage, CasesPage, SystemPage, DocsPage, GlossaryPage

---

## 技术栈

| 技术 | 版本 | 用途 |
|-----|------|------|
| React | 19 | UI 框架 |
| Vite | 7 | 构建工具 |
| React Router | 7 | 路由管理 |
| Tailwind CSS | 3 | 样式系统 |

---

## 文档结构

### 设计文档（4个）
- `docs/design/00_网页设计总览.md`
- `docs/design/01_首页设计.md`
- `docs/design/02_业务逻辑页设计.md`
- `docs/design/03_问题追踪页设计.md`

### 业务文档
- `docs/business/overview/` - 项目概述、术语
- `docs/business/core-logic/` - 匹配逻辑、计算、参数
- `docs/business/implementation/` - 族类型、系统原型、案例
- `docs/business/pending/` - 讨论记录、待讨论问题

---

## 后续开发

### 职责范围（11.27 起生效）

**Stephen 负责**（至 12 月底）：
- 清单 → 出清单 + 工程量 模块
- 节奏：零星推进

**不在范围内**：
- 清单库维护、版本管理 → 黄增沛 ↔ 李昱 直接对接

### 当前重点：工程量计算技术调研

**待搞清楚**：
1. 计算在哪执行？Revit 插件端 vs 系统服务器端
2. 规则如何配置？
3. Revit 如何识别/解码规则？
4. Revit API 计算引擎如何调用？

**方向**：
```
系统配置规则 → Revit 解码 → API 计算引擎 → 输出工程量
原则：不要写死，功能解耦
```

### 暂缓

- Revit 插件功能讨论（等评审结果）
- 清单库设计（黄增沛↔李昱）

### 已确认

- YBP 系统品目配置（构件属性、清单匹配规则、工程量属性）
- 完整业务流程

---

## 协作偏好

### 设计约束
- ✅ Google 风格暗色主题
- ✅ Times New Roman 字体
- ✅ 中文优先
- ❌ 不使用 TypeScript
- ❌ 不使用 Tailwind v4

### Slash Commands

```bash
/start              # 恢复记忆
/checkpoint         # 阶段性更新进度
/end                # 结束会话
/weekly             # 每周文档优化
```

---

**维护者**: Stephen
**更新频率**: 每次重大变更时更新
