import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * ScrollToTop - 页面切换时自动滚动到顶部
 */
export default function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}
