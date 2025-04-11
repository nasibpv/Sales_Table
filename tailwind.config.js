/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}" // Make sure to include all React files
  ],
  darkMode: 'class', 
  theme: {
    extend: {},
    screens: {
      xs: '80px', // now you can use xs: prefix
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
  },
  plugins: [],
}
