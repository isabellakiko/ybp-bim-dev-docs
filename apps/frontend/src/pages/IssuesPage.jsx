/**
 * YBP 问题追踪页
 */

import { useState } from 'react'

// 问题数据
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
  pending: { label: '待讨论', color: 'badge-amber' },
  discussing: { label: '讨论中', color: 'badge-blue' },
  resolved: { label: '已解决', color: 'badge-green' },
}

const priorityConfig = {
  P0: { label: 'P0', color: 'badge-red' },
  P1: { label: 'P1', color: 'badge-amber' },
  P2: { label: 'P2', color: 'bg-bg-active text-text-secondary' },
}

export default function IssuesPage() {
  const [filter, setFilter] = useState('all')

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
    <div className="space-y-6">
      {/* 统计卡片 */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { key: 'all', label: '全部问题', count: counts.all, color: 'text-text-primary' },
          { key: 'resolved', label: '已解决', count: counts.resolved, color: 'text-accent-green' },
          { key: 'discussing', label: '讨论中', count: counts.discussing, color: 'text-accent-blue' },
          { key: 'pending', label: '待讨论', count: counts.pending, color: 'text-accent-amber' },
        ].map((stat) => (
          <button
            key={stat.key}
            onClick={() => setFilter(stat.key)}
            className={`card p-4 text-left transition-all ${
              filter === stat.key ? 'border-accent-blue ring-1 ring-accent-blue/20' : ''
            }`}
          >
            <div className={`text-2xl font-bold font-mono ${stat.color}`}>{stat.count}</div>
            <div className="text-sm text-text-secondary">{stat.label}</div>
          </button>
        ))}
      </section>

      {/* 筛选标签 */}
      <section className="flex gap-2 flex-wrap">
        {[
          { key: 'all', label: '全部' },
          { key: 'discussing', label: '讨论中' },
          { key: 'pending', label: '待讨论' },
          { key: 'resolved', label: '已解决' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              filter === tab.key
                ? 'bg-accent-blue text-white'
                : 'bg-bg-elevated text-text-secondary hover:text-text-primary hover:bg-bg-hover'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </section>

      {/* 问题列表 */}
      <section className="space-y-3">
        {filteredIssues.map((issue, i) => (
          <div
            key={issue.id}
            className="card p-5 animate-fade-up"
            style={{ animationDelay: `${i * 0.03}s` }}
          >
            <div className="flex items-start gap-4">
              {/* 状态指示器 */}
              <div className={`status-dot mt-2 ${
                issue.status === 'resolved' ? 'success' :
                issue.status === 'discussing' ? 'info' : 'warning'
              }`} />

              <div className="flex-1 min-w-0">
                {/* 标题行 */}
                <div className="flex items-center gap-2 flex-wrap mb-2">
                  <span className={`badge ${priorityConfig[issue.priority].color}`}>
                    {issue.priority}
                  </span>
                  <span className={`badge ${statusConfig[issue.status].color}`}>
                    {statusConfig[issue.status].label}
                  </span>
                  <h3 className="font-medium">{issue.title}</h3>
                </div>

                {/* 描述 */}
                <p className="text-sm text-text-secondary mb-3">{issue.desc}</p>

                {/* 标签 */}
                <div className="flex flex-wrap gap-2">
                  {issue.items.map((item, j) => (
                    <span
                      key={j}
                      className="text-xs bg-bg-active text-text-tertiary px-2 py-1 rounded"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* 空状态 */}
        {filteredIssues.length === 0 && (
          <div className="card p-12 text-center">
            <div className="text-4xl mb-3">🎉</div>
            <p className="text-text-secondary">
              暂无{statusConfig[filter]?.label}的问题
            </p>
          </div>
        )}
      </section>
    </div>
  )
}
