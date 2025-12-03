import { useState, useEffect, useRef } from 'react'

// 问题追踪（与 02-开发准备 同步，12-03 会议后更新）
const issues = [
  // ===== 已解决 =====
  {
    id: 'review-scope',
    title: '评审范围确认',
    priority: 'P0',
    status: 'resolved',
    desc: '三个模块全部在范围内，12-04 评审',
    items: ['族维护模块 ✓', '插件功能模块 ✓', '系统端清单/工程量 ✓'],
  },
  {
    id: 'plugin-function',
    title: '永麦专用插件功能',
    priority: 'P0',
    status: 'resolved',
    desc: '独立插件，类似功能集成通用插件代码',
    items: ['上传族', '下载族', '导出 BIM 数据包', '工程量计算'],
  },
  {
    id: 'quantity-calc',
    title: '幕墙工程量计算',
    priority: 'P0',
    status: 'resolved',
    desc: '系统端可自定义配置组合基础量',
    items: ['幕墙面积', '门面积', '窗面积', '用户配置公式'],
  },
  {
    id: 'cross-item-match',
    title: '跨品目清单匹配',
    priority: 'P1',
    status: 'resolved',
    desc: '确认支持：用 A 族建模，出 B 清单',
    items: ['台阶侧边（墙→地板）', '天花高差侧边（墙→天花板）'],
  },
  {
    id: 'system-name',
    title: '系统名称细分',
    priority: 'P1',
    status: 'resolved',
    desc: '按"系统名称"属性细分工程量',
    items: ['插件端不难', '系统端品目配置关联', '风管/水管等'],
  },
  // ===== 进行中 =====
  {
    id: 'pipe-calc',
    title: '水管管件计算规则',
    priority: 'P0',
    status: 'discussing',
    desc: '12月核心任务：全面梳理管件计算',
    items: ['直管', '弯头', '三通', '变径', '四通'],
  },
  {
    id: 'owner-bill',
    title: '业主清单梳理',
    priority: 'P0',
    status: 'discussing',
    desc: '麦当劳、奥乐齐清单工程量分类',
    items: ['Revit 自带', '简单计算', '需代码实现'],
  },
  // ===== 待讨论 =====
  {
    id: 'handover',
    title: '人员交接准备',
    priority: 'P2',
    status: 'pending',
    desc: '1月起李昱全面接管 YBP 系统开发',
    items: ['水管计算规则文档', '系统名称应用范围', '业主清单分类表'],
  },
]

const statusConfig = {
  pending: { label: '待讨论', color: 'text-amber-400', bg: 'bg-amber-500/10' },
  discussing: { label: '讨论中', color: 'text-blue-400', bg: 'bg-blue-500/10' },
  resolved: { label: '已解决', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
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
  const [filter, setFilter] = useState('all')
  const containerRef = useScrollAnimation()

  const filteredIssues = filter === 'all'
    ? issues
    : issues.filter(i => i.status === filter)

  const counts = {
    all: issues.length,
    resolved: issues.filter(i => i.status === 'resolved').length,
    discussing: issues.filter(i => i.status === 'discussing').length,
    pending: issues.filter(i => i.status === 'pending').length,
  }

  return (
    <div ref={containerRef} className="max-w-5xl mx-auto px-6 lg:px-8 py-12">
      {/* 页面标题 */}
      <section className="text-center mb-12 animate-fade-up">
        <h1 className="text-3xl sm:text-4xl font-bold text-on-surface mb-3">
          问题追踪
        </h1>
        <p className="text-on-surface-variant">
          12-03 会议结论 · 12-04 评审
        </p>
      </section>

      {/* 筛选 */}
      <section className="mb-8 animate-on-scroll">
        <div className="flex gap-2 justify-center">
          {[
            { key: 'all', label: `全部 (${counts.all})` },
            { key: 'resolved', label: `已解决 (${counts.resolved})` },
            { key: 'discussing', label: `进行中 (${counts.discussing})` },
            { key: 'pending', label: `待讨论 (${counts.pending})` },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                filter === tab.key
                  ? 'bg-primary text-white'
                  : 'bg-surface-bright/30 text-on-surface-variant hover:text-on-surface'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      {/* 问题列表 */}
      <section className="animate-on-scroll">
        <div className="space-y-4">
          {filteredIssues.map((issue) => (
            <div
              key={issue.id}
              className="bg-surface-bright/30 rounded-2xl p-5 border border-outline-variant/30"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded ${priorityConfig[issue.priority].bg} ${priorityConfig[issue.priority].color}`}>
                    {issue.priority}
                  </span>
                  <span className={`text-xs px-2 py-0.5 rounded ${statusConfig[issue.status].bg} ${statusConfig[issue.status].color}`}>
                    {statusConfig[issue.status].label}
                  </span>
                  <h3 className="font-medium text-on-surface">{issue.title}</h3>
                </div>
              </div>

              <p className="text-sm text-on-surface-variant mb-3">{issue.desc}</p>

              <div className="flex flex-wrap gap-2">
                {issue.items.map((item, i) => (
                  <span key={i} className="text-xs bg-surface-dim/50 text-on-surface-variant px-2 py-1 rounded">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {filteredIssues.length === 0 && (
          <div className="text-center py-12 text-on-surface-variant">
            暂无 {statusConfig[filter]?.label} 的问题
          </div>
        )}
      </section>
    </div>
  )
}
