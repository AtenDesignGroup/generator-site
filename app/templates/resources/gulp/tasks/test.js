var gulp = require('gulp'),
  gutil = require('gulp-util'),
  exec = require('exec-sync');

var config = require('../config');

/**
 * Run tests
 */
gulp.task('test', function() {
  config.tests.forEach(function(test) {
    gutil.log(test);
    console.log(exec(test));
  });
});

/**
 * Run only behat tests
 */
gulp.task('behat', function() {
  config.tests.forEach(function(test) {
    if (/behat/.test(test)) {
      console.log(exec(test));
    }
  });
});

/**
 * Run only phpunit tests
 */
gulp.task('phpunit', function() {
  config.tests.forEach(function(test) {
    if (/phpunit/.test(test)) {
      console.log(exec(test));
    }
  });
});
