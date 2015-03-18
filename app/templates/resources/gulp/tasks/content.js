var gulp = require('gulp'),
  gutil = require('gulp-util'),
  yaml = require('js-yaml'),
  map = require('map-stream');

var config = require('../config');

/**
 * Convert the content YAML to JSON for use with migrate
 */
gulp.task('content', function() {
  return gulp.src(config.paths.contentYAML)
    .pipe(map(function(file, cb){
      if (file.isNull()) {
        return cb(null, file);
      }
      if (file.isStream()) {
        return cb(new Error("Streaming not supported"));
      }

      var input = String(file.contents.toString('utf8')),
        output = [];

      yaml.loadAll(input, function (doc) { output.push(doc); }, {});

      file.path = gutil.replaceExtension(file.path, '.json');
      file.contents = new Buffer(JSON.stringify(output));

      cb(null, file);
    }))
    .pipe(gulp.dest('resources/content/json/'));
});
