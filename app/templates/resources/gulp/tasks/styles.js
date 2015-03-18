var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    path = require('path'),
    config = require('../config'),
    paths = config.paths;

gulp.task('styles', function () {
  gulp.src(paths.themeBundleCSS)
    .pipe(sass({
      errLogToConsole: true,
      includePaths: [
        paths.themeBower
      ]
    }))
    .pipe(autoprefixer({
      browsers: [
        'last 2 versions',
        'ie 9'
      ]
    }))
    .pipe(gulp.dest(paths.themeBuiltCSS));
});
