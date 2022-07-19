const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const config = require('config');
const Dotenv = require('dotenv-webpack');

const assetProcessing = outDir => ({
  loader: 'url-loader',
  options: {
    limit: 10000,
    fallback: 'file-loader',
    outputPath: outDir,
  },
});

module.exports = {
  entry: ['./src/index.tsx'],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json', '.css', '.svg'],
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    alias: {
      '@app': path.resolve(__dirname, 'src/'),
      '@stores': path.resolve(__dirname, 'src/stores/'),
      '@assets': path.resolve(__dirname, 'src/assets/'),
      '@components': path.resolve(__dirname, 'src/components/'),
      '@pages': path.resolve(__dirname, 'src/pages/'),
      '@enums': path.resolve(__dirname, 'src/enums/'),
      '@constants': path.resolve(__dirname, 'src/constants/'),
    },
    fallback: {
      "crypto-browserify": require.resolve("crypto-browserify"), //if you want to use this module also don't forget npm i crypto-browserify 
      "os": require.resolve("os-browserify/browser"),
      "assert": require.resolve("assert/"),
      "fs": false,
      "tls": false,
      "net": false,
      "path": false,
      "zlib": false,
      "http": require.resolve("stream-http"),
      "https": false,
      "stream": false,
      "crypto": false,
    },
  },
  module: {
    rules: [
      {
        test: /\.(jpg|jpeg|png|gif)?$/,
        use: assetProcessing('images'),
      },
      {
        test: /\.svg?$/,
        use: ['@svgr/webpack', 'url-loader'],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)?$/,
        use: assetProcessing('fonts'),
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Crowd',
      baseHref: '/',
      template: './src/assets/index.html',
      favicon: './src/assets/images/favicon.ico'
    }),
    new webpack.DefinePlugin({
      __CONFIG__: JSON.stringify(config),
    }),
    new CopyPlugin({
      patterns: [
        { from: 'config', to: 'config' }
      ]
    }),
    new webpack.ProvidePlugin({
      process: "process/browser",
    }),
    new NodePolyfillPlugin(),
    new Dotenv(),
  ],
  optimization: {
    chunkIds: 'named',
    splitChunks: {
      cacheGroups: {
        default: false,
        vendors: false,
        common: {
          name: 'common',
          minChunks: 3,
          priority: 1,
          chunks: 'async',
          reuseExistingChunk: true,
          enforce: true,
        },
        vendor: {
          name: 'vendor',
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
        },
      },
    },
    runtimeChunk: true,
    usedExports: true,
    providedExports: true,
  },
};
