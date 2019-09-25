const dotenv = require('dotenv');

// importing webpack dependencies
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');

// instantiating webpack dependencies
const cleanWebpack = new CleanWebpackPlugin();
const htmlWebpack = new htmlWebpackPlugin({
  template: 'src/index.html',
  title: 'Almond',
  favicon: './src/favicon.png',
  minify: {
    removeComments: true,
    collapseWhitespace: true
  },
});
const miniCssExtract = new miniCssExtractPlugin();
const hotModuleReplacementPlugin = new webpack.HotModuleReplacementPlugin();
const hashedPlugin = new webpack.HashedModuleIdsPlugin();

// call dotenv and it will return an Object with a parsed key
const env = dotenv.config().parsed;

// reduce it to a nice object, the same as before
// const envKeys = Object.keys(env).reduce((prev, next) => {
//   prev[`process.env.${next}`] = JSON.stringify(env[next]);
//   return prev;
// }, {});
//
// const definePlugin = new webpack.DefinePlugin(envKeys);

module.exports = {
  cleanWebpack,
  // definePlugin,
  htmlWebpack,
  miniCssExtract,
  miniCssExtractPlugin,
  hotModuleReplacementPlugin,
  hashedPlugin,
};
