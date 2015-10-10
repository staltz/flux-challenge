module.exports = function(config) {
  config.set({
    frameworks: ['mocha', 'chai'],
    browsers: ['Chrome'],
    reporters: ['nyan'],
    files: [
      'src/spec/**/*.spec.*'
    ],
    webpack: {
      module: {
        loaders: [{
          test: /\.jsx$|\.js$/,
          loaders: ['babel?stage=0&optional=runtime']
        }]
      }
    },
    preprocessors: {
      'src/spec/**/*.spec.*': ['webpack']
    },
    plugins: [
      require('karma-webpack'),
      require('karma-mocha'),
      require('karma-chrome-launcher'),
      require('karma-nyan-reporter'),
      require('karma-chai')
    ]
  });
};
