/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/*.html"
  ],
  theme: {
    extend: {
      colors: {
        'lilac': '#f0f0f0',
        'purple': '#864cff',
        'light-red': '#ff5757'
      },
      fontFamily : {
        sans: ['Poppins', 'sans-serif']
      }
    },
  },
  plugins: [],
}

