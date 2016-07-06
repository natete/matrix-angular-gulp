var plugins = require('gulp-load-plugins')({lazy: true});

var args = require('yargs').argv;

var utils = require(global.GULP_DIR + '/utils');
var config = require(global.GULP_DIR + '/gulp.config');

/**
 * This task minifies, hash the css and inject the css.min into the index.html file
 * Dependency: styles
 * @param verbose Add --verbose to show original and final size of all minified files.
 **/
module.exports = {
  dep: ['styles'],
  fn: function (gulp, done) {

    utils.log('***  Minifiying, hashing && injecting css  ***');

    return gulp.src(config.paths.css.dev + config.paths.css.fileName)
      .pipe(plugins.if(args.verbose, plugins.bytediff.start()))
      .pipe(plugins.minifyCss({keepSpecialComments: 0}))
      .pipe(plugins.if(args.verbose, plugins.bytediff.stop()))
      .pipe((plugins.hashFilename({"format": "{name}.{hash}.min{ext}"})))
      .pipe(gulp.dest(config.paths.css.dest));
  }
};
