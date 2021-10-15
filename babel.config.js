var config = {
  presets: [
    ['@babel/preset-env', { modules: false }],
    '@babel/preset-react'
  ]
}

if (process.argv[2].indexOf('test') >= 0) {
  config.plugins = [
    ["./src/index.js"]
  ]
}

module.exports = config
