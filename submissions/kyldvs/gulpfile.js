
var gulp = require('gulp');

require('kad-boilerplate')(gulp, {
  paths: {
    // For compiling src to lib.
    dest: 'lib',
    src: ['src/**/*.js'],

    // For webpack.
    entry: './src/index.js',
    dist: './dist/',
    name: 'index',
  },
});
