const { merge } = require('webpack-merge')
const paths = require('./paths')
const config = require('./webpack.config.js')
const {
  hotModuleReplacementPlugin,
  forkTsCheckerWebpackPlugin,
  forkTsCheckerNotifierWebpackPlugin,
  reactRefreshWebpackPlugin,
} = require('./webpack.plugins')

module.exports = merge(config, {
  output: {
    filename: '[name].js',
  },
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    proxy: {
      '/api': 'http://localhost:8080/',
    },
    clientLogLevel: 'warning',
    stats: 'errors-only',
    historyApiFallback: true,
    contentBase: paths.build,
    publicPath: 'http://froyo.almond.com:3000/',
    compress: true,
    hot: true,
    // hmr: true,
    overlay: false,
    port: 3000,
    host: 'localhost',
    open: true,
    watchContentBase: true,
    watchOptions: {
      poll: true,
      ignored: /node_modules/,
    },
  },
  plugins: [
    hotModuleReplacementPlugin,
    reactRefreshWebpackPlugin,
    forkTsCheckerWebpackPlugin,
    forkTsCheckerNotifierWebpackPlugin,
  ],
})
