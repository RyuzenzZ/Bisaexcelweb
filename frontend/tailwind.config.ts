import type { Config } from 'tailwindcss'
import tailwindcssAnimate from 'tailwindcss-animate'

const config: Config = {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      colors: {
        'be-base': '#080E0A',
        'be-elevated': '#0D1610',
        'be-card': '#111E14',
        'be-card-hover': '#162419',
        'be-overlay': '#1C2E20',
        'be-input': '#0F1A12',
        'be-border': '#1E3022',
        'be-border-strong': '#254A2A',
        'be-text': '#E8F0EA',
        'be-muted': '#8BA98F',
        'be-dim': '#4D6650',
      },
      fontFamily: {
        heading: ['Montserrat', 'sans-serif'],
        body: ['Montserrat', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        display: ['Montserrat', 'sans-serif'],
      },
      boxShadow: {
        'glow-green': '0 0 20px rgba(22,163,74,0.30)',
        'glow-green-lg': '0 0 40px rgba(22,163,74,0.25)',
        'glow-gold': '0 0 16px rgba(245,158,11,0.30)',
        card: '0 2px 12px rgba(0,0,0,0.40)',
        'card-hover': '0 4px 24px rgba(0,0,0,0.60)',
      },
      keyframes: {
        'xp-pulse': {
          '0%, 100%': { boxShadow: '0 0 10px rgba(22,163,74,.4)' },
          '50%': { boxShadow: '0 0 20px rgba(22,163,74,.7)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
      animation: {
        'xp-pulse': 'xp-pulse 2s ease-in-out infinite',
        float: 'float 3s ease-in-out infinite',
      },
    },
  },
  plugins: [tailwindcssAnimate],
}

export default config

