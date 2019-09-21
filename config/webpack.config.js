const path = require('path');
const {importer} = require('./webpack.util');
const {
  cleanWebpack,
  htmlWebpack,
  miniCssExtract,
  miniCssExtractPlugin,
  hashedPlugin,
} = require('./webpack.plugins');

const isDevMode = process.env.APP_ENV !== 'production';

module.exports = {
  entry: {
    main: path.join(__dirname, '..', 'src', 'index.tsx'),
    styleGlobals: path.join(__dirname, '..', 'src/assets/scss/globals.scss')
  },
  output: {
    path: path.join(__dirname, '..', 'dist'),
    filename: '[name].[hash:8].js',
    publicPath: '/'
  },
  optimization: {
    noEmitOnErrors: true,
    namedChunks: true,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      pages: path.resolve(__dirname, '..', 'src/pages/'),
      components: path.resolve(__dirname, '..', 'src/components/'),
      modules: path.resolve(__dirname, '../src/store/modules'),
      utils: path.resolve(__dirname, '../src/utils')
    },
    modules: [path.resolve(__dirname, 'src'), 'node_modules']
  },
  module: {
    rules: [
      {
        test: /\.(woff(2)?|ttf|eot|svg|png|jpg|jpeg|gif)$/,
        use: {
          loader: 'file-loader'
        }
      },
      {
        test: /\.(scss|css)$/,
        use: [
          isDevMode ? 'style-loader' : miniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [require('autoprefixer')({
                'overrideBrowserslist': ['> 1%', 'last 2 versions']
              })],
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              importer
            }
          },
        ]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            sourceMap: true,
          }
        }
      },
      {
        test: /\.tsx?$/,
        use: {
          loader: 'awesome-typescript-loader'
        }
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
      },
    ]
  },
  plugins: [
    htmlWebpack,
    hashedPlugin,
    cleanWebpack,
    miniCssExtract,
  ]
};

