var plugins = require('gulp-load-plugins')({lazy: true});

var utils = require(global.GULP_DIR + '/utils');
var config = require(global.CONFIG_PATH || global.GULP_DIR + '/gulp.config');

/**
 * This task copy the project fonts into dist directory
 */
module.exports = {
  dep: [],
  fn: function (gulp, done) {

    utils.log('***  Copying fonts ***');

    return gulp
      .src(config.paths.fonts.dev)
      .pipe(gulp.dest(config.paths.fonts.dest));
  }
};