var gulp = require('gulp'),
  changed = require('gulp-changed'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  es = require('event-stream'),
  debug = require('gulp-debug'),
  filter = require('gulp-filter');

var config = require('../config');

/**
 * Shortcut funtion to uglify JS files
 *
 * @param array glob The glob
 * @param string dest File destination
 */
function uglifyModulesDir(glob, dest) {
  var stream = gulp.src(glob);

  stream.on('error', function(err) {
    console.log('Error with uglify');
  });

  // return the stream
  return stream
    // ignore jquery_update and minified files
    .pipe(filter(function(file) {
      var ignore = [/jquery_update/, /ckeditor/, /\.min\.js$/, /node_modules/],
        filter = true;
      ignore.forEach(function(ignoreItem) {
        if (ignoreItem.test(file.path)) {
          filter = false;
        }
      });
      return filter;
    }))
    .pipe(changed(dest))
    .pipe(uglify())
    .pipe(gulp.dest(dest));
}

/**
 * Compress JS files
 */
gulp.task('compress', ['bundle'], function() {
  return es.concat(
    // core JS
    gulp.src(config.paths.jsCore)
      .pipe(changed(config.base + 'build/js/misc/'))
      .pipe(uglify())
      .pipe(gulp.dest(config.base + 'build/js/misc/')),

    // process core modules JS
    gulp.src(config.paths.jsCoreModules)
      .pipe(changed(config.base + 'build/js/modules/'))
      .pipe(uglify())
      .pipe(gulp.dest(config.base + 'build/js/modules/')),

    // contrib modules
    uglifyModulesDir(
      config.paths.jsContrib,
      config.base + 'build/js/sites/all/modules/contrib/'
    ),

    // custom modules
    uglifyModulesDir(
      config.paths.jsCustom,
      config.base + 'build/js/sites/all/modules/custom/'
    ),

    // process patched modules JS
    uglifyModulesDir(
      config.paths.jsPatched,
      config.base + 'build/js/sites/all/modules/patched/'
    ),

    // process patched libraries JS
    uglifyModulesDir(
      config.paths.jsLibraries,
      config.base + 'build/js/sites/all/libraries/'
    ),

    // process theme JS
    gulp.src(config.paths.jsTheme)
      .pipe(changed(config.theme + '/build/js'))
      .pipe(uglify())
      .pipe(gulp.dest(config.theme + '/build/js'))
  );
});

gulp.task('scripts', ['bundle', 'compress']);
