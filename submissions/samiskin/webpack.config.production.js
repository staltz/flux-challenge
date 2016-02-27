var webpack = require('webpack')
var baseConfig = require('./webpack.config.base')

var config = Object.create(baseConfig);


config.plugins.push(
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      '__DEV__': false
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        screw_ie8: true,
        warnings: false
    }})
);

module.exports = config;
