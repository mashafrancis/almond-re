const paths = require('./paths')
const { importer } = require('./webpack.util')
const {
  definePlugin,
  cleanWebpack,
  htmlWebpack,
  copyPlugin,
  contextReplacementPlugin,
  providerPlugin,
} = require('./webpack.plugins')

module.exports = {
  entry: {
    main: `${paths.src}/index.tsx`,
    styleGlobals: `${paths.src}/assets/scss/globals.scss`,
    fontGlobals: `${paths.src}/assets/fonts/fonts.scss`,
  },
  output: {
    filename: '[name].[contenthash].bundle.js',
    chunkFilename: (pathData) => {
      return pathData.chunk.name === 'main' ? '[name].js' : '[name]/[name].js'
    },
    publicPath: '/',
    hashDigestLength: 8,
  },
  optimization: {
    removeAvailableModules: false,
    removeEmptyChunks: false,
    emitOnErrors: true,
    splitChunks: {
      chunks: 'all',
    },
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      '@pages': `${paths.src}/pages/`,
      '@components': `${paths.src}/components/`,
      '@placeholders': `${paths.src}/placeholders/`,
      '@modules': `${paths.src}/store/modules`,
      '@utils': `${paths.src}/utils`,
      '@context': `${paths.src}/context`,
      '@hooks': `${paths.src}/hooks`,
      // '@material-ui/core': '@material-ui/core/esm',
      // '@material-ui/icons': '@material-ui/icons/esm'
    },
    // fallback: {
    //   process: require.resolve('process/browser'),
    // },
    modules: [`${paths.src}`, 'node_modules'],
  },
  target: ['web', 'es5'],
  module: {
    rules: [
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline',
      },
      {
        test: /\.(scss|sass|css)$/,
        use: [
          'style-loader',
          {
            loader: require.resolve('css-loader'),
            options: {
              sourceMap: true,
              importLoaders: 1,
            },
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              sourceMap: true,
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
        options: { transpileOnly: true },
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
    cleanWebpack,
    copyPlugin,
    contextReplacementPlugin,
    providerPlugin,
  ],
}
