var plugins = require('gulp-load-plugins')({lazy: true});

var args = require('yargs').argv;

var utils = require(global.GULP_DIR + '/utils');
var config = require(global.CONFIG_PATH || global.GULP_DIR + '/gulp.config');

/**
 * Creates a new Angular module with the options specified in config,templateCache.options and adds it all templates to
 * angular template cache.
 * @param verbose Add --verbose to show the space saved for each file when minifying.
 */
module.exports = {
  dep: [],
  fn: function (gulp, done) {
    utils.log('*** Creating angular templates cache ***');

    return utils.minifyHtml(gulp, config.paths.html.templates)
      .pipe(plugins.angularTemplatecache(
        config.templateCache.fileName,
        config.templateCache.options
      ))
      .pipe(gulp.dest(config.templateCache.dest));
  }
};
