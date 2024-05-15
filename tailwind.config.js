/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        '3xl': '0px 0px 0px 0px rgba(42, 82,130, 1)',
        '4xl': '0 35px 60px -15px rgba(61, 255, 85, 1)',
      },
     
    },
  },
  plugins: [],
}