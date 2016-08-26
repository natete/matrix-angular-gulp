var plugins = require('gulp-load-plugins')({lazy: true});

var utils = require(global.GULP_DIR + '/utils');
var config = require(global.CONFIG_PATH || global.GULP_DIR + '/gulp.config');

/**
 * Reloads the dev server with the new files.
 */
module.exports = {
  dep: ['templatecache'],
  fn: function (gulp, done) {
    return gulp
      .src(config.paths.html.all.concat(config.templateCache.dest))
      .pipe(plugins.connect.reload());
  }
};
