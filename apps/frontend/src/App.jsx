import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import ScrollToTop from './components/ScrollToTop'
import HomePage from './pages/HomePage'
import LogicPage from './pages/LogicPage'
import IssuesPage from './pages/IssuesPage'

function App() {
  return (
    <Layout>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/logic" element={<LogicPage />} />
        <Route path="/issues" element={<IssuesPage />} />
      </Routes>
    </Layout>
  )
}

export default App
