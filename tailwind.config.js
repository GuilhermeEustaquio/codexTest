/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0d9488',
        secondary: '#06b6d4',
        dark: '#0f172a',
        brand: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
          950: '#042f2e',
        },
        orange: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
        blue: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        green: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
      },
      boxShadow: {
        'glow-teal': '0 0 20px 0 rgba(13,148,136,0.35)',
        'glow-sm': '0 0 10px 0 rgba(13,148,136,0.20)',
        glass: '0 8px 32px 0 rgba(15, 23, 42, 0.16)',
        'glass-soft': '0 4px 18px 0 rgba(15, 23, 42, 0.12)',
      },
      backgroundImage: {
        'glass-white': 'linear-gradient(135deg, rgba(255,255,255,0.35), rgba(255,255,255,0.08))',
        'gradient-mesh':
          'radial-gradient(at 20% 20%, rgba(249, 115, 22, 0.24) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(59, 130, 246, 0.22) 0px, transparent 50%), radial-gradient(at 0% 80%, rgba(34, 197, 94, 0.2) 0px, transparent 50%), radial-gradient(at 70% 80%, rgba(20, 184, 166, 0.18) 0px, transparent 50%)',
      },
      backdropBlur: {
        xs: '2px',
        glass: '14px',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 8px 0 rgba(13,148,136,0.25)' },
          '50%': { boxShadow: '0 0 22px 4px rgba(13,148,136,0.50)' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in': {
          '0%': { opacity: '0', transform: 'translateX(-24px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.94)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        'pulse-glow': 'pulse-glow 2.5s ease-in-out infinite',
        'fade-in-up': 'fade-in-up 0.6s ease-out both',
        'slide-in': 'slide-in 0.55s ease-out both',
        'scale-in': 'scale-in 0.45s ease-out both',
      },
    },
  },
  plugins: [],
};
