var plugins = require('gulp-load-plugins')({lazy: true});

var utils = require(global.GULP_DIR + '/utils');
var config = require(global.CONFIG_PATH || global.GULP_DIR + '/gulp.config');

/**
 * Opens a browser with the specified environment.
 */
module.exports = {
  dep: [],
  fn: function (gulp, done) {
    if (global.environment) {
      utils.log('*** Opening browser ***');
      return gulp
        .src(config.server.openOptions[global.environment].home)
        .pipe(plugins.open(config.server.openOptions[global.environment]));
    } else {
      utils.logError('This task should not be called on its own. Call serve:dev, serve:dist or specs:serve instead');
    }
  }
};
