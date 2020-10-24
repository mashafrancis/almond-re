const dotenv = require('dotenv')
// importing webpack dependencies
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ForkTsCheckerNotifierWebpackPlugin = require('fork-ts-checker-notifier-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const paths = require('./paths')

/**
 * Parses environment variables into a format acceptable by the webpack DefinePlugin
 * @param {object} configs Object literal containing configuration variables to
 * parse before sending them to react
 */
const parseConfigs = (configs) =>
  Object.keys(configs || {}).reduce(
    (acc, val) => ({ ...acc, [val]: JSON.stringify(configs[val]) }),
    {},
  )

// fetch system environment variables
const systemVariables = parseConfigs(process.env)

// fetch environment variables from the dotenv file
const { parsed: dotenvConfigs } = dotenv.config()

// process the environment variables from the dotenv file
const processedDotenvConfigs = parseConfigs(dotenvConfigs)

const definePlugin = new webpack.DefinePlugin({
  'process.env': { ...processedDotenvConfigs, ...systemVariables },
})

// instantiating webpack dependencies
// Removes/cleans build folders and unused assets when rebuilding
const cleanWebpack = new CleanWebpackPlugin({
  dry: true,
  verbose: true,
  cleanStaleWebpackAssets: true,
  protectWebpackAssets: true,
  cleanAfterEveryBuildPatterns: ['dist'],
})

// Generates an HTML file from a template
const htmlWebpack = new HtmlWebpackPlugin({
  title: 'Almond',
  template: `${paths.public}/template.html`,
  favicon: `${paths.public}/favicon.ico`,
  filename: 'index.html',
  // inject: 'body',
  // minify: {
  //   removeComments: true,
  //   collapseWhitespace: true,
  //   removeRedundantAttributes: true,
  //   useShortDoctype: true,
  //   removeEmptyAttributes: true,
  //   removeStyleLinkTypeAttributes: true,
  //   keepClosingSlash: true,
  //   minifyJS: true,
  //   minifyCSS: true,
  //   minifyURLs: true,
  // },
})
const miniCssExtractPlugin = new MiniCssExtractPlugin({
  filename: 'styles/[name].[contenthash].css',
  chunkFilename: '[id].[contenthash].css',
  ignoreOrder: true, // Enabled to remove warnings about conflicting order
})
const hotModuleReplacementPlugin = new webpack.HotModuleReplacementPlugin()

// Copies files from target to destination folder
const copyPlugin = new CopyWebpackPlugin({
  patterns: [
    {
      from: paths.public,
      to: 'assets',
      globOptions: {
        ignore: ['*.DS_Store'],
      },
    },
  ],
})

const providerPlugin = new webpack.ProvidePlugin({
  Buffer: ['buffer', 'Buffer'],
  process: ['process', 'process/browser'],
  // browser: ['browser', 'process/browser'],
})

// const bundleAnalyzerPlugin = new BundleAnalyzerPlugin( {
//   openAnalyzer: false
// })

const contextReplacementPlugin = new webpack.ContextReplacementPlugin(
  /\.\/locale$/,
  'empty-module',
  false,
  /js$/,
)

// const forkTsCheckerWebpackPlugin = new ForkTsCheckerWebpackPlugin({
//   eslint: {
//     files: './src/**/*.{ts,tsx,js,jsx}', // required - same as command `eslint ./src/**/*.{ts,tsx,js,jsx} --ext .ts,.tsx,.js,.jsx`
//   },
// })

const forkTsCheckerWebpackPlugin = new ForkTsCheckerWebpackPlugin()

const forkTsCheckerNotifierWebpackPlugin = new ForkTsCheckerNotifierWebpackPlugin(
  {
    title: 'TypeScript',
    excludeWarnings: false,
  },
)

module.exports = {
  cleanWebpack,
  definePlugin,
  htmlWebpack,
  miniCssExtractPlugin,
  hotModuleReplacementPlugin,
  copyPlugin,
  contextReplacementPlugin,
  providerPlugin,
  forkTsCheckerWebpackPlugin,
  forkTsCheckerNotifierWebpackPlugin,
}
