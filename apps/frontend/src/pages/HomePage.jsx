/**
 * YBP 首页 - 仪表盘风格概览
 */

import { Link } from 'react-router-dom'

// 统计数据
const stats = [
  { label: '族库总数', value: '1,247', change: '+12%', trend: 'up', icon: '📦' },
  { label: '清单匹配率', value: '94.2%', change: '+3.1%', trend: 'up', icon: '🎯' },
  { label: '本月计算量', value: '28,450', change: '+18%', trend: 'up', icon: '📊' },
  { label: '待处理问题', value: '3', change: '-2', trend: 'down', icon: '🔔' },
]

// 核心概念流程
const coreFlow = [
  { label: '族', sub: 'Family', color: 'bg-accent-blue' },
  { label: '品目', sub: 'Item', color: 'bg-accent-purple' },
  { label: '清单', sub: 'Bill', color: 'bg-accent-green' },
  { label: '工程量', sub: 'Quantity', color: 'bg-accent-amber' },
]

// 快速入口
const quickLinks = [
  { label: '清单匹配规则', desc: '5 种匹配方式', icon: '🔗', color: 'blue', path: '/logic' },
  { label: '工程量计算', desc: '4 种计算类型', icon: '🧮', color: 'green', path: '/logic' },
  { label: '业主清单梳理', desc: '麦当劳 / 奥乐齐', icon: '📋', color: 'amber', path: '/quantity/owner' },
  { label: '水管计算规则', desc: '12月核心任务', icon: '🔧', color: 'purple', path: '/quantity/pipe' },
]

// 最近活动
const recentActivities = [
  { type: 'upload', title: '上传新族文件', desc: '风机盘管_标准型.rfa', time: '10 分钟前', status: 'success' },
  { type: 'match', title: '清单匹配完成', desc: '麦当劳-浦东店 / 127 条清单', time: '1 小时前', status: 'success' },
  { type: 'calc', title: '工程量计算', desc: '水管系统 / 3,450 m', time: '2 小时前', status: 'success' },
  { type: 'issue', title: '新问题待讨论', desc: '变径管件计算规则确认', time: '3 小时前', status: 'warning' },
]

// 项目阶段
const phases = [
  { label: '原型评审', date: '2025.11', done: true },
  { label: '开发准备', date: '2025.12', current: true },
  { label: '正式开发', date: '待定', done: false },
]

export default function HomePage() {
  return (
    <div className="space-y-6">
      {/* 统计卡片 */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className="card p-5 flex items-start gap-4 animate-fade-up"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <div className="w-12 h-12 rounded-xl bg-bg-active flex items-center justify-center text-2xl">
              {stat.icon}
            </div>
            <div className="flex-1">
              <div className="text-2xl font-bold font-mono">{stat.value}</div>
              <div className="text-sm text-text-secondary">{stat.label}</div>
            </div>
            <span className={`badge ${stat.trend === 'up' ? 'badge-green' : 'badge-red'}`}>
              {stat.change}
            </span>
          </div>
        ))}
      </section>

      {/* 双栏布局 */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* 快速入口 */}
        <section className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">快速入口</h2>
            <Link to="/logic" className="text-sm text-text-link hover:underline">
              查看全部
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {quickLinks.map((link) => (
              <Link
                key={link.label}
                to={link.path}
                className="flex items-center gap-3 p-4 rounded-xl bg-bg-hover/50 hover:bg-bg-hover border border-transparent hover:border-border transition-all group"
              >
                <span className="text-xl">{link.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{link.label}</div>
                  <div className="text-xs text-text-tertiary truncate">{link.desc}</div>
                </div>
                <svg className="w-4 h-4 text-text-tertiary group-hover:text-text-secondary group-hover:translate-x-1 transition-all" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </Link>
            ))}
          </div>
        </section>

        {/* 最近活动 */}
        <section className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">最近活动</h2>
            <button className="text-sm text-text-link hover:underline">全部记录</button>
          </div>
          <div className="space-y-1">
            {recentActivities.map((activity, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-bg-hover/50 transition-colors animate-fade-up"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <div className={`status-dot ${activity.status}`} />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium">{activity.title}</div>
                  <div className="text-xs text-text-tertiary truncate">{activity.desc}</div>
                </div>
                <span className="text-xs text-text-tertiary whitespace-nowrap">{activity.time}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* 核心流程 */}
      <section className="card p-6">
        <h2 className="font-semibold mb-4">核心流程</h2>
        <div className="flex items-center justify-center gap-2 sm:gap-4 py-4">
          {coreFlow.map((node, i) => (
            <div key={node.label} className="flex items-center gap-2 sm:gap-4">
              <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl ${node.color} flex flex-col items-center justify-center cursor-pointer hover:scale-105 hover:shadow-lg transition-all`}>
                <span className="text-lg sm:text-xl font-bold text-white">{node.label}</span>
                <span className="text-[10px] sm:text-xs text-white/70">{node.sub}</span>
              </div>
              {i < coreFlow.length - 1 && (
                <svg className="w-5 h-5 text-text-tertiary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              )}
            </div>
          ))}
        </div>
        <p className="text-center text-sm text-text-secondary mt-2">
          建模即算量 · BIM 智能清单匹配与工程量计算
        </p>
      </section>

      {/* 项目进度 */}
      <section className="card p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-semibold">项目阶段</h2>
          <span className="badge badge-blue">第二阶段 · 开发准备</span>
        </div>
        <div className="flex items-center justify-between max-w-lg mx-auto relative">
          {/* 进度条背景 */}
          <div className="absolute top-4 left-0 right-0 h-0.5 bg-border" />
          {/* 进度条 */}
          <div className="absolute top-4 left-0 h-0.5 bg-accent-green transition-all duration-500" style={{ width: '50%' }} />

          {phases.map((phase) => (
            <div key={phase.label} className="flex flex-col items-center relative z-10">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${
                phase.done
                  ? 'bg-accent-green border-accent-green text-white'
                  : phase.current
                  ? 'bg-bg-surface border-accent-blue'
                  : 'bg-bg-surface border-border'
              }`}>
                {phase.done ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                ) : phase.current ? (
                  <div className="w-2.5 h-2.5 rounded-full bg-accent-blue animate-pulse" />
                ) : null}
              </div>
              <span className={`mt-2 text-sm font-medium ${phase.done || phase.current ? 'text-text-primary' : 'text-text-tertiary'}`}>
                {phase.label}
              </span>
              <span className="text-xs text-text-tertiary">{phase.date}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
