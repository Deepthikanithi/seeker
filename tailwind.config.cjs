/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#030D1C',
        secondary: '#ffffff',
      },
      screens: {
        'xs': '475px',
      },
    },
  },
  plugins: [],
}
