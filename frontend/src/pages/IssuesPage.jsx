import { useState, useEffect, useRef } from 'react'

// 问题数据
const issues = [
  {
    id: 'quantity-tech',
    title: '工程量计算技术实现',
    priority: 'P0',
    status: 'discussing',
    tag: '当前重点',
    desc: '需要搞清楚易达工程量计算的技术实现方式',
    problems: [
      '计算在哪执行？Revit 插件端 vs 系统服务器端',
      '规则如何配置？系统端配置界面/方式',
      '规则如何传递？Revit 如何识别/解码配置的规则',
      'Revit API 计算引擎如何调用？',
    ],
    solutions: [
      { label: '方向', desc: '系统配置规则 → Revit 解码 → API 计算引擎 → 输出' },
      { label: '原则', desc: '不要写死，功能解耦' },
    ],
  },
  {
    id: 'curtain-wall',
    title: '幕墙工程量计算',
    priority: 'P0',
    status: 'discussing',
    desc: '幕墙面积计算，是否扣除门的面积？',
    problems: [
      '如何识别幕墙与嵌板的从属关系？',
      '如何实现自动的减法运算？',
      '配置时是否可选择扣除/不扣除？',
    ],
    solutions: [
      { label: 'A', desc: 'Revit 插件导出关联信息' },
      { label: 'B', desc: '系统层面建立父子关系' },
      { label: 'C', desc: '易达定制特殊出量逻辑' },
    ],
  },
  {
    id: 'review-status',
    title: '易达评审进度',
    priority: 'P1',
    status: 'discussing',
    desc: '评审内容和范围待确认',
    problems: [
      '评审的具体内容是什么？',
      '插件开发、系统端、工程量是否在评审范围内？',
      '两部分耦合程度如何？能否并行推进？',
    ],
    solutions: [
      { label: '状态', desc: '排队中，即将评审' },
      { label: '待确认', desc: '需与游工、黄增沛确认范围' },
    ],
  },
  {
    id: 'custom-formula',
    title: '工程量自定义公式',
    priority: 'P1',
    status: 'pending',
    desc: '是否需要支持用户自定义计算公式？',
    problems: [
      '标准计算方式是否能覆盖所有场景？',
      '自定义公式的安全性如何保证？',
    ],
    solutions: [
      { label: 'A', desc: '不支持，特殊需求由易达定制' },
      { label: 'B', desc: '支持简单四则运算' },
    ],
  },
  {
    id: 'vendor-family',
    title: '厂商族参数标准化',
    priority: 'P2',
    status: 'pending',
    desc: '不同厂商的族参数命名不统一',
    problems: [
      '参数名称各异',
      '参数单位不一致',
    ],
    solutions: [
      { label: 'A', desc: '要求厂商按标准模板提供' },
      { label: 'B', desc: '系统支持参数映射配置' },
    ],
  },
  {
    id: 'multi-condition',
    title: '多条件匹配优先级',
    priority: 'P2',
    status: 'resolved',
    desc: '多个清单条件都匹配时选哪个？',
    resolution: '按清单配置顺序匹配，第一个成功的生效。UI 提供拖拽排序。',
  },
]

