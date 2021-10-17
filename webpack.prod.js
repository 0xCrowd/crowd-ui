const webpack = require('webpack');
const path = require('path');
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const common = require('./webpack.common');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name]-[contenthash].js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: { cacheDirectory: true },
          },
          {
            loader: '@linaria/webpack-loader',
            options: { sourceMap: false },
          },
        ],
      },
      {
        test: /\.(css)?$/,
        use: [MiniCssExtractPlugin.loader, { loader: 'css-loader' }],
      },
    ],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new MiniCssExtractPlugin({ filename: 'styles-[contenthash].css' }),
    new webpack.DefinePlugin({
      __DEV__: false,
      __PROD__: true,
    }),
  ],
});
