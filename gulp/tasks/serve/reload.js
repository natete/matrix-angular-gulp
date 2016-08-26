var plugins = require('gulp-load-plugins')({lazy: true});

var utils = require(global.GULP_DIR + '/utils');
var config = require(global.CONFIG_PATH || global.GULP_DIR + '/gulp.config');

/**
 * Reloads the server for the files in reloadPath.
 * This task is not intended to be called on its own but as a sub task called by reload tasks.
 */
module.exports = {
  dep: [],
  fn: function (gulp, done) {
    if (global.reloadPath) {
      utils.log('*** Reloading server ***');
      return gulp
        .src(global.reloadPath)
        .pipe(plugins.connect.reload());
    } else {
      logError('This task should not be called on its own. Call any of the reload-*-* instead');
    }
  }
};
