var plugins = require('gulp-load-plugins')({lazy: true});

var args = require('yargs').argv;

var utils = require(global.GULP_DIR + '/utils');
var config = require(global.GULP_DIR + '/gulp.config');

/**
 * Reloads the dev server with the new files.
 */
module.exports = {
  dep: ['build:minify:css'],
  fn: function (gulp, done) {
    global.reloadPath = config.paths.css.dest + '*.css';
    if (args.analyze) {
      plugins.sequence('analyze', 'styles:' + config.style.framework, 'serve:reload', done);
    } else {
      plugins.sequence('styles:' + config.style.framework, 'serve:reload', done);
    }
  }
};
