const merge = require('webpack-merge');
const cssNano = require('cssnano');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const config = require('./webpack.config.js');

module.exports = merge(config, {
  output: {
    filename: '[name].min.js'
  },
  devtool: 'source-map',
  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessor: cssNano,
        cssProcessorOptions: {
          reduceIdents: false,
        },
      }),
    ],
    // Keep the runtime chunk separated to enable long term caching
    // https://twitter.com/wSokra/status/969679223278505985
    runtimeChunk: {
      name: "runtime"
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
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

            // npm package names are URL-safe, but some servers don't like @ symbols
            return `${packageName.replace('@', '')}`;
          },
        },
        // Split code common to all chunks to its own chunk
        commons: {
          name: "commons",    // The name of the chunk containing all common code
          chunks: "initial",
          minChunks: 2        // This is the number of modules
        }
      },
    },
    // plugins: [
    //   new CompressionPlugin(),
    //   new webpack.optimize.AggressiveMergingPlugin(),
    //   new webpack.optimize.ModuleConcatenationPlugin(),
    //   new CleanWebpackPlugin(),
    // ],
    // node: {
    //   dgram: 'empty',
    //   fs: 'empty',
    //   net: 'empty',
    //   tls: 'empty',
    //   child_process: 'empty',
    // },
  },
});