const statusConfig = {
  pending: {
    label: '待讨论',
    gradient: 'from-amber-500 to-orange-500',
    bg: 'bg-amber-500/10',
    text: 'text-amber-400',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  discussing: {
    label: '讨论中',
    gradient: 'from-blue-500 to-indigo-500',
    bg: 'bg-blue-500/10',
    text: 'text-blue-400',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
  resolved: {
    label: '已解决',
    gradient: 'from-emerald-500 to-teal-500',
    bg: 'bg-emerald-500/10',
    text: 'text-emerald-400',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
}

const priorityConfig = {
  P0: { label: 'P0', color: 'text-red-400', bg: 'bg-red-500/10' },
  P1: { label: 'P1', color: 'text-amber-400', bg: 'bg-amber-500/10' },
  P2: { label: 'P2', color: 'text-on-surface-variant', bg: 'bg-surface-bright/50' },
}

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

export default function IssuesPage() {
  const [expandedIssue, setExpandedIssue] = useState(null)
  const [filter, setFilter] = useState('all')
  const containerRef = useScrollAnimation()

  const filteredIssues = filter === 'all'
    ? issues
    : issues.filter(i => i.status === filter)

  const counts = {
    all: issues.length,
    pending: issues.filter(i => i.status === 'pending').length,
    discussing: issues.filter(i => i.status === 'discussing').length,
    resolved: issues.filter(i => i.status === 'resolved').length,
  }

  return (
    <div ref={containerRef} className="max-w-6xl mx-auto px-6 lg:px-8 py-12">
      {/* 页面标题 */}
      <section className="text-center mb-16 animate-fade-up">
        <h1 className="text-4xl sm:text-5xl font-bold text-on-surface mb-4">
          问题追踪
        </h1>
        <p className="text-lg text-on-surface-variant max-w-2xl mx-auto">
          待讨论与已解决的技术问题
        </p>
      </section>

      {/* 统计卡片 */}
      <section className="mb-12 animate-on-scroll">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { key: 'all', label: '全部问题', gradient: 'from-gray-500 to-gray-600' },
            { key: 'pending', label: '待讨论', gradient: 'from-amber-500 to-orange-500' },
            { key: 'discussing', label: '讨论中', gradient: 'from-blue-500 to-indigo-500' },
            { key: 'resolved', label: '已解决', gradient: 'from-emerald-500 to-teal-500' },
          ].map((stat) => (
            <button
              key={stat.key}
              onClick={() => setFilter(stat.key)}
              className={`group relative bg-surface-bright/30 rounded-2xl p-5 border transition-all duration-300 hover-lift ${
                filter === stat.key
                  ? 'border-primary/50 ring-2 ring-primary/20'
                  : 'border-outline-variant/30 hover:border-primary/30'
              }`}
            >
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center mb-3`}>
                <span className="text-white font-bold text-lg">{counts[stat.key]}</span>
              </div>
              <p className={`text-sm font-medium ${
                filter === stat.key ? 'text-primary' : 'text-on-surface-variant'
              }`}>
                {stat.label}
              </p>
            </button>
          ))}
        </div>
      </section>

      {/* 问题列表 */}
      <section className="animate-on-scroll">
        <div className="text-center mb-8">
          <h2 className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
            Issue List
          </h2>
          <p className="text-2xl sm:text-3xl font-bold text-on-surface">
            {filter === 'all' ? '所有问题' : statusConfig[filter]?.label || '筛选结果'}
          </p>
        </div>

        <div className="space-y-4">
          {filteredIssues.map((issue, index) => (
            <div
              key={issue.id}
              className="bg-surface-bright/30 rounded-3xl border border-outline-variant/30 overflow-hidden transition-all duration-300 hover:border-primary/30"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* 问题头部 */}
              <button
                onClick={() => setExpandedIssue(expandedIssue === issue.id ? null : issue.id)}
                className="w-full p-6 text-left hover:bg-surface-bright/50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {/* 状态图标 */}
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${statusConfig[issue.status].gradient} flex items-center justify-center text-white`}>
                      {statusConfig[issue.status].icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1 flex-wrap">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${priorityConfig[issue.priority].bg} ${priorityConfig[issue.priority].color}`}>
                          {issue.priority}
                        </span>
                        {issue.tag && (
                          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-primary/20 text-primary">
                            {issue.tag}
                          </span>
                        )}
                        <h3 className="text-lg font-semibold text-on-surface">{issue.title}</h3>
                      </div>
                      <p className="text-sm text-on-surface-variant">{issue.desc}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`hidden sm:inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full ${statusConfig[issue.status].bg} ${statusConfig[issue.status].text}`}>
                      {statusConfig[issue.status].icon}
                      {statusConfig[issue.status].label}
                    </span>
                    <svg
                      className={`w-5 h-5 text-on-surface-variant transition-transform duration-300 ${
                        expandedIssue === issue.id ? 'rotate-180' : ''
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

              {/* 问题详情 */}
              <div className={`overflow-hidden transition-all duration-300 ${
                expandedIssue === issue.id ? 'max-h-[500px]' : 'max-h-0'
              }`}>
                <div className="border-t border-outline-variant/30 p-6 bg-surface-dim/30">
                  {issue.status === 'resolved' ? (
                    // 已解决：显示解决方案
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">
                          解决方案
                        </h4>
                        <p className="text-on-surface-variant bg-surface-bright/50 p-4 rounded-xl">
                          {issue.resolution}
                        </p>
                      </div>
                    </div>
                  ) : (
                    // 未解决：显示问题和候选方案
                    <div className="grid sm:grid-cols-2 gap-8">
                      <div>
                        <h4 className="text-xs font-semibold text-primary uppercase tracking-wider mb-4">
                          问题点
                        </h4>
                        <ul className="space-y-3">
                          {issue.problems.map((p, i) => (
                            <li key={i} className="flex items-start gap-3 text-on-surface-variant">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 flex-shrink-0" />
                              <span>{p}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-primary uppercase tracking-wider mb-4">
                          候选方案
                        </h4>
                        <div className="space-y-3">
                          {issue.solutions.map((s) => (
                            <div key={s.label} className="bg-surface-bright/50 rounded-xl p-4 hover:bg-surface-bright/70 transition-colors">
                              <div className="flex items-center gap-3">
                                <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center text-primary font-bold text-sm">
                                  {s.label}
                                </span>
                                <span className="text-on-surface-variant">{s.desc}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 空状态 */}
        {filteredIssues.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-3xl bg-surface-bright/50 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-on-surface-variant" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="text-on-surface-variant">暂无 {statusConfig[filter]?.label} 的问题</p>
          </div>
        )}
      </section>
    </div>
  )
}
