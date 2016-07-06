var plugins = require('gulp-load-plugins')({lazy: true});

var args = require('yargs').argv;

var utils = require(global.GULP_DIR + '/utils');
var config = require(global.GULP_DIR + '/gulp.config');

/**
 * This task copy the project fonts into dist directory
 * Dependency: clean-fonts
 * @param {}
 */
module.exports = {
  dep: [],
  fn: function (gulp, done) {

    utils.log('***  Copying fonts ***');

    return gulp
      .src(config.paths.fonts + '/**/*')
      .pipe(gulp.dest(config.paths.dist + config.paths.fonts));
  }
};