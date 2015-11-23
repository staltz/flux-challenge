'use strict';

const path = require('path');
const webpack = require('webpack');
// var pkg = require('./package.json');
const autoprefixer = require('autoprefixer');
const precss = require('precss');
const postcssImport = require('postcss-import');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './src/app'
  ],

  output: {
    path: __dirname,
    filename: 'bundle.js',
  },

  resolve: {
    root: path.join(__dirname, 'src'),
    modulesDirectories: ['node_modules', 'components', 'src', 'lib'],
    extensions: ['', '.js'],
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],

  postcss: function(webpackDependency) {
    return [
      postcssImport({
        addDependencyTo: webpackDependency,
        path: '/'
      }),
      autoprefixer,
      precss
    ];
  },

  module: {
    loaders: [
      {test: /\.jsx?$/, loaders: ['react-hot', 'babel'], exclude: /node_modules/},
      {test: /\.json$/, loader: 'json'},
      {test: /\.css$/, loaders: ['style', 'css?modules', 'postcss']}
    ]
  },

  devtool: '#inline-source-map'

};
