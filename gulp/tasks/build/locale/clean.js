var plugins = require('gulp-load-plugins')({lazy: true});
var del = require('del');

var utils = require(global.GULP_DIR + '/utils');
var config = require(global.CONFIG_PATH || global.GULP_DIR + '/gulp.config');

/**
 * Clean locale dist folder.
 */
module.exports = {
  dep: [],
  fn: function (gulp, done) {
    utils.log('*** Cleaning dist locale directory ***');

    return del(config.paths.locale.dest, {force: true});
  }
};