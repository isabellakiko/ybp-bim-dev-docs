import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const navItems = [
  { path: '/', label: '概览' },
  { path: '/logic', label: '业务逻辑' },
  { path: '/issues', label: '问题追踪' },
]

export default function Layout({ children }) {
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  return (
    <div className="min-h-screen relative">
      {/* 背景渐变装饰 */}
      <div className="fixed inset-0 gradient-mesh pointer-events-none" />

      <div className="relative z-10">
        {/* Header - 玻璃效果 */}
        <header className="glass border-b border-outline-variant/50 sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <Link
                to="/"
                className="flex items-center gap-3 hover:opacity-80 transition-opacity"
              >
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <span className="text-surface-dim font-bold text-lg">Y</span>
                </div>
                <div className="hidden sm:block">
                  <span className="text-on-surface font-semibold text-lg">YBP</span>
                  <span className="text-on-surface-variant text-sm ml-2">族库管理系统</span>
                </div>
              </Link>

              {/* Desktop Nav */}
              <nav className="hidden md:flex items-center gap-1">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                      isActive(item.path)
                        ? 'bg-primary/15 text-primary'
                        : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-bright/50'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-2.5 rounded-full text-on-surface-variant hover:text-on-surface hover:bg-surface-bright/50 transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Nav */}
          <div className={`md:hidden overflow-hidden transition-all duration-300 ${
            mobileMenuOpen ? 'max-h-64' : 'max-h-0'
          }`}>
            <nav className="px-4 py-3 border-t border-outline-variant/50">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-2xl text-sm font-medium transition-colors ${
                    isActive(item.path)
                      ? 'bg-primary/15 text-primary'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </header>

        {/* Main */}
        <main className="min-h-[calc(100vh-4rem)]">
          {children}
        </main>

        {/* Footer */}
        <footer className="border-t border-outline-variant/50 mt-auto">
          <div className="max-w-6xl mx-auto px-6 lg:px-8 py-8">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary/50 to-secondary/50 flex items-center justify-center">
                  <span className="text-on-surface font-bold text-sm">Y</span>
                </div>
                <span className="text-on-surface-variant text-sm">YBP 族库管理系统</span>
              </div>
              <p className="text-on-surface-variant/60 text-sm">
                永麦 × 易达 · 2025
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
