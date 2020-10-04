const path = require('path')
const { importer } = require('./webpack.util')
const {
  definePlugin,
  cleanWebpack,
  htmlWebpack,
  miniCssExtractPlugin,
  hashedPlugin,
  manifestPlugin,
  copyPlugin,
  contextReplacementPlugin,
} = require('./webpack.plugins')

const isDevMode = process.env.NODE_ENV !== 'production'

module.exports = {
  entry: {
    main: path.join(__dirname, '..', 'src', 'index.tsx'),
    styleGlobals: path.join(__dirname, '..', 'src/assets/scss/globals.scss'),
    fontGlobals: path.join(__dirname, '..', 'src/assets/fonts/fonts.scss'),
  },
  output: {
    // `filename` provides a template for naming your bundles (remember to use `[name]`)
    filename: '[name].[hash:8].js',
    // `chunkFilename` provides a template for naming code-split bundles (optional)
    chunkFilename: '[name].[hash:8].bundle.js',
    // `path` is the folder where Webpack will place your bundles
    path: path.join(__dirname, '..', 'dist'),
    // `publicPath` is where Webpack will load your bundles from (optional)
    publicPath: '/',
  },
  optimization: {
    noEmitOnErrors: true,
    splitChunks: {
      chunks: 'all',
    },
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      '@pages': path.resolve(__dirname, '..', 'src/pages/'),
      '@components': path.resolve(__dirname, '..', 'src/components/'),
      '@placeholders': path.resolve(__dirname, '..', 'src/placeholders/'),
      '@modules': path.resolve(__dirname, '..', 'src/store/modules'),
      '@utils': path.resolve(__dirname, '..', 'src/utils'),
      '@context': path.resolve(__dirname, '..', 'src/context'),
      // '@material-ui/core': '@material-ui/core/esm',
      // '@material-ui/icons': '@material-ui/icons/esm'
    },
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
  },
  module: {
    rules: [
      {
        test: /\.(woff|woff2|ttf|eot|svg|png|jpg|jpeg|gif)$/,
        use: {
          loader: require.resolve('file-loader'),
          options: {
            name: 'fonts/[name].[ext]',
          },
        },
      },
      {
        test: /\.(scss|sass|css)$/,
        use: [
          isDevMode ? 'style-loader' : miniCssExtractPlugin.loader,
          {
            loader: require.resolve('css-loader'),
            options: {
              sourceMap: true,
            },
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              postcssOptions: {
                plugins: (loader) => [
                  require('postcss-import')({ root: loader.resourcePath }),
                  require('autoprefixer')({
                    overrideBrowserslist: ['> 1%', 'last 2 versions'],
                  }),
                ],
              },
            },
          },
          {
            loader: require.resolve('sass-loader'),
            options: {
              sourceMap: true,
              // Prefer `dart-sass`
              implementation: require('sass'),
              sassOptions: {
                // fiber: require('fibers'),
                importer,
              },
            },
          },
        ],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: [
          /node_modules/,
          /node_modules\/@material/,
          /node_modules\/(?!(@material-ui\/core\/es)\/).*/,
        ],
        use: {
          loader: require.resolve('babel-loader'),
          options: {
            presets: ['@babel/preset-env'],
            sourceMap: true,
          },
        },
      },
      {
        test: /\.tsx?$/,
        loader: require.resolve('ts-loader'),
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
        exclude: [
          /node_modules\/@material/,
          /node_modules\/axios-cache-adapter/,
        ],
      },
    ],
  },
  plugins: [
    definePlugin,
    htmlWebpack,
    hashedPlugin,
    cleanWebpack,
    miniCssExtractPlugin,
    manifestPlugin,
    copyPlugin,
    contextReplacementPlugin,
  ],
}
