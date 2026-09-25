/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#770706',
          base: '#890f0c',
          glow: '#c1231b'
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        cursive: ['"Dancing Script"', 'cursive'],
        display: ['"Outfit"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
