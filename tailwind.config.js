/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'], 
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

