var plugins = require('gulp-load-plugins')({lazy: true});

var args = require('yargs').argv;

var utils = require(global.GULP_DIR + '/utils');
var config = require(global.GULP_DIR + '/gulp.config');

/**
 * This task observe the scss changes to call the compile sass function.
 * Dependency: null
 * @param {}
 */
module.exports = {
  dep: ['styles:' + config.style.framework],
  fn: function(gulp, done) {
    gulp.watch(config.paths[config.style.framework].dev, ['styles:' + config.style.framework]);
  }
};
