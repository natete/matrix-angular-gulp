var plugins = require('gulp-load-plugins')({lazy: true});

var args = require('yargs').argv;

var utils = require(global.GULP_DIR + '/utils');
var config = require(global.GULP_DIR + '/gulp.config');

/**
 * Watch js, scss and sass files and performs a complete analysis on them.
 * @param exhaustive Add --exhaustive to analyze all files. By default only changed files will be analyzed.
 * @param autofix Add --autofix if you want jscs to fix your files based on the provided rules.
 * @param strict Add --strict to prevent tasks that depend on this one to be executed.
 */
module.exports = {
  dep: ['analyze'],
  fn: function(gulp, done) {
    utils.log('*** Watching analyze ***');
    gulp.watch([config.paths.js.dev, config.paths[config.style.framework].dev], ['analyze']);
  }
};
