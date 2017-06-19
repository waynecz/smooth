const path = require('path');
const webpack = require('webpack');
const conf = require('./config');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

module.exports = {
  entry: {
    app: [
      'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
      conf.entry
    ],
  },
  output: {
    path: '/js',
    filename: '[name].js',
    publicPath: "/js"
  },
  module: {
    rules: conf.rules
  },
  resolve: {
    alias: conf.devPackage
  },
  plugins: [
    new webpack.DefinePlugin({
      'ENV': JSON.stringify('development')
    }),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('./../manifest.json')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new FriendlyErrorsPlugin()
  ],
  devtool: 'source-map',
};