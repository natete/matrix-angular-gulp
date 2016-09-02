var plugins = require('gulp-load-plugins')({lazy: true});
var del = require('del');

var utils = require(global.GULP_DIR + '/utils');
var config = require(global.CONFIG_PATH || global.GULP_DIR + '/gulp.config');

/**
 * Clean webpack folder
 */
module.exports = {
  dep: [],
  fn: function (gulp, done) {
    utils.log('*** Cleaning webpack directory ***');

    return del(config.paths.webpack.folder, {force: true});
  }
};