/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // YBP 新设计系统 - 温暖深色调
        // 层次清晰，不是纯黑
        bg: {
          base: '#0d1117',      // 最深背景
          surface: '#161b22',   // 侧边栏、卡片背景
          elevated: '#1c2128',  // 悬浮卡片
          hover: '#262c36',     // hover 状态
          active: '#2d333b',    // active 状态
        },
        border: {
          DEFAULT: '#30363d',   // 主边框
          muted: '#21262d',     // 弱边框
          accent: 'rgba(88, 166, 255, 0.4)', // 强调边框
        },
        text: {
          primary: '#e6edf3',   // 主文字
          secondary: '#8b949e', // 次要文字
          tertiary: '#6e7681',  // 最弱文字
          link: '#58a6ff',      // 链接
        },
        accent: {
          blue: '#58a6ff',
          green: '#3fb950',
          amber: '#d29922',
          red: '#f85149',
          purple: '#a371f7',
        },
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'PingFang SC',
          'Microsoft YaHei',
          'sans-serif',
        ],
        mono: [
          'SF Mono',
          'Fira Code',
          'JetBrains Mono',
          'monospace',
        ],
      },
      spacing: {
        'sidebar': '260px',
        'sidebar-collapsed': '72px',
        'topbar': '64px',
      },
      borderRadius: {
        DEFAULT: '6px',
        'lg': '8px',
        'xl': '10px',
        '2xl': '12px',
      },
      boxShadow: {
        'sm': '0 1px 2px rgba(0,0,0,0.3)',
        'md': '0 4px 12px rgba(0,0,0,0.4)',
        'lg': '0 8px 24px rgba(0,0,0,0.5)',
        'card': '0 1px 3px rgba(0,0,0,0.12), 0 8px 24px rgba(0,0,0,0.12)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'fade-up': 'fadeUp 0.5s ease-out forwards',
        'slide-in': 'slideIn 0.3s ease-out forwards',
        'pulse-slow': 'pulse 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-10px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
}
