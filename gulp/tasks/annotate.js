var plugins = require('gulp-load-plugins')({lazy: true});

var utils = require(global.GULP_DIR + '/utils');
var config = require(global.CONFIG_PATH || global.GULP_DIR + '/gulp.config');

/**
 * Adds $inject arrays to angular functions.
 */
module.exports = {
  dep: [],
  fn: function (gulp, done) {
    utils.log('***  Injecting DI annotations ***');

    return gulp
      .src(config.paths.js.dev)
      .pipe(plugins.ngAnnotate({
        single_quotes: true,
        add: true,
        remove: true
      }))
      .pipe(gulp.dest(config.paths.js.base));
  }
};