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
        'neon-pink': '#FF0055',
        'warning': '#FFD700',
        'success': '#00FF7F',
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