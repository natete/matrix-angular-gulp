var plugins = require('gulp-load-plugins')({lazy: true});
var del = require('del');

var args = require('yargs').argv;

var utils = require(global.GULP_DIR + '/utils');
var config = require(global.GULP_DIR + '/gulp.config');

/**
 * This task clean the css directory
 * Dependency: null
 * @param: null
 */
module.exports = {
  dep: [],
  fn: function(gulp, done) {
    del(config.paths.css.dest);
    done();
  }
};
