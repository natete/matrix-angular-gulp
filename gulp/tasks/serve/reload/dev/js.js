var plugins = require('gulp-load-plugins')({lazy: true});

var args = require('yargs').argv;

var utils = require(global.GULP_DIR + '/utils');
var config = require(global.GULP_DIR + '/gulp.config');

/**
 * Reloads the dev server with the new files.
 */
module.exports = {
  dep: ['templatecache'],
  fn: function (gulp, done) {
    global.reloadPath = config.paths.js.dev;
    if (args.analyze) {
      plugins.sequence('analyze', 'serve:reload', done);
    } else {
      plugins.sequence('serve:reload', done);
    }
  }
};
