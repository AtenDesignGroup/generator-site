var gulp = require('gulp'),
  glob = require('glob'),
  path = require('path'),
  source = require('vinyl-source-stream'),
  browserify = require('browserify');

var config = require('../config');

/**
 * Bundle JS
 */
gulp.task('bundle', function(cb) {
  glob(config.paths.themeBundleJS, function(er, files) {
    files.forEach(function(file) {
      var basename = path.basename(file);
      browserify(file)
        .exclude('jquery')
        .bundle()
        .pipe(source(basename))
        .pipe(gulp.dest(config.paths.themeBuiltJS));
    });
    cb(er);
  });
});
