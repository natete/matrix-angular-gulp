var plugins = require('gulp-load-plugins')({lazy: true});

var args = require('yargs').argv;

var utils = require(global.GULP_DIR + '/utils');
var config = require(global.GULP_DIR + '/gulp.config');

/**
 * This task uglifies the js files and put them on the dist directory.
 * Dependency: null
 * @param {}
 */
module.exports = {
  dep: [],
  fn: function (gulp, done) {
    utils.log('***  Uglifying html files ***');

    return gulp.src(config.paths.js.dev)
      .pipe(plugins.if(args.verbose, plugins.bytediff.start()))
      .pipe(plugins.uglify())
      .pipe((plugins.hashFilename({"format": "{name}.min{ext}"})))
      .pipe(plugins.if(args.verbose, plugins.bytediff.stop()))
      .pipe(gulp.dest(config.paths.js.dest));
  }
};