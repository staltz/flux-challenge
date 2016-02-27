'use strict'

var webpack = require('webpack')
var baseConfig = require('./webpack.config.base')

var config = Object.create(baseConfig);

config.entry = [
  'babel-polyfill',
  'webpack-hot-middleware/client',
  './src/app'
];

config.devtool = 'cheap-module-eval-source-map';

config.plugins.push(
  new webpack.HotModuleReplacementPlugin(),
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('development'),
    '__DEV__': true
  })
);

module.exports = config
