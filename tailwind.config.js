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
        gray: "#737373",
        lightgray: "#F0F0F0"
      }
    }
  }
}
