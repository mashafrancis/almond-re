const dotenv = require('dotenv');

// importing webpack dependencies
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const PUBLIC_PATH = process.env.PUBLIC_URL;

/**
 * Parses environment variables into a format acceptable by the webpack DefinePlugin
 * @param {object} configs Object literal containing configuration variables to
 * parse before sending them to react
 */
const parseConfigs = configs => Object.keys(configs || {}).reduce(
  (acc, val) => ({ ...acc, [val]: JSON.stringify(configs[val]) }),
  {},
);

// fetch system environment variables
const systemVariables = parseConfigs(process.env);

// fetch environment variables from the dotenv file
const { parsed: dotenvConfigs } = dotenv.config();

// process the environment variables from the dotenv file
const processedDotenvConfigs = parseConfigs(dotenvConfigs);

const definePlugin = new webpack.DefinePlugin({
  'process.env': { ...processedDotenvConfigs, ...systemVariables },
});

// const definePlugin = new webpack.DefinePlugin({
//   'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
//   'process.env.ALMOND_API': JSON.stringify(process.env.ALMOND_API),
//   'process.env.PUBLIC_URL': JSON.stringify(process.env.PUBLIC_URL),
//   'process.env.FIREBASE_APIKEY': JSON.stringify(process.env.FIREBASE_APIKEY),
//   'process.env.FIREBASE_AUTH_DOMAIN': JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
//   'process.env.FIREBASE_DATABASE_URL': JSON.stringify(process.env.FIREBASE_DATABASE_URL),
//   'process.env.FIREBASE_PROJECT_ID': JSON.stringify(process.env.FIREBASE_PROJECT_ID),
//   'process.env.FIREBASE_STORAGE_BUCKET': JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
//   'process.env.FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(process.env.FIREBASE_MESSAGING_SENDER_ID),
//   'process.env.FIREBASE_APP_ID': JSON.stringify(process.env.FIREBASE_APP_ID),
//   'process.env.FIREBASE_MEASUREMENT_ID': JSON.stringify(process.env.FIREBASE_MEASUREMENT_ID),
//   'process.env.GOOGLE_MEASUREMENT_ID': JSON.stringify(process.env.GOOGLE_MEASUREMENT_ID),
//   'process.env.GOOGLE_TAG_MANAGER': JSON.stringify(process.env.GOOGLE_TAG_MANAGER),
//   'process.env.GOOGLE_OPTIMIZE_MANAGER': JSON.stringify(process.env.GOOGLE_OPTIMIZE_MANAGER),
//   'process.env.GOOGLE_PROPERTY_ID': JSON.stringify(process.env.GOOGLE_PROPERTY_ID),
//   'process.env.SERVICE_ACCOUNT': JSON.stringify(process.env.SERVICE_ACCOUNT),
//   'process.env.SOCIAL_AUTH_URL': JSON.stringify(process.env.SOCIAL_AUTH_URL),
//   'process.env.GOOGLE_TRACKING_ID': JSON.stringify(process.env.GOOGLE_TRACKING_ID),
//   'process.env.REDIRECT_DEVICE_URL': JSON.stringify(process.env.REGISTER_DEVICE_URL),
//   'process.env.MQTT_SERVER': JSON.stringify(process.env.MQTT_SERVER)
// });

// instantiating webpack dependencies
const cleanWebpack = new CleanWebpackPlugin();
const htmlWebpack = new htmlWebpackPlugin({
  template: './public/index.html',
  filename: 'index.html',
  inject: 'body',
  title: 'Almond',
  favicon: './public/favicon.ico',
  minify: {
    removeComments: true,
    collapseWhitespace: true,
    removeRedundantAttributes: true,
    useShortDoctype: true,
    removeEmptyAttributes: true,
    removeStyleLinkTypeAttributes: true,
    keepClosingSlash: true,
    minifyJS: true,
    minifyCSS: true,
    minifyURLs: true,
  },
});
const miniCssExtract = new miniCssExtractPlugin({
  filename: '[name].[contenthash].css',
  chunkFilename: '[id].[contenthash].css',
  ignoreOrder: true  // Enabled to remove warnings about conflicting order
});
const hotModuleReplacementPlugin = new webpack.HotModuleReplacementPlugin();
const hashedPlugin = new webpack.HashedModuleIdsPlugin();
const manifestPlugin = new ManifestPlugin({
  fileName: './public/asset-manifest.json', // Not to confuse with manifest.json
});

// const copyPlugin = new CopyWebpackPlugin([
//   { from: 'public' }, // define the path of the files to be copied
// ]);

const copyPlugin = new CopyWebpackPlugin({
  patterns: [
    { from: 'public' }
  ],
});

// const bundleAnalyzerPlugin = new BundleAnalyzerPlugin( {
//   openAnalyzer: false
// })

const contextReplacementPlugin = new webpack.ContextReplacementPlugin(
  /\.\/locale$/,'empty-module', false, /js$/)

module.exports = {
  cleanWebpack,
  definePlugin,
  htmlWebpack,
  miniCssExtract,
  miniCssExtractPlugin,
  hotModuleReplacementPlugin,
  hashedPlugin,
  manifestPlugin,
  copyPlugin,
  contextReplacementPlugin,
};
