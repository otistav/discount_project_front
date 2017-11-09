var webpack = require('webpack');
var path = require('path');
var loaders = require('./webpack.loaders');
var HtmlWebpackPlugin = require('html-webpack-plugin');
// var WebExtension = require('web-extension-webpack-plugin');
var LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

var BUILD_DIR = path.resolve(__dirname, 'public');
var APP_DIR = path.resolve(__dirname, 'src');

module.exports = {
  entry: {
    js: APP_DIR + '/index.js',
  },
  output: {
    filename: 'bundle.js',
    path: BUILD_DIR
  },
  module: {
    loaders
  },
  devServer: {
    contentBase: "./public",
    hot: true
  },
  plugins: [
    // new WebExtension({
    //   background: './background.js', // required
    //   port: 7031, // by default (for socket),
    //   onReload: Function.prototype // performed in background file
    // }),
    new LodashModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin(),
    new webpack.optimize.UglifyJsPlugin
  ]
};