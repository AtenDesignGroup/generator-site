var gulp = require('gulp'),
  phpcs = require('gulp-phpcs');

var config = require('../config');

gulp.task('phpcs', function () {
  return gulp.src(config.paths.phpCS)
    // Validate files using PHP Code Sniffer
    .pipe(phpcs({
      standard: 'Drupal',
      warningSeverity: 0,
      sniffCodes: true
    }))
    // Log all problems that was found
    .pipe(phpcs.reporter('log'));
});
