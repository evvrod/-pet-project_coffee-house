const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const MiniCssExtraPlugin = require('mini-css-extract-plugin');
const PostcssPresentEnvPlugin = require('postcss-preset-env');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

const mode = process.env.NODE_ENV || 'development';
const devMode = mode === 'development';
const target = devMode ? 'web' : 'browserslist';
const devtool = devMode ? 'source-map' : undefined;

module.exports = {
  mode,
  target,
  devtool,
  devServer: {
    port: 3000,
    open: true,
    hot: true, // изменение стилей без перезагрузки
    watchFiles: path.join(__dirname, 'src')
  },
  entry: {
    index: path.resolve(__dirname, 'src', 'index.js'),
    menu: path.resolve(__dirname, 'src', 'menu.js'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    filename: '[name].[contenthash].js',
    assetModuleFilename: 'assets/img/[name][ext]'  // добавили путь
  },
  plugins: [
    new SpriteLoaderPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.resolve(__dirname, 'src', 'index.html'),
      chunks: ['index']
    }),
    new HtmlWebpackPlugin({
      filename: "menu.html",
      template: path.resolve(__dirname, 'src', 'menu.html'),
      chunks: ['menu']
    }),
    new FaviconsWebpackPlugin({
      logo: './src/img/favicon.ico',
      // mode: 'light', // optional can be 'webapp', 'light' or 'auto' - 'auto' by default
      // devMode: 'webapp', // optional can be 'webapp' or 'light' - 'light' by default
      prefix: 'assets/img/favicon/',
      cache: true,
      inject: HtmlWebpackPlugin => {
        return true
      },
      // favicons: {
      //   background: '#fff',
      //   theme_color: '#333'
      // }
    }),
    new MiniCssExtraPlugin({
      filename: 'style.[contenthash].css',
    })
  ],
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.(c|sa|sc)ss$/i,
        use: [
          MiniCssExtraPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [PostcssPresentEnvPlugin()],
              }
            }
          },
          'sass-loader'
        ],
      },
      {
        // test: /\.woff2?$/i,
        test: /\.woff2?$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name][ext]'
        }
      },
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
        // options: {
        //   extract: true,
        //   outputPath: 'assets/sprites/',
        //   spriteFilename: 'sprite.[hash:6].svg',
        // }
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          // {
          //   loader: 'file-loader',
          // },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
              },
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.90],
                speed: 4
              }
            }
          }
        ],
        type: 'asset/resource',
      },
    ],
  }
}