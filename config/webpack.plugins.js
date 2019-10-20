const dotenv = require('dotenv');

// importing webpack dependencies
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const PUBLIC_PATH = process.env.PUBLIC_URL;


// instantiating webpack dependencies
const cleanWebpack = new CleanWebpackPlugin();
const htmlWebpack = new htmlWebpackPlugin({
  template: './public/index.html',
  filename: 'index.html',
  inject: 'body',
  title: 'Almond',
  favicon: './public/favicon.png',
  minify: {
    removeComments: true,
    collapseWhitespace: true
  },
});
const miniCssExtract = new miniCssExtractPlugin();
const hotModuleReplacementPlugin = new webpack.HotModuleReplacementPlugin();
const hashedPlugin = new webpack.HashedModuleIdsPlugin();
const manifestPlugin = new ManifestPlugin({
  fileName: './public/asset-manifest.json', // Not to confuse with manifest.json
});

const swPlugin = new SWPrecacheWebpackPlugin({
  // By default, a cache-busting query parameter is appended to requests
  // used to populate the caches, to ensure the responses are fresh.
  // If a URL is already hashed by Webpack, then there is no concern
  // about it being stale, and the cache-busting can be skipped.
  dontCacheBustUrlsMatching: /\.\w{8}\./,
  filename: 'service-worker.js',
  logger(message) {
    if (message.indexOf('Total precache size is') === 0) {
      // This message occurs for every build and is a bit too noisy.
      return;
    }
    console.log(message);
  },
  minify: true, // minify and uglify the script
  navigateFallback: PUBLIC_PATH + 'index.html',
  staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
});

const copyPlugin = new CopyWebpackPlugin([
  { from: 'src/pwa' }, // define the path of the files to be copied
]);

// call dotenv and it will return an Object with a parsed key
const env = dotenv.config().parsed;

// reduce it to a nice object, the same as before
// const envKeys = Object.keys(env).reduce((prev, next) => {
//   prev[`process.env.${next}`] = JSON.stringify(env[next]);
//   return prev;
// }, {});

const definePlugin = new webpack.DefinePlugin({
  'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  'process.env.APP_ENV': JSON.stringify(process.env.APP_ENV),
  'process.env.ALMOND_API': JSON.stringify(process.env.ALMOND_API),
  'process.env.PUBLIC_URL': JSON.stringify(process.env.PUBLIC_URL),
  'process.env.FIREBASE_APIKEY': JSON.stringify(process.env.FIREBASE_APIKEY),
  'process.env.FIREBASE_AUTH_DOMAIN': JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
  'process.env.FIREBASE_DATABASE_URL': JSON.stringify(process.env.FIREBASE_DATABASE_URL),
  'process.env.FIREBASE_PROJECT_ID': JSON.stringify(process.env.FIREBASE_PROJECT_ID),
  'process.env.FIREBASE_STORAGE_BUCKET': JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
  'process.env.FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(process.env.FIREBASE_MESSAGING_SENDER_ID),
  'process.env.FIREBASE_APP_ID': JSON.stringify(process.env.FIREBASE_APP_ID),
  'process.env.FIREBASE_MEASUREMENT_ID': JSON.stringify(process.env.FIREBASE_MEASUREMENT_ID),
  'process.env.GOOGLE_MEASUREMENT_ID': JSON.stringify(process.env.GOOGLE_MEASUREMENT_ID),
  'process.env.GOOGLE_TAG_MANAGER': JSON.stringify(process.env.GOOGLE_TAG_MANAGER),
  'process.env.GOOGLE_OPTIMIZE_MANAGER': JSON.stringify(process.env.GOOGLE_OPTIMIZE_MANAGER),
  'process.env.GOOGLE_PROPERTY_ID': JSON.stringify(process.env.GOOGLE_PROPERTY_ID),
  'process.env.SERVICE_ACCOUNT': JSON.stringify(process.env.SERVICE_ACCOUNT),

});

module.exports = {
  cleanWebpack,
  definePlugin,
  htmlWebpack,
  miniCssExtract,
  miniCssExtractPlugin,
  hotModuleReplacementPlugin,
  hashedPlugin,
  manifestPlugin,
  swPlugin,
  copyPlugin,
};
