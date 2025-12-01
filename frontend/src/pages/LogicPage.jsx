import { useState, useEffect, useRef } from 'react'

// 4种匹配规则
const matchTypes = [
  {
    id: 'unconditional',
    name: '无条件匹配',
    desc: '所有族实例都带出该清单',
    example: '排风扇 → 电源清单',
    gradient: 'from-emerald-500 to-teal-500',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
      </svg>
    ),
  },
  {
    id: 'exact',
    name: '精确值匹配',
    desc: '参数值完全相等时匹配',
    example: '风量 = 3000',
    gradient: 'from-blue-500 to-indigo-500',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    id: 'range',
    name: '区间匹配',
    desc: '参数值在指定范围内匹配',
    example: '2000 ≤ 风量 < 4000',
    gradient: 'from-amber-500 to-orange-500',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
    ),
  },
  {
    id: 'multi',
    name: '多参数 AND',
    desc: '多个条件同时满足才匹配',
    example: '材质=灰砖 AND 品牌=琛雄',
    gradient: 'from-purple-500 to-pink-500',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z" />
      </svg>
    ),
  },
]

// 3个典型案例
const cases = [
  {
    id: 'fresh-air-fan',
    name: '新风机',
    type: '自建族',
    match: '精确值匹配',
    quantity: '计数（台）',
    gradient: 'from-blue-500 to-cyan-500',
    desc: '最简单场景：一个品目、多个类型、精确匹配',
    detail: {
      param: '风量（M³/H）',
      types: ['3000M³/H', '5000M³/H', '7000M³/H'],
      bills: [
        { name: '新风机3000M³/H', condition: '风量 = 3000' },
        { name: '新风机5000M³/H', condition: '风量 = 5000' },
        { name: '新风机7000M³/H', condition: '风量 = 7000' },
      ],
    },
  },
  {
    id: 'mcd-fan',
    name: 'MCD-新风机',
    type: '自建族',
    match: '区间匹配',
    quantity: '计数（台）',
    gradient: 'from-amber-500 to-orange-500',
    desc: '展示区间匹配：参数区间判断、一对多清单',
    detail: {
      param: '风量（实例参数）',
      types: ['默认（只需一个）'],
      bills: [
        { name: '供应...4000CMH及以上', condition: '风量 ≥ 4000' },
        { name: '供应...2000-4000CMH', condition: '2000 ≤ 风量 < 4000' },
        { name: '供应...2000CMH及以下', condition: '风量 < 2000' },
        { name: '电源', condition: '无条件' },
      ],
    },
  },
  {
    id: 'floor-slab',
    name: '楼板',
    type: '系统族',
    match: '多参数 AND',
    quantity: '面积汇总（m²）',
    gradient: 'from-purple-500 to-pink-500',
    desc: '展示多参数 AND 匹配：材质 + 品牌',
    detail: {
      param: '结构材质 + 品牌',
      types: ['MCD-厨房灰色砖'],
      bills: [
        { name: '灰色砖地面（琛雄）', condition: '材质=厨房灰色砖 AND 品牌=琛雄' },
        { name: '灰色砖地面（共荣）', condition: '材质=厨房灰色砖 AND 品牌=共荣' },
        { name: '灰色砖地面（冠军）', condition: '材质=厨房灰色砖 AND 品牌=冠军' },
      ],
    },
  },
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
  const [expandedCase, setExpandedCase] = useState(null)
  const containerRef = useScrollAnimation()

  return (
    <div ref={containerRef} className="max-w-6xl mx-auto px-6 lg:px-8 py-12">
      {/* 页面标题 */}
      <section className="text-center mb-16 animate-fade-up">
        <h1 className="text-4xl sm:text-5xl font-bold text-on-surface mb-4">
          业务逻辑
        </h1>
        <p className="text-lg text-on-surface-variant max-w-2xl mx-auto">
          清单匹配规则与典型案例
        </p>
      </section>

      {/* 匹配规则 */}
      <section className="mb-20 animate-on-scroll">
        <div className="text-center mb-12">
          <h2 className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
            Match Rules
          </h2>
          <p className="text-2xl sm:text-3xl font-bold text-on-surface">
            四种匹配规则
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {matchTypes.map((type, index) => (
            <div
              key={type.id}
              className="group bg-surface-bright/30 rounded-3xl p-6 border border-outline-variant/30 hover:border-primary/50 transition-all duration-300 hover-lift"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${type.gradient} flex items-center justify-center mb-4 text-white`}>
                {type.icon}
              </div>
              <h3 className="text-lg font-semibold text-on-surface mb-2">
                {type.name}
              </h3>
              <p className="text-on-surface-variant mb-3">
                {type.desc}
              </p>
              <code className="text-sm text-primary bg-primary/10 px-3 py-1.5 rounded-full">
                {type.example}
              </code>
            </div>
          ))}
        </div>
      </section>

      {/* 典型案例 */}
      <section className="animate-on-scroll">
        <div className="text-center mb-12">
          <h2 className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
            Use Cases
          </h2>
          <p className="text-2xl sm:text-3xl font-bold text-on-surface">
            典型案例
          </p>
        </div>

        <div className="space-y-4">
          {cases.map((c) => (
            <div
              key={c.id}
              className="bg-surface-bright/30 rounded-3xl border border-outline-variant/30 overflow-hidden transition-all duration-300"
            >
              {/* 案例头部 */}
              <button
                onClick={() => setExpandedCase(expandedCase === c.id ? null : c.id)}
                className="w-full p-6 text-left hover:bg-surface-bright/50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${c.gradient} flex items-center justify-center text-white font-bold`}>
                      {c.name.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-lg font-semibold text-on-surface">{c.name}</h3>
                        <span className="text-xs text-on-surface-variant bg-surface-bright px-2 py-1 rounded-full">
                          {c.type}
                        </span>
                      </div>
                      <p className="text-sm text-on-surface-variant">{c.desc}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="hidden sm:flex gap-4 text-xs text-on-surface-variant">
                      <span className="bg-surface-bright px-3 py-1 rounded-full">{c.match}</span>
                      <span className="bg-surface-bright px-3 py-1 rounded-full">{c.quantity}</span>
                    </div>
                    <svg
                      className={`w-5 h-5 text-on-surface-variant transition-transform duration-300 ${
                        expandedCase === c.id ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </button>

              {/* 案例详情 */}
              <div className={`overflow-hidden transition-all duration-300 ${
                expandedCase === c.id ? 'max-h-[500px]' : 'max-h-0'
              }`}>
                <div className="border-t border-outline-variant/30 p-6 bg-surface-dim/30">
                  <div className="grid sm:grid-cols-2 gap-8">
                    {/* 参数与类型 */}
                    <div>
                      <h4 className="text-xs font-semibold text-primary uppercase tracking-wider mb-4">
                        构件属性
                      </h4>
                      <p className="text-on-surface-variant mb-6 bg-surface-bright/50 p-3 rounded-xl">
                        {c.detail.param}
                      </p>

                      <h4 className="text-xs font-semibold text-primary uppercase tracking-wider mb-4">
                        品目类型
                      </h4>
                      <ul className="space-y-2">
                        {c.detail.types.map((t, i) => (
                          <li key={i} className="text-on-surface-variant flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                            {t}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* 清单匹配 */}
                    <div>
                      <h4 className="text-xs font-semibold text-primary uppercase tracking-wider mb-4">
                        清单匹配
                      </h4>
                      <div className="space-y-3">
                        {c.detail.bills.map((b, i) => (
                          <div key={i} className="bg-surface-bright/50 rounded-xl p-4">
                            <p className="text-on-surface font-medium mb-1">{b.name}</p>
                            <code className="text-sm text-primary">{b.condition}</code>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
