import { useEffect, useRef } from 'react'

// 5种匹配规则
const matchTypes = [
  {
    id: 'unconditional',
    name: '无条件匹配',
    desc: '所有族实例都带出该清单',
    example: '排风扇 → 电源清单',
    gradient: 'from-emerald-500 to-teal-500',
  },
  {
    id: 'range',
    name: '单参数区间',
    desc: '参数值落在指定范围内',
    example: '2000 ≤ 风量 < 4000',
    gradient: 'from-amber-500 to-orange-500',
  },
  {
    id: 'exact',
    name: '单参数精确',
    desc: '参数值完全相等时匹配',
    example: '材质 = 灰色砖',
    gradient: 'from-blue-500 to-indigo-500',
  },
  {
    id: 'multi-and',
    name: '多参数 AND',
    desc: '多个条件同时满足',
    example: '材质=灰砖 AND 品牌=琛雄',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    id: 'multi-range',
    name: '多参数区间联合',
    desc: '多参数都做区间判断',
    example: '风量≥4000 AND 功率≥500',
    gradient: 'from-rose-500 to-red-500',
  },
]

// 4种工程量计算
const quantityTypes = [
  { name: '计数', desc: '统计族实例数量', unit: '台/个/套' },
  { name: '参数汇总', desc: '某参数值求和', unit: 'm²/m/m³' },
  { name: '带系数', desc: '基础值 × 系数', unit: '考虑损耗' },
  { name: '跨构件', desc: '涉及多构件运算', unit: '幕墙-嵌板' },
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

export default function LogicPage() {
  const containerRef = useScrollAnimation()

  return (
    <div ref={containerRef} className="max-w-5xl mx-auto px-6 lg:px-8 py-12">
      {/* 页面标题 */}
      <section className="text-center mb-12 animate-fade-up">
        <h1 className="text-3xl sm:text-4xl font-bold text-on-surface mb-3">
          业务逻辑
        </h1>
        <p className="text-on-surface-variant">
          清单匹配规则与工程量计算方式
        </p>
      </section>

      {/* 核心流程 */}
      <section className="mb-12 animate-on-scroll">
        <div className="bg-surface-bright/30 rounded-2xl p-6 border border-outline-variant/30">
          <div className="flex flex-wrap items-center justify-center gap-2 text-sm">
            <span className="px-3 py-1.5 bg-blue-500/20 text-blue-400 rounded-lg">族上传</span>
            <span className="text-on-surface-variant">→</span>
            <span className="px-3 py-1.5 bg-purple-500/20 text-purple-400 rounded-lg">品目配置</span>
            <span className="text-on-surface-variant">→</span>
            <span className="px-3 py-1.5 bg-emerald-500/20 text-emerald-400 rounded-lg">清单匹配</span>
            <span className="text-on-surface-variant">→</span>
            <span className="px-3 py-1.5 bg-amber-500/20 text-amber-400 rounded-lg">工程量计算</span>
          </div>
        </div>
      </section>

      {/* 清单匹配规则 */}
      <section className="mb-16 animate-on-scroll">
        <h2 className="text-sm font-semibold text-primary uppercase tracking-wider mb-6">
          清单匹配（5种方式）
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {matchTypes.map((type) => (
            <div
              key={type.id}
              className="bg-surface-bright/30 rounded-2xl p-5 border border-outline-variant/30 hover:border-primary/30 transition-colors"
            >
              <div className={`w-3 h-3 rounded-full bg-gradient-to-br ${type.gradient} mb-3`} />
              <h3 className="font-medium text-on-surface mb-1">{type.name}</h3>
              <p className="text-sm text-on-surface-variant mb-3">{type.desc}</p>
              <code className="text-xs text-primary bg-primary/10 px-2 py-1 rounded">
                {type.example}
              </code>
            </div>
          ))}
        </div>
      </section>

      {/* 工程量计算 */}
      <section className="animate-on-scroll">
        <h2 className="text-sm font-semibold text-primary uppercase tracking-wider mb-6">
          工程量计算（4种方式）
        </h2>

        <div className="grid sm:grid-cols-2 gap-4">
          {quantityTypes.map((type) => (
            <div
              key={type.name}
              className="bg-surface-bright/30 rounded-2xl p-5 border border-outline-variant/30 flex items-start gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center text-primary font-bold text-sm flex-shrink-0">
                {type.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-medium text-on-surface">{type.name}</h3>
                <p className="text-sm text-on-surface-variant">{type.desc}</p>
                <span className="text-xs text-primary">{type.unit}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
