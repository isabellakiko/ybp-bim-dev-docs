import { Link } from 'react-router-dom'
import { useEffect, useRef } from 'react'

// 核心概念
const coreNodes = [
  { id: 'family', label: '族', sub: 'Family', color: 'from-blue-500 to-blue-600' },
  { id: 'item', label: '品目', sub: 'Item', color: 'from-purple-500 to-purple-600' },
  { id: 'bill', label: '清单', sub: 'Bill', color: 'from-emerald-500 to-emerald-600' },
  { id: 'quantity', label: '工程量', sub: 'Quantity', color: 'from-amber-500 to-amber-600' },
]

// 项目阶段
const phases = [
  { label: '原型评审', done: true, desc: '2025.11' },
  { label: '开发准备', current: true, desc: '2025.12' },
  { label: '正式开发', done: false, desc: '待定' },
]

// 当前工作重点（12-03 会议后更新）
const currentFocus = [
  { label: '业主清单梳理', desc: '麦当劳、奥乐齐工程量分类', status: 'active' },
  { label: '水管计算规则', desc: '管件类型全面梳理', status: 'active' },
  { label: '12-04 评审', desc: '三个模块全部在范围', status: 'done' },
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
    <div ref={containerRef} className="max-w-5xl mx-auto px-6 lg:px-8">
      {/* Hero Section */}
      <section className="py-16 lg:py-20 text-center">
        <div className="animate-fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            第二阶段 · 开发准备
          </div>
        </div>

        <h1 className="animate-fade-up text-4xl sm:text-5xl font-bold text-on-surface mb-4 tracking-tight" style={{ animationDelay: '0.1s' }}>
          YBP <span className="font-normal text-on-surface-variant">族库管理系统</span>
        </h1>

        <p className="animate-fade-up text-lg text-on-surface-variant max-w-xl mx-auto mb-8" style={{ animationDelay: '0.2s' }}>
          建模即算量 · BIM 智能清单匹配与工程量计算
        </p>

        <div className="animate-fade-up flex flex-wrap gap-4 justify-center" style={{ animationDelay: '0.3s' }}>
          <Link to="/logic" className="btn btn-primary">
            业务逻辑
          </Link>
          <Link to="/issues" className="btn btn-secondary">
            问题追踪
          </Link>
        </div>
      </section>

      {/* 核心概念 */}
      <section className="py-10 animate-on-scroll">
        <div className="flex flex-wrap items-center justify-center gap-3 lg:gap-6">
          {coreNodes.map((node, index) => (
            <div key={node.id} className="flex items-center gap-3 lg:gap-6">
              <div className="text-center">
                <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br ${node.color} flex flex-col items-center justify-center hover-lift cursor-pointer`}>
                  <span className="text-xl sm:text-2xl font-bold text-white">{node.label}</span>
                  <span className="text-xs text-white/70">{node.sub}</span>
                </div>
              </div>

              {index < coreNodes.length - 1 && (
                <svg className="w-6 h-6 text-outline hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 项目阶段 */}
      <section className="py-12 animate-on-scroll">
        <div className="bg-surface-bright/30 rounded-2xl p-6 sm:p-8 border border-outline-variant/30">
          <h2 className="text-sm font-semibold text-primary uppercase tracking-wider mb-6 text-center">
            项目阶段
          </h2>

          <div className="flex justify-between items-center max-w-md mx-auto relative">
            <div className="absolute top-3 left-0 right-0 h-0.5 bg-outline-variant/50" />
            <div className="absolute top-3 left-0 h-0.5 bg-primary transition-all duration-500" style={{ width: '50%' }} />

            {phases.map((p, i) => (
              <div key={i} className="flex flex-col items-center relative z-10">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  p.done
                    ? 'bg-primary border-primary'
                    : p.current
                    ? 'bg-surface border-primary'
                    : 'bg-surface border-outline-variant'
                }`}>
                  {p.done && (
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                  {p.current && <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />}
                </div>
                <span className={`mt-2 text-sm font-medium ${p.done || p.current ? 'text-on-surface' : 'text-on-surface-variant'}`}>
                  {p.label}
                </span>
                <span className="text-xs text-on-surface-variant">{p.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 当前工作重点 */}
      <section className="py-12 pb-20 animate-on-scroll">
        <h2 className="text-sm font-semibold text-primary uppercase tracking-wider mb-6 text-center">
          当前重点
        </h2>

        <div className="grid sm:grid-cols-3 gap-4">
          {currentFocus.map((item) => (
            <div
              key={item.label}
              className="bg-surface-bright/30 rounded-2xl p-5 border border-outline-variant/30"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className={`w-2 h-2 rounded-full ${item.status === 'active' ? 'bg-primary animate-pulse' : item.status === 'done' ? 'bg-emerald-500' : 'bg-on-surface-variant'}`} />
                <span className="font-medium text-on-surface">{item.label}</span>
              </div>
              <p className="text-sm text-on-surface-variant">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
