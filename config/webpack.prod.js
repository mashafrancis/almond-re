const { merge } = require('webpack-merge')
const cssNano = require('cssnano')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const paths = require('./paths')
const config = require('./webpack.config.js')
const { miniCssExtractPlugin } = require('./webpack.plugins')

module.exports = merge(config, {
  mode: 'production',
  output: {
    path: paths.build,
    publicPath: '/',
    filename: 'js/[name].[contenthash].bundle.js',
  },
  devtool: false,
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin(),
      new OptimizeCSSAssetsPlugin({
        cssProcessor: cssNano,
        cssProcessorOptions: {
          reduceIdents: false,
        },
      }),
    ],
    // Once your build outputs multiple chunks, this option will ensure they share the webpack runtime
    // instead of having their own. This also helps with long-term caching, since the chunks will only
    // change when actual code changes, not the webpack runtime.
    runtimeChunk: {
      name: 'runtime',
    },
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      minChunks: 1,
      maxAsyncRequests: 6,
      automaticNameDelimiter: '~',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          reuseExistingChunk: true,
          // name(module, chunks, cacheGroupKey) {
          //   const moduleFileName = module.identifier().split('/').reduceRight(item => item).replace('@', '');
          //   const allChunksNames = chunks.map((item) => item.name).join('~');
          //   return `${cacheGroupKey}-${allChunksNames}-${moduleFileName}`;
          // },
          name(module) {
            // get the name. E.g. node_modules/packageName/not/this/part.js
            // or node_modules/packageName
            const packageName = module.context.match(
              /[\\/]node_modules[\\/](.*?)([\\/]|$)/,
            )[1]

            // npm package names are URL-safe, but some servers don't like @ symbols
            return `${packageName.replace('@', '')}`
          },
        },
        // Split code common to all chunks to its own chunk
        commons: {
          name: 'commons', // The name of the chunk containing all common code
          chunks: 'initial',
          minChunks: 2, // This is the number of modules
        },
      },
    },
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  plugins: [
    new CompressionPlugin(),
    // new webpack.optimize.AggressiveMergingPlugin(),
    // new webpack.optimize.ModuleConcatenationPlugin(),
    // new CleanWebpackPlugin(),
    new CleanWebpackPlugin({
      dry: true,
      verbose: true,
      cleanStaleWebpackAssets: true,
      protectWebpackAssets: true,
    }),
    new ForkTsCheckerWebpackPlugin({
      async: false,
      // useTypescriptIncrementalApi: true,
      // memoryLimit: 4096,
    }),
    miniCssExtractPlugin,
  ],
})
