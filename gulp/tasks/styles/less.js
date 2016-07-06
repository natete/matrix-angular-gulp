var plugins = require('gulp-load-plugins')({lazy: true});
var merge = require('merge-stream');

var args = require('yargs').argv;

var utils = require(global.GULP_DIR + '/utils');
var config = require(global.GULP_DIR + '/gulp.config');

/**
 * This task compiles all the less partials, show the errors on the console log & concat all the files in only one.
 * Dependency: clean-less
 * @param {callback} it makes the task be syncronous
 */
module.exports = {
  dep: ['styles:clean'],
  fn: function (gulp, done) {

    utils.log('***  Compiling Less && Injecting Css  ***');

    //Less
    var less = gulp.src(config.paths.less.dev)
      .pipe(plugins.plumber())
      .pipe(plugins.less())
      .pipe(plugins.autoprefixer(config.style.autoprefixerOptions))
      .pipe(plugins.concat(config.paths.less.fileName))
      .pipe(gulp.dest(config.paths.less.dest));


    //Inject
    var sources = gulp.src(config.paths.css.dest + config.paths.css.fileName, {read: false});

    var inject = gulp
      .src(config.paths.html.index)
      .pipe(plugins.inject(sources, {relative: true}))
      .pipe(gulp.dest('./'));

    return merge(less, inject);
  }
};
