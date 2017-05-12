var plugins = require('gulp-load-plugins')({lazy: true});

var args = require('yargs').argv;
var fs = require('fs');
var extend = require('extend');

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

    // read options from configuration
    var file = null;
    var opts = {};
    if(config.sassLint){
      if(config.sassLint['output-file']){
        file = fs.createWriteStream(config.sassLint['output-file']);
      }
      extend(opts, config.sassLint);
    }

    return gulp
      .src(config.paths[config.style.framework].dev)
      .pipe(plugins.if(!args.exhaustive, plugins.cached('sass-lint')))
      .pipe(plugins.sassLint())
      .pipe(plugins.sassLint.format())
      .pipe(plugins.sassLint.failOnError());
  }
};
