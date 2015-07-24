/* jshint node:true, strict:false */
var gulp = require('gulp'),
  livereload = require('gulp-livereload'),
  requireDir = require('require-dir');

var config = require('./resources/gulp/config');

/**
 * Default task
 */
gulp.task('default', function () {
  gulp.watch(config.paths.themeSourceCSS, ['styles']).on('change', livereload.changed);
  gulp.watch(config.paths.themeSourceJS, ['scripts']).on('change', livereload.changed);
  gulp.watch(config.paths.themeBundleJS, ['scripts']).on('change', livereload.changed);
});

/**
 * Dev task
 */
gulp.task('dev', function () {
  gulp.watch([
      config.paths.themeBundleCSS,
      config.paths.themeSourceCSS
    ],
    ['styles']
  ).on('change', livereload.changed);

  gulp.watch([
      config.paths.themeSourceJS,
      config.paths.themeSourceTemplates,
      config.paths.themeBundleJS
    ],
    ['bundle']
  ).on('change', livereload.changed);
});

/**
 * Compile Compass files
 */
gulp.task('compass', function() {
  var theme = config.theme;
  // Tell bundler to use the theme's gemfile.
  process.env.BUNDLE_GEMFILE = theme + '/Gemfile';
  gulp.src(config.paths.themeSourceCSS)
    .pipe(compass({
      config_file: theme + '/config.rb',
      css: theme + '/css',
      sass: theme + '/sass',
      image: theme + '/img',
      bundle_exec: true,
      sourcemap: true
    }))
    .pipe(livereload({auto: false}));
});
