var plugins = require('gulp-load-plugins')({lazy: true});
var merge = require('merge-stream');

var args = require('yargs').argv;

var utils = require(global.GULP_DIR + '/utils');
var config = require(global.GULP_DIR + '/gulp.config');

/**
 * This task minify, hash the css and inject the css.min into the index.html file
 * Dependency: sass or less
 * @param {}
 **/
module.exports = {
  dep: ['styles:' + config.style.framework],
  fn: function (gulp, done) {

    utils.log('***  Minifiying, hashing && injecting css  ***');

    //Minify && hash
    var css = gulp.src(config.paths.css.dest + config.paths.css.fileName)
      .pipe(plugins.if(args.verbose, plugins.bytediff.start()))
      .pipe(plugins.minifyCss({keepSpecialComments: 0}))
      .pipe(plugins.if(args.verbose, plugins.bytediff.stop()))
      .pipe((plugins.hashFilename({"format": "{name}.{hash}.min{ext}"})))
      .pipe(gulp.dest(config.paths.css.dest));

    //Inject
    var inject = gulp
      .src(config.paths.html.index)
      .pipe(plugins.inject(gulp.src(config.paths.css.dest + '*min.css', {read: false}), {relative: true}))
      .pipe(gulp.dest('./'));

    return merge(css, inject);
  }
};