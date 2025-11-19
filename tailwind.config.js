/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Neon Cyberpunk Theme
        'dark-bg': '#0A0F24',
        'neon-cyan': '#00FFFF',
        'neon-green': '#00FF7F',
        'neon-blue': '#5C9EFF',
        'overlay': 'rgba(10, 15, 36, 0.95)',

        // Keep utility colors
        'error': '#FF0055',
        'warning': '#FFD700',
        'success': '#00FF7F',

        // Legacy colors for compatibility
        primary: {
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#1E3A8A',
        },
        gray: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        },
        orange: {
          500: '#F97316',
          600: '#EA580C',
        },
        green: {
          500: '#10B981',
          600: '#059669',
        },
        red: {
          500: '#EF4444',
          600: '#DC2626',
        },
        yellow: {
          500: '#F59E0B',
          600: '#D97706',
        }
      },
      boxShadow: {
        'neon-cyan': '0 0 10px rgba(0, 255, 255, 0.5), 0 0 20px rgba(0, 255, 255, 0.3)',
        'neon-green': '0 0 10px rgba(0, 255, 127, 0.5), 0 0 20px rgba(0, 255, 127, 0.3)',
        'neon-blue': '0 0 10px rgba(92, 158, 255, 0.5), 0 0 20px rgba(92, 158, 255, 0.3)',
      },
      fontFamily: {
        'mono': ['JetBrains Mono', 'Courier New', 'monospace'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}