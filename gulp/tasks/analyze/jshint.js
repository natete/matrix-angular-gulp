var plugins = require('gulp-load-plugins')({lazy: true});

var args = require('yargs').argv;

var utils = require(global.GULP_DIR + '/utils');
var config = require(global.GULP_DIR + '/gulp.config');

/**
 * Analyzes the js files using jshint.
 * @param exhaustive Add --exhaustive to analyze all files when analyzing from a watch task.
 * @param strict Add --strict to prevent tasks that depend on this one to be executed.
 */
module.exports = {
  dep: [],
  fn: function(gulp, done) {
    utils.log('***  Performing jshint analysis  ***');

    return gulp
      .src(config.paths.js.dev)
      .pipe(plugins.if(!args.exhaustive, plugins.cached('jshint')))
      .pipe(plugins.jshint())
      .pipe(plugins.jshint.reporter('jshint-stylish', {verbose: true}))
      .pipe(plugins.jshint.reporter('gulp-checkstyle-jenkins-reporter', {
        filename: config.jshint.jenkinsReport
      }))
      .pipe(plugins.if(args.strict, plugins.jshint.reporter('fail')));
  }
};
