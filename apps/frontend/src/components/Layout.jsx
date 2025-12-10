/**
 * YBP 新布局组件 - 侧边导航 + 主内容区
 */

import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

// 导航配置
const navItems = [
  {
    id: 'home',
    path: '/',
    label: '概览',
    icon: OverviewIcon,
  },
  {
    id: 'logic',
    path: '/logic',
    label: '业务逻辑',
    icon: LogicIcon,
  },
  {
    id: 'quantity',
    path: '/quantity',
    label: '工程量梳理',
    icon: QuantityIcon,
    badge: 'NEW',
    children: [
      { path: '/quantity/owner', label: '业主清单' },
      { path: '/quantity/pipe', label: '水管系统' },
      { path: '/quantity/duct', label: '风管系统' },
    ],
  },
  {
    id: 'issues',
    path: '/issues',
    label: '问题追踪',
    icon: IssuesIcon,
    badge: '3',
  },
]

// 图标组件
function OverviewIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  )
}

function LogicIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2v-4M9 21H5a2 2 0 0 1-2-2v-4m0-6v6" />
    </svg>
  )
}

function QuantityIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 3v18h18" />
      <path d="M7 16l4-8 4 5 5-9" />
    </svg>
  )
}

function IssuesIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v4M12 16h.01" />
    </svg>
  )
}

function ChevronIcon({ className, direction = 'right' }) {
  const rotation = {
    right: '',
    down: 'rotate-90',
    left: 'rotate-180',
    up: '-rotate-90',
  }
  return (
    <svg className={`${className} ${rotation[direction]} transition-transform duration-200`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 18l6-6-6-6" />
    </svg>
  )
}

function MenuIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  )
}

function SearchIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21l-4.35-4.35" />
    </svg>
  )
}

function BellIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  )
}

// 获取当前页面标题
function getPageTitle(pathname) {
  if (pathname === '/') return '概览'
  if (pathname.startsWith('/logic')) return '业务逻辑'
  if (pathname.startsWith('/quantity')) return '工程量梳理'
  if (pathname.startsWith('/issues')) return '问题追踪'
  return '概览'
}

export default function Layout({ children }) {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [expandedNav, setExpandedNav] = useState('quantity')
  const location = useLocation()

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  const toggleNav = (id) => {
    setExpandedNav(expandedNav === id ? '' : id)
  }

  return (
    <div className="app-layout">
      {/* 移动端遮罩 */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* 侧边栏 */}
      <aside className={`sidebar ${collapsed ? 'collapsed' : ''} ${mobileOpen ? 'open' : ''}`}>
        {/* Logo */}
        <div className="h-16 px-4 flex items-center justify-between border-b border-border-muted">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent-blue to-accent-purple flex items-center justify-center font-bold text-lg text-white">
              Y
            </div>
            {!collapsed && (
              <span className="font-bold text-xl tracking-tight">YBP</span>
            )}
          </div>
          <button
            className="btn-ghost rounded-lg hidden md:flex"
            onClick={() => setCollapsed(!collapsed)}
          >
            <ChevronIcon className="w-4 h-4" direction={collapsed ? 'right' : 'left'} />
          </button>
        </div>

        {/* 导航 */}
        <nav className="flex-1 p-3 overflow-y-auto">
          {navItems.map((item) => (
            <div key={item.id} className="mb-1">
              {item.children ? (
                // 带子菜单的导航项
                <>
                  <button
                    onClick={() => toggleNav(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-text-secondary hover:text-text-primary hover:bg-bg-hover transition-colors ${
                      isActive(item.path) ? 'bg-bg-active text-text-primary' : ''
                    }`}
                  >
                    <item.icon className="w-5 h-5 flex-shrink-0" />
                    {!collapsed && (
                      <>
                        <span className="flex-1 text-left text-sm font-medium">{item.label}</span>
                        {item.badge && (
                          <span className={`badge ${item.badge === 'NEW' ? 'badge-purple' : 'badge-blue'}`}>
                            {item.badge}
                          </span>
                        )}
                        <ChevronIcon
                          className="w-4 h-4"
                          direction={expandedNav === item.id ? 'down' : 'right'}
                        />
                      </>
                    )}
                  </button>
                  {/* 子菜单 */}
                  {expandedNav === item.id && !collapsed && (
                    <div className="ml-8 mt-1 space-y-1">
                      {item.children.map((child) => (
                        <NavLink
                          key={child.path}
                          to={child.path}
                          onClick={() => setMobileOpen(false)}
                          className={({ isActive }) =>
                            `block px-3 py-2 rounded-md text-sm transition-colors ${
                              isActive
                                ? 'text-text-primary bg-bg-hover'
                                : 'text-text-tertiary hover:text-text-primary hover:bg-bg-hover'
                            }`
                          }
                        >
                          {child.label}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                // 普通导航项
                <NavLink
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-bg-active text-text-primary'
                        : 'text-text-secondary hover:text-text-primary hover:bg-bg-hover'
                    }`
                  }
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  {!collapsed && (
                    <>
                      <span className="flex-1 text-sm font-medium">{item.label}</span>
                      {item.badge && (
                        <span className={`badge ${item.badge === 'NEW' ? 'badge-purple' : 'badge-blue'}`}>
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </NavLink>
              )}
            </div>
          ))}
        </nav>

        {/* 底部用户信息 */}
        {!collapsed && (
          <div className="p-4 border-t border-border-muted">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-accent-green to-accent-blue flex items-center justify-center font-semibold text-sm">
                S
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium">Stephen</span>
                <span className="text-xs text-text-tertiary">管理员</span>
              </div>
            </div>
          </div>
        )}
      </aside>

      {/* 主内容区 */}
      <div className={`main-content ${collapsed ? 'ml-[72px]' : ''}`}>
        {/* 顶部栏 */}
        <header className="h-16 px-6 flex items-center justify-between border-b border-border-muted sticky top-0 z-50" style={{ backgroundColor: '#161b22' }}>
          <div className="flex items-center gap-4">
            {/* 移动端菜单按钮 */}
            <button
              className="btn-ghost rounded-lg md:hidden"
              onClick={() => setMobileOpen(true)}
            >
              <MenuIcon className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-lg font-semibold">{getPageTitle(location.pathname)}</h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="btn-ghost rounded-lg p-2.5 border border-border-muted">
              <SearchIcon className="w-5 h-5" />
            </button>
            <button className="btn-ghost rounded-lg p-2.5 border border-border-muted relative">
              <BellIcon className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-accent-red rounded-full border-2 border-bg-surface" />
            </button>
          </div>
        </header>

        {/* 页面内容 */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
