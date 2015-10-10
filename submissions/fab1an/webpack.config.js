module.exports = {
  entry: [
    './src/index.jsx'
  ],
  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel' },
    ]
  },
  resolve: {
    modulesDirectories: ["web_modules", "node_modules", "src"],
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/dist',
    filename: 'index.js',
  }
};
