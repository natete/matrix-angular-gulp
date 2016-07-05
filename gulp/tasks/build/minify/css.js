var plugins = require('gulp-load-plugins')({lazy: true});

var args = require('yargs').argv;

var utils = require(global.GULP_DIR + '/utils');
var config = require(global.GULP_DIR + '/gulp.config');

/**
 * This task minify and hash the css
 * Dependency: sass or less
 * @param {}
 **/
module.exports = {
  dep: ['styles:' + config.style.framework],
  fn: function (gulp, done) {
    utils.log('***  Minifiying && hashing css ***');

    return gulp.src(config.paths.css.dest + config.paths.css.fileName)
      .pipe(plugins.if(args.verbose, plugins.bytediff.start()))
      .pipe(plugins.minifyCss({keepSpecialComments: 0}))
      .pipe(plugins.if(args.verbose, plugins.bytediff.stop()))
      .pipe((plugins.hashFilename({"format": "{name}.{hash}.min{ext}"})))
      .pipe(gulp.dest(config.paths.css.dest));
  }
};