var plugins = require('gulp-load-plugins')({lazy: true});
var merge = require('merge-stream');

var args = require('yargs').argv;

var utils = require(global.GULP_DIR + '/utils');
var config = require(global.GULP_DIR + '/gulp.config');

/**
 * This task compiles all the scss partials, show the errors on the console log & concat all the files in only one.
 * In addition, inject the generated css into into the index.html file
 */
module.exports = {
  dep: ['styles:clean'],
  fn: function (gulp, done) {

    utils.log('***  Compiling Sass && Injecting Css  ***');

    //Sass
    var sass = gulp.src(config.paths.sass.dev)
      .pipe(plugins.plumber())
      .pipe(plugins.sass())
      .pipe(plugins.autoprefixer(config.style.autoprefixerOptions))
      .pipe(plugins.concat(config.paths.css.fileName))
      .pipe(gulp.dest(config.paths.css.dest));

    //Inject
    var sources = gulp.src(config.paths.css.dest + config.paths.css.fileName, {read: false});

    var inject = gulp
      .src(config.paths.html.index)
      .pipe(plugins.inject(sources, {relative: true}))
      .pipe(gulp.dest('./'));

    return merge(sass, inject);
  }
};
