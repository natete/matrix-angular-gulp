var plugins = require('gulp-load-plugins')({lazy: true});

var args = require('yargs').argv;

var utils = require(global.GULP_DIR + '/utils');
var config = require(global.GULP_DIR + '/gulp.config');

/**
 * Analyzes the js files using jscs and based on the rules found in the .jscsrc file which is required.
 * @param exhaustive Add --exhaustive to analyze all files when analyzing from a watch task.
 * @param autofix Add --autofix if you want jscs to fix your files based on the provided rules.
 */
 module.exports = {
    dep: [],
    fn: function (gulp, done) {
      utils.log('***  Performing jscs analysis  ***');

      var options = {fix: args.autofix};

      return gulp
        .src(config.paths.js.dev)
        .pipe(plugins.if(!args.exhaustive, plugins.cached('jscs')))
        .pipe(plugins.jscs(options))
        .pipe(plugins.jscsStylish())
        .pipe(plugins.if(args.autofix, gulp.dest(config.paths.js.base)));
    }
 };
