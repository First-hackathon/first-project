module.exports = {
  compress: true
}

const path = require("path")
const withPlugins = require("next-compose-plugins")
const optimizedImages = require("next-optimized-images")

const nextConfig = {
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "~": path.resolve(__dirname, "./src")
    }

    return config
  }
}

module.exports = withPlugins(
  [
    [
      optimizedImages,
      {
        handleImages: ["jpeg", "png", "svg", "webp", "ico", "gif"],
        inlineImageLimit: -1
      }
    ]
  ],
  nextConfig
)
