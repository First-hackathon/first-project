const colors = require("tailwindcss/colors")

module.exports = {
  purge: {
    content: ["./src/pages/**/*.tsx", "./src/components/**/*.tsx"],
    layers: ["components", "utilities"]
  },
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
