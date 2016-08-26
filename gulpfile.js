global.GULP_DIR = __dirname + '/gulp';
global.BASE_DIR = __dirname;

var plugins = require('gulp-load-plugins')({lazy: true});

var gulp = global.GULP || require('gulp');
var utils = require('./gulp/utils');

var config = require(global.CONFIG_PATH || global.GULP_DIR + '/gulp.config');

plugins.requireTasks({
  // separator: '-',
  path: __dirname + '/gulp/tasks',
  gulp: gulp
});

/**
 * Prints out the list  of available tasks.
 */
gulp.task('default', plugins.shell.task(['gulp --tasks']));


/**
 * Analyzes js and sass files.
 * @param exhaustive Add --exhaustive to analyze all files when analyzing from a watch task.
 * @param autofix Add --autofix if you want jscs to fix your files based on the provided rules.
 * @param strict Add --strict to prevent tasks that depend on this one to be executed.
 */
gulp.task('analyze', [], function (done) {
  utils.log('*** Performing full code analysis ***');
  plugins.sequence('analyze:jshint', 'analyze:jscs', 'analyze:sass', done);
});

/**
 * Calls the configured styles framework task to compile the files and generate a css file.
 */
gulp.task('styles', ['styles:' + config.style.framework]);
