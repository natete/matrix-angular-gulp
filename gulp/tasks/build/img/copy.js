var plugins = require('gulp-load-plugins')({lazy: true});

var args = require('yargs').argv;

var utils = require(global.GULP_DIR + '/utils');
var config = require(global.CONFIG_PATH || global.GULP_DIR + '/gulp.config');

/**
 * This task copy and minify images into dist directory
 */
module.exports = {
  dep: [],
  fn: function (gulp, done) {

    utils.log('***  Copying and minifiying images ***');

    return gulp
      .src(config.paths.images.dev)
      .pipe(plugins.if(args.verbose, plugins.bytediff.start()))
      .pipe(plugins.imagemin())
      .pipe(plugins.if(args.verbose, plugins.bytediff.stop()))
      .pipe(gulp.dest(config.paths.images.dest));
  }
};