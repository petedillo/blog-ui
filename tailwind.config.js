/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Dark theme
        'dark-bg': '#0A0F24',
        'surface-dark': '#141B33',
        'surface-hover': '#1A2344',
        // Neon Cyberpunk Theme
        'neon-cyan': '#00FFFF',
        'neon-green': '#00FF7F',
        'neon-blue': '#5C9EFF',
        'neon-orange': '#FF8C00',
        'neon-pink': '#FF0055',
        'overlay': 'rgba(10, 15, 36, 0.95)',
        // Status colors
        'warning': '#FFD700',
        'success': '#00FF7F',
        'error': '#FF3232',
        'info': '#5C9EFF',
        // Text colors
        'text-primary': '#E0E6F0',
        'text-secondary': '#8A94A8',
        'text-muted': '#5A6374',
      },
      boxShadow: {
        'neon-glow-cyan': '0 0 20px rgba(0, 255, 255, 0.5)',
        'neon-glow-blue': '0 0 20px rgba(92, 158, 255, 0.5)',
        'neon-glow-green': '0 0 20px rgba(0, 255, 127, 0.5)',
      },
      borderColor: {
        DEFAULT: 'rgba(0, 255, 255, 0.3)', // neon-cyan with transparency
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}