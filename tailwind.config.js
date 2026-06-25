/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FF5722",
        coral: "#FE6D4D",
        background: "#FFFFFF",
        border: "#E9ECEF",
        lightgrey: "#B0B0B0",
        dark: "#1A1A1A"
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
