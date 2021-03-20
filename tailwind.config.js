const colors = require("tailwindcss/colors")
module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  plugins: [],
  theme: {
    extend: {
      colors: {
        orange: "#F98A2C",
        yellow: "#FFB829",
        pink: "#E53170",
        gray: "#737373"
      },
      lineHeight: {
        16: "4rem",
        20: "5rem"
      }
    }
  }
}
