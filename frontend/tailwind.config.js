/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Google-inspired 暗色主题
        // 不是纯黑，而是带蓝调的深灰
        surface: {
          DEFAULT: '#1f2937',  // 主背景 - 深蓝灰
          dim: '#111827',      // 更深的背景
          bright: '#374151',   // 亮一点的表面
          container: '#1f2937',
          'container-high': '#374151',
          'container-low': '#111827',
        },
        // Google 风格的强调色
        primary: {
          DEFAULT: '#60a5fa', // 柔和的蓝色（暗色模式用浅蓝）
          container: '#1e3a5f',
          on: '#0c4a6e',
        },
        secondary: {
          DEFAULT: '#a78bfa', // 紫色
          container: '#4c1d95',
        },
        tertiary: {
          DEFAULT: '#34d399', // 绿色
          container: '#064e3b',
        },
        // 文字色 - 高对比度但柔和
        on: {
          surface: '#f9fafb',       // 主文字
          'surface-variant': '#d1d5db', // 次要文字
          primary: '#dbeafe',
        },
        // 边框
        outline: {
          DEFAULT: '#4b5563',
          variant: '#374151',
        },
        // 状态色
        error: '#f87171',
        success: '#34d399',
        warning: '#fbbf24',
      },
      fontFamily: {
        sans: [
          'Times New Roman',
          'Georgia',
          'PingFang SC',
          'Microsoft YaHei',
          'serif',
        ],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'scale-in': 'scaleIn 0.4s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      transitionTimingFunction: {
        'google': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
}
