var plugins = require('gulp-load-plugins')({lazy: true});

var args = require('yargs').argv;

var utils = require(global.GULP_DIR + '/utils');
var config = require(global.CONFIG_PATH || global.GULP_DIR + '/gulp.config');

/**
 * Analyzes the scss/sass files using scss-lint.
 * @param exhaustive Add --exhaustive to analyze all files when analyzing from a watch task.
 * @param strict Add --strict to prevent tasks that depend on this one to be executed.
 * @requires scss_lint Ruby gem.
 */
module.exports = {
  dep: [],
  fn: function (gulp, done) {
    utils.log('***  Performing sass lint analysis ***');

    return gulp
      .src(config.paths[config.style.framework].dev)
      .pipe(plugins.if(!args.exhaustive, plugins.cached('sass-lint')))
      .pipe(plugins.checkGems({gemfile: 'scss_lint'}, plugins.scssLint()))
      .pipe(plugins.if(args.strict, plugins.scssLint.failReporter()));
  }
};
