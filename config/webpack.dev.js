const { merge } = require('webpack-merge')
const paths = require('./paths')
const config = require('./webpack.config.js')
const { hotModuleReplacementPlugin } = require('./webpack.plugins')

module.exports = merge(config, {
  output: {
    filename: '[name].js',
  },
  mode: 'development',
  optimization: {
    moduleIds: 'named',
  },
  devtool: 'inline-source-map',
  devServer: {
    proxy: {
      '/api': 'http://localhost:8080/',
    },
    historyApiFallback: true,
    contentBase: paths.build,
    publicPath: 'http://froyo.almond.com:3000/',
    compress: true,
    hot: true,
    overlay: true,
    port: 3000,
    host: 'localhost',
    open: true,
    watchContentBase: true,
    watchOptions: {
      poll: true,
      ignored: /node_modules/,
    },
  },
  plugins: [hotModuleReplacementPlugin],
})
