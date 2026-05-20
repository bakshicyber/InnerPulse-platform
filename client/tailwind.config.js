/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        zen: {
          blue: '#1E3A5F',       // Deep Academic Blue
          sage: '#84A98C',       // Sage Green
          lavender: '#CDB4DB',   // Soft Lavender
          paper: '#F8FAF9',      // Light Background
          slate: '#0F172A',      // Dark Mode Base
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      },
      boxShadow: {
        'academic': '0 4px 20px -2px rgba(30, 58, 95, 0.05)',
        'soft': '0 10px 40px -10px rgba(0, 0, 0, 0.05)',
      },
      borderRadius: {
        '2xl': '1.25rem',
        '3xl': '2rem',
      },
      animation: {
        'fade-up': 'fade-up 0.8s ease-out forwards',
        'subtle-pulse': 'subtle-pulse 4s ease-in-out infinite',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(15px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'subtle-pulse': {
          '0%, 100%': { opacity: '0.8', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.02)' },
        }
      }
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.glass-card': {
          background: 'rgba(248, 250, 249, 0.7)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(30, 58, 95, 0.08)',
          boxShadow: '0 8px 32px 0 rgba(30, 58, 95, 0.05)',
        },
        '.glass-card-dark': {
          background: 'rgba(15, 23, 42, 0.8)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.2)',
        },
      })
    }
  ],
}
