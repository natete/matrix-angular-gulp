var plugins = require('gulp-load-plugins')({lazy: true});

var args = require('yargs').argv;

var utils = require(global.GULP_DIR + '/utils');
var config = require(global.CONFIG_PATH || global.GULP_DIR + '/gulp.config');

/**
 * Copy locales to dist folder.
 */
module.exports = {
  dep: [],
  fn: function (gulp, done) {

    utils.log('***  Copying locale files ***');

    return gulp
      .src(config.paths.locale.dev)
      .pipe(gulp.dest(config.paths.locale.dest));
  }
};