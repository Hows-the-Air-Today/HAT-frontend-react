/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  content: [],
  theme: {
    extend: {
      screens: {
        sm: "480px",
        md: "768px",
        lg: "976px",
        xl: "1440px",
      },
      colors: {
        "air-blue": "#76A9FA",
        "air-green": "#31C48D",
        "air-yellow": "#FACA15",
        "air-red": "#F05252",
      },
    },
  },
  plugins: [],
};
