
var gulp = require('gulp');

require('kad-boilerplate')(gulp, {
  paths: {
    // For compiling src to lib.
    dest: 'lib',
    src: [
      'src/**/*.js',
      '!src/**/__tests__/**/*.js',
      '!src/**/__mocks__/**/*.js',
    ],

    // For webpack.
    entry: './src/index.js',
    dist: './dist/',
    library: 'index',
  },
});
