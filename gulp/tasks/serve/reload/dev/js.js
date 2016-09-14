var plugins = require('gulp-load-plugins')({lazy: true});

var args = require('yargs').argv;

var utils = require(global.GULP_DIR + '/utils');
var config = require(global.CONFIG_PATH || global.GULP_DIR + '/gulp.config');

/**
 * Reloads the dev server with the new files.
 */
module.exports = {
  dep: ['templatecache', 'inject'],
  fn: function (gulp, done) {
    global.reloadPath = config.paths.js.dev;
    if (args.analyze) {
      plugins.sequence.use(gulp)('analyze', 'serve:reload', done);
    } else {
      plugins.sequence.use(gulp)('serve:reload', done);
    }
  }
};
