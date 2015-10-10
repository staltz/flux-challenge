var webpack = require('webpack');

function getEntrySources(sources) {
  if (process.env.NODE_ENV !== 'production') {
    sources.push('webpack-dev-server/client?http://localhost:8080');
    sources.push('webpack/hot/only-dev-server');
  }

  return sources;
}

module.exports = {
  devtool: process.env.NODE_ENV !== 'production' ? 'eval-source-map' : '',
  entry: {
    bundle: getEntrySources([
      './src/app.js'
    ])
  },
  output: {
    publicPath: 'http://localhost:8080/',
    filename: 'dist/[name].js'
  },
  module: {
    preLoaders: [{
      test: /\.js$/,
      loader: 'source-map-loader'
    }],
    loaders: [{
      test: /\.js$/,
      loaders: ['react-hot', 'babel-loader?stage=0', 'eslint-loader'],
      exclude: /node_modules/
    }]
  }
};
