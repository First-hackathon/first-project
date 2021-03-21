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
      colors: {
        orange: "#F98A2C",
        yellow: "#FFB829",
        pink: "#E53170",
        gray: { DEFAULT: "#737373", light: "#d7dcde" }
      },
      lineHeight: {
        16: "4rem",
        20: "5rem"
      }
    }
  }
}
