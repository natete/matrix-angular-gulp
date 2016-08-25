var plugins = require('gulp-load-plugins')({lazy: true});
var del = require('del');

var utils = require(global.GULP_DIR + '/utils');
var config = require(global.GULP_DIR + '/gulp.config');

/**
 * This task clean the dist directory.
 */
module.exports = {
  dep: [],
  fn: function (gulp, done) {
    utils.log('***  Cleaning dist directory ***');

    return del(config.paths.dist, {force: true});
  }
};