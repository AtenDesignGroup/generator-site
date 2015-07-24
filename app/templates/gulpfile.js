/* jshint node:true, strict:false */
var gulp = require('gulp'),
  livereload = require('gulp-livereload'),
  requireDir = require('require-dir');

var gulpPath = './resources/gulp/',
  config = require(gulpPath + 'config'),
  dir = requireDir(gulpPath + 'tasks');

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
  gulp.watch(config.paths.themeSourceCSS, ['styles']);//.on('change', livereload.changed);
  gulp.watch([
      config.paths.themeSourceJS,
      config.paths.themeSourceTemplates,
      config.paths.themeBundleJS
    ],
    ['bundle']
  );//.on('change', livereload.changed);
});
