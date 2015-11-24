"use strict";
function bundle(inFile, outFile, done) {
    console.log("broswerifying", inFile)
    const browserify = require('browserify');
    const fs = require('fs');
    const b = browserify();
    b.add(inFile);
    b.bundle()
     .pipe(fs.createWriteStream(outFile))
     .on('close', done);
}

function debounce(f, n) {
  let timeout = null;
  const doit = (args) => () => {
    timeout = null;
    f.apply(null, args)
  };
  return function () {
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(doit(Array.prototype.slice.call(arguments, 0)), n);
  }
}

const doBundle = debounce((done) => {
    bundle('./tsbuild/main.js', './script.js', done);
}, 500);

module.exports = function (grunt) {
  const exec = require('child_process').exec;
  grunt.registerTask('build', function () {
    const done = this.async();
    exec('tsc', function () {
      doBundle(done);
    });
  });

  const fs = require('fs');

  grunt.registerTask('watch', function () {
    this.async();
    exec('tsc --watch').stdout.pipe(require('process').stdout);
    require('watch').watchTree('./tsbuild', {interval: 400}, () => {
      doBundle(() => null)
    });
  });


  grunt.registerTask('default', ['watch']);
};
