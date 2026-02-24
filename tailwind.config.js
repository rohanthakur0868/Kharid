/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Natural Green Palette
        primary: {
          DEFAULT: "#059669", // Emerald-600
          hover: "#047857",   // Emerald-700
          light: "#d1fae5",   // Emerald-100
          dark: "#064e3b",    // Emerald-900
        },
        secondary: "#1f2937",   // Gray-800
        background: "#ffffff",
        surface: "#f3f4f6",     // Gray-100
        accent: "#10b981",      // Emerald-500
      },
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
        display: ['Syne', 'sans-serif'],
        outfit: ['Outfit', 'sans-serif'],
        serif: ['Syne', 'sans-serif'],
      },
      container: {
        center: true,
        padding: '1rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}
