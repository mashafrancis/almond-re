const ReactRefreshTypeScript = require('react-refresh-typescript').default
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

const isDevMode = process.env.NODE_ENV === 'development'

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
    path: paths.build,
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
      'process': 'process/browser',
      // '@material-ui/core': '@material-ui/core/esm',
      // '@material-ui/icons': '@material-ui/icons/esm'
    },
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
        test: /\.(woff|woff2|eot|ttf|otf|svg|)$/,
        type: 'asset/inline',
      },
      {
        test: /\.(scss|sass|css)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 1,
              import: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              // Prefer `dart-sass`
              implementation: require('sass'),
              sassOptions: {
                fiber: false,
                importer,
              },
            },
          },
        ],
      },
      {
        test: /\.(js|jsx)$/,
        include: paths.src,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            sourceMap: true,
            plugins: [
              '@babel/plugin-transform-runtime',
              isDevMode && require.resolve('react-refresh/babel'),
            ].filter(Boolean),
          },
        },
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        include: paths.src,
        exclude: /node_modules/,
        options: {
          transpileOnly: true,
          getCustomTransformers: () => ({
            before: isDevMode ? [ReactRefreshTypeScript()] : [],
          }),
        },
      },
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
        exclude: /node_modules/,
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
  ].filter(Boolean),
}
