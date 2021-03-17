const colors = require("tailwindcss/colors")

module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  plugins: [],
  theme: {
    extend: {
      // example
      colors: {
        "light-blue": colors.lightBlue,
        cyan: colors.cyan
      }
    }
  }
}
