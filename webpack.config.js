const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackPwaManifestPlugin = require('webpack-pwa-manifest')
// const WorkboxWebpackPlugin = require('workbox-webpack-plugin')

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.css', '.styl', '.json'],
  },
  entry: './src/index.js',
  output: {
    publicPath: '/',
    filename: '[name].[hash].js',
    chunkFilename: '[id].[chunkhash].js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new WebpackPwaManifestPlugin({
      name: 'My Life Rpg',
      shortname: 'RPG',
      description: 'Gestor de tareas diarias',
      background_color: '#fff',
      theme_color: '#b1a',
      crossorigin: 'use-credentials', // can be null, use-credentials or anonymous
      /* icons: [
        {
          src: path.resolve('src/assets/icon.png'),
          sizes: [96, 128, 192, 256, 384, 512]
        }
      ] */
    }),
    /* new WorkboxWebpackPlugin.GenerateSW({
      runtimeCaching: [
        {
          urlPattern: new RegExp('https://res.cloudinary.com'),
          handler: 'CacheFirst',
          options: {
            cacheName: 'images-cloudinary'
          }
        },
        {
          urlPattern: new RegExp('https://images.unsplash.com'),
          handler: 'CacheFirst',
          options: {
            cacheName: 'images-unsplash'
          }
        },
        {
          urlPattern: new RegExp('https://petgram-api.midudev.now.sh'),
          handler: 'NetworkFirst',
          options: {
            cacheName: 'api'
          }
        }
      ]
    }) */
  ],
  module: {
    rules: [
      /* {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      }, */
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        loader: 'awesome-typescript-loader',
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
}
