const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProd = process.env.NODE_ENV === 'production';
const isServer = process.env.NODE_ENV === 'server';

const babelOptions = (preset) => {
  const options = {
    presets: isProd ? ['@babel/preset-env'] : [],
  };
  if (preset) {
    options.presets.push(preset);
  }
  return options;
};

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    main: './js/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: isProd ? '[name].[contenthash].js' : '[name].js',
    assetModuleFilename: isProd ? '[path][name].[contenthash][ext]' : '[path][name][ext]',
  },
  resolve: {
    extensions: ['.js', '.sass', '.scss', '.css'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@images': path.resolve(__dirname, 'src/assets/images'),
      '@fonts': path.resolve(__dirname, 'src/assets/fonts'),
    },
  },
  devServer: {
    hot: false,
  },
  plugins: [
    new CleanWebpackPlugin({
      dry: !!isServer,
    }),
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: isProd ? 'index.[contenthash].html' : 'index.html',
    }),
    new MiniCssExtractPlugin({
      filename: isProd ? '[name].[contenthash].css' : '[name].css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.(sass|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(svg|webp|png|jpg)$/,
        type: 'asset/resource',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: babelOptions(),
        },
      },
    ],
  },
};
