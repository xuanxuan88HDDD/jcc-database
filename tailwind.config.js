/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'anime-pink': '#FF69B4',
        'anime-purple': '#9370DB',
        'anime-blue': '#87CEEB',
        'anime-yellow': '#FFE4B5',
        'gradient-start': '#FF6B6B',
        'gradient-mid': '#4ECDC4',
        'gradient-end': '#6A5ACD',
      },
      animation: {
        'float': 'float 4s ease-in-out infinite',
        'bounce-slow': 'bounce 3s infinite',
        'pulse-anime': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-anime': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        }
      }
    },
  },
  plugins: [],
}