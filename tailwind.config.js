/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary": "#2f2f2f",
        "secondary": "#d5dfe8",
        "third": "#56756d",
      },
      fontFamily: {
        "Mulish":"Mulish",
      },
    },
  },
  plugins: [],
}
