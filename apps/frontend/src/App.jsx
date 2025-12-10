import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import ScrollToTop from './components/ScrollToTop'
import HomePage from './pages/HomePage'
import LogicPage from './pages/LogicPage'
import IssuesPage from './pages/IssuesPage'

// 工程量梳理占位页面
function QuantityPage({ title, desc }) {
  return (
    <div className="space-y-6">
      <div className="card p-8 text-center">
        <div className="text-4xl mb-4">🚧</div>
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="text-text-secondary">{desc}</p>
        <p className="text-sm text-text-tertiary mt-4">12月核心任务 · 待数据完善</p>
      </div>
    </div>
  )
}

function App() {
  return (
    <Layout>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/logic" element={<LogicPage />} />
        <Route path="/issues" element={<IssuesPage />} />

        {/* 工程量梳理 - 占位路由 */}
        <Route
          path="/quantity"
          element={<QuantityPage title="工程量梳理" desc="业主清单与计算规则配置" />}
        />
        <Route
          path="/quantity/owner"
          element={<QuantityPage title="业主清单" desc="麦当劳、奥乐齐清单工程量分类" />}
        />
        <Route
          path="/quantity/pipe"
          element={<QuantityPage title="水管系统" desc="水管管件计算规则全面梳理" />}
        />
        <Route
          path="/quantity/duct"
          element={<QuantityPage title="风管系统" desc="风管及配件计算规则" />}
        />
      </Routes>
    </Layout>
  )
}

export default App
