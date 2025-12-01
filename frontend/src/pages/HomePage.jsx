import { Link } from 'react-router-dom'
import { useEffect, useRef } from 'react'

// 核心概念
const coreNodes = [
  { id: 'family', label: '族', sub: 'Family', color: 'from-blue-500 to-blue-600' },
  { id: 'item', label: '品目', sub: 'Item', color: 'from-purple-500 to-purple-600' },
  { id: 'bill', label: '清单', sub: 'Bill', color: 'from-emerald-500 to-emerald-600' },
  { id: 'quantity', label: '工程量', sub: 'Quantity', color: 'from-amber-500 to-amber-600' },
]

// 完整工作流程
const workflowSteps = [
  { phase: '配置', steps: [
    { label: '上传族', desc: 'Revit 插件', icon: '↑' },
    { label: '配置规则', desc: 'YBP 系统', icon: '⚙' },
  ]},
  { phase: '使用', steps: [
    { label: '下载族', desc: 'Revit 插件', icon: '↓' },
    { label: '建模', desc: 'Revit', icon: '🏗' },
    { label: '导出数据', desc: 'BIM 数据包', icon: '📦' },
    { label: '匹配出量', desc: 'YBP 系统', icon: '✓' },
  ]},
]

// 项目状态
const milestones = [
  { label: '需求讨论', done: true },
  { label: '原型设计', done: true },
  { label: '易达评审', current: true, detail: '排队中' },
  { label: '开发启动', done: false },
]

// 滚动动画 Hook
function useScrollAnimation() {
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    const elements = ref.current?.querySelectorAll('.animate-on-scroll')
    elements?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return ref
}

export default function HomePage() {
  const containerRef = useScrollAnimation()

  return (
    <div ref={containerRef} className="max-w-6xl mx-auto px-6 lg:px-8">
      {/* Hero Section */}
      <section className="py-16 lg:py-24 text-center">
        <div className="animate-fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            易达评审中
          </div>
        </div>

        <h1 className="animate-fade-up text-4xl sm:text-5xl lg:text-6xl font-bold text-on-surface mb-6 tracking-tight" style={{ animationDelay: '0.1s' }}>
          YBP <span className="font-normal text-on-surface-variant">族库管理系统</span>
        </h1>

        <p className="animate-fade-up text-lg sm:text-xl text-on-surface-variant max-w-2xl mx-auto mb-10" style={{ animationDelay: '0.2s' }}>
          基于 BIM 模型的智能清单匹配与工程量自动计算，
          <br className="hidden sm:block" />
          让建模即算量成为可能
        </p>

        <div className="animate-fade-up flex flex-wrap gap-4 justify-center" style={{ animationDelay: '0.3s' }}>
          <Link to="/logic" className="btn btn-primary">
            了解业务逻辑
          </Link>
          <Link to="/issues" className="btn btn-secondary">
            查看问题追踪
          </Link>
        </div>
      </section>

      {/* 核心概念 */}
      <section className="py-12 animate-on-scroll">
        <div className="text-center mb-12">
          <h2 className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
            Core Concepts
          </h2>
          <p className="text-2xl sm:text-3xl font-bold text-on-surface">
            四大核心概念
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 lg:gap-8">
          {coreNodes.map((node, index) => (
            <div key={node.id} className="flex items-center gap-4 lg:gap-8">
              <div className="group text-center">
                <div className={`w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-br ${node.color} flex flex-col items-center justify-center hover-lift cursor-pointer`}>
                  <span className="text-2xl sm:text-3xl font-bold text-white">{node.label}</span>
                  <span className="text-xs text-white/70">{node.sub}</span>
                </div>
              </div>

              {index < coreNodes.length - 1 && (
                <svg className="w-8 h-8 text-outline hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 完整工作流程 */}
      <section className="py-16 animate-on-scroll">
        <div className="text-center mb-12">
          <h2 className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
            Workflow
          </h2>
          <p className="text-2xl sm:text-3xl font-bold text-on-surface">
            完整工作流程
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {workflowSteps.map((phase) => (
            <div key={phase.phase} className="bg-surface-bright/30 rounded-3xl p-6 border border-outline-variant/30">
              <h3 className="text-lg font-semibold text-primary mb-4">{phase.phase}阶段</h3>
              <div className="space-y-3">
                {phase.steps.map((step, i) => (
                  <div key={i} className="flex items-center gap-4 bg-surface-dim/30 rounded-2xl p-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center text-lg">
                      {step.icon}
                    </div>
                    <div>
                      <p className="font-medium text-on-surface">{step.label}</p>
                      <p className="text-sm text-on-surface-variant">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 项目进度 */}
      <section className="py-16 animate-on-scroll">
        <div className="bg-surface-bright/30 rounded-3xl p-8 sm:p-12 border border-outline-variant/30">
          <div className="text-center mb-10">
            <h2 className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
              Progress
            </h2>
            <p className="text-2xl sm:text-3xl font-bold text-on-surface">
              项目进度
            </p>
          </div>

          <div className="flex justify-between items-center max-w-2xl mx-auto relative">
            {/* 连接线 */}
            <div className="absolute top-3 left-0 right-0 h-0.5 bg-outline-variant/50" />
            <div
              className="absolute top-3 left-0 h-0.5 bg-primary transition-all duration-500"
              style={{ width: '66%' }}
            />

            {milestones.map((m, i) => (
              <div key={i} className="flex flex-col items-center relative z-10">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                  m.done
                    ? 'bg-primary border-primary'
                    : m.current
                    ? 'bg-surface border-primary'
                    : 'bg-surface border-outline-variant'
                }`}>
                  {m.done && (
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                  {m.current && (
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  )}
                </div>
                <span className={`mt-3 text-xs sm:text-sm font-medium ${
                  m.done || m.current ? 'text-on-surface' : 'text-on-surface-variant'
                }`}>
                  {m.label}
                </span>
                {m.detail && (
                  <span className="text-xs text-primary mt-1">
                    {m.detail}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 快速入口 */}
      <section className="py-16 pb-24 animate-on-scroll">
        <div className="text-center mb-12">
          <h2 className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
            Quick Access
          </h2>
          <p className="text-2xl sm:text-3xl font-bold text-on-surface">
            探索更多
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          <Link
            to="/logic"
            className="group bg-surface-bright/30 rounded-3xl p-8 border border-outline-variant/30 hover:border-primary/50 transition-all duration-300 hover-lift"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-on-surface mb-2 group-hover:text-primary transition-colors">
              业务逻辑
            </h3>
            <p className="text-on-surface-variant">
              4 种匹配规则 · 3 个典型案例
            </p>
          </Link>

          <Link
            to="/issues"
            className="group bg-surface-bright/30 rounded-3xl p-8 border border-outline-variant/30 hover:border-primary/50 transition-all duration-300 hover-lift"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-red-500 flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-on-surface mb-2 group-hover:text-primary transition-colors">
              问题追踪
            </h3>
            <p className="text-on-surface-variant">
              待讨论问题 · 已解决问题
            </p>
          </Link>
        </div>
      </section>
    </div>
  )
}
