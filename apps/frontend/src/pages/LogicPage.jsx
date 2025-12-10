/**
 * YBP 业务逻辑页 - 清单匹配规则与工程量计算
 */

// 5种匹配规则
const matchTypes = [
  {
    id: 'unconditional',
    name: '无条件匹配',
    desc: '所有族实例都带出该清单',
    example: '排风扇 → 电源清单',
    color: 'green',
  },
  {
    id: 'range',
    name: '单参数区间',
    desc: '参数值落在指定范围内',
    example: '2000 ≤ 风量 < 4000',
    color: 'amber',
  },
  {
    id: 'exact',
    name: '单参数精确',
    desc: '参数值完全相等时匹配',
    example: '材质 = 灰色砖',
    color: 'blue',
  },
  {
    id: 'multi-and',
    name: '多参数 AND',
    desc: '多个条件同时满足',
    example: '材质=灰砖 AND 品牌=琛雄',
    color: 'purple',
  },
  {
    id: 'multi-range',
    name: '多参数区间联合',
    desc: '多参数都做区间判断',
    example: '风量≥4000 AND 功率≥500',
    color: 'red',
  },
]

// 4种工程量计算
const quantityTypes = [
  { name: '计数', desc: '统计族实例数量', unit: '台/个/套', icon: '#' },
  { name: '参数汇总', desc: '某参数值求和', unit: 'm²/m/m³', icon: 'Σ' },
  { name: '带系数', desc: '基础值 × 系数', unit: '考虑损耗', icon: '×' },
  { name: '跨构件', desc: '涉及多构件运算', unit: '幕墙-嵌板', icon: '⊕' },
]

const colorClasses = {
  green: { dot: 'bg-accent-green', badge: 'badge-green' },
  amber: { dot: 'bg-accent-amber', badge: 'badge-amber' },
  blue: { dot: 'bg-accent-blue', badge: 'badge-blue' },
  purple: { dot: 'bg-accent-purple', badge: 'badge-purple' },
  red: { dot: 'bg-accent-red', badge: 'badge-red' },
}

export default function LogicPage() {
  return (
    <div className="space-y-6">
      {/* 核心流程 */}
      <section className="card p-6">
        <h2 className="font-semibold mb-4">核心流程</h2>
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {[
            { label: '族上传', color: 'badge-blue' },
            { label: '品目配置', color: 'badge-purple' },
            { label: '清单匹配', color: 'badge-green' },
            { label: '工程量计算', color: 'badge-amber' },
          ].map((step, i, arr) => (
            <div key={step.label} className="flex items-center gap-2 sm:gap-3">
              <span className={`badge ${step.color} px-3 py-1.5`}>{step.label}</span>
              {i < arr.length - 1 && (
                <svg className="w-4 h-4 text-text-tertiary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 清单匹配规则 */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold">清单匹配规则</h2>
          <span className="badge badge-blue">5 种方式</span>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {matchTypes.map((type, i) => (
            <div
              key={type.id}
              className="card p-5 animate-fade-up"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-3 h-3 rounded-full ${colorClasses[type.color].dot}`} />
                <h3 className="font-medium">{type.name}</h3>
              </div>
              <p className="text-sm text-text-secondary mb-3">{type.desc}</p>
              <code className="text-xs text-accent-blue bg-accent-blue/10 px-2 py-1 rounded block">
                {type.example}
              </code>
            </div>
          ))}
        </div>
      </section>

      {/* 工程量计算 */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold">工程量计算</h2>
          <span className="badge badge-green">4 种方式</span>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {quantityTypes.map((type, i) => (
            <div
              key={type.name}
              className="card p-5 flex items-start gap-4 animate-fade-up"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-blue/20 to-accent-purple/20 flex items-center justify-center text-accent-blue font-bold text-lg flex-shrink-0">
                {type.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-medium mb-1">{type.name}</h3>
                <p className="text-sm text-text-secondary">{type.desc}</p>
                <span className="text-xs text-text-tertiary">{type.unit}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 说明 */}
      <section className="card p-6 border-accent-blue/30">
        <div className="flex gap-3">
          <div className="w-8 h-8 rounded-lg bg-accent-blue/10 flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 text-accent-blue" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4M12 8h.01" />
            </svg>
          </div>
          <div>
            <h3 className="font-medium mb-1">核心理念：建模即算量</h3>
            <p className="text-sm text-text-secondary">
              通过 BIM 模型中的族参数自动匹配清单，并计算工程量。系统支持灵活的匹配规则配置，适应不同业主的清单结构。
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
