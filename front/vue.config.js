const SendMapWebpackPlugin = require('./plugins/SendMapWebpackPlugin')

module.exports = {
  configureWebpack: {
    plugins: [
      new SendMapWebpackPlugin()
    ]
  },
};
