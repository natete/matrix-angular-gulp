var plugins = require('gulp-load-plugins')({lazy: true});

var args = require('yargs').argv;

var utils = require(global.GULP_DIR + '/utils');
var config = require(global.GULP_DIR + '/gulp.config');

/**
 * This tasks inject the css into the index.html file
 * Dependency: null
 * @param {}
 */
module.exports = {
  dep: ['styles:' + config.style.framework],
  fn: function (gulp, done) {
    utils.log('***  Injecting css ***');

    var sources = gulp.src(config.paths.css.dest + config.paths.css.fileName, {read: false});

    return gulp
      .src(config.paths.html.index)
      .pipe(plugins.inject(sources, {relative: true}))
      .pipe(gulp.dest('./'));
  }
};