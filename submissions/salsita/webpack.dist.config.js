var path = require('path');
var webpack = require('webpack');

module.exports = {
  plugins: [
    new webpack.NoErrorsPlugin()
  ],
  entry: [
    './src/main.jsx'
  ],
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'app.bundle.js'
  },
  module: {
    loaders: [{
      test: /\.jsx$|\.js$/,
      loaders: ['react-hot', 'babel?stage=0&optional[]=runtime'],
      include: path.join(__dirname, './src')
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
};
