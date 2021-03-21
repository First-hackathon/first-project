const colors = require("tailwindcss/colors")

module.exports = {
  purge: {
    content: ["./src/pages/**/*.tsx", "./src/components/**/*.tsx"],
    layers: ["components", "utilities"]
  },
  darkMode: "class",
  plugins: [require("@tailwindcss/aspect-ratio")],
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
      },
      aspectRatio: {
        816: "816",
        571: "571"
      }
    }
  }
}
