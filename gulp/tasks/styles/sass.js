var plugins = require('gulp-load-plugins')({lazy: true});

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
    gulp.src(config.paths.sass.dev)
      .pipe(plugins.plumber())
      .pipe(plugins.sass())
      .pipe(plugins.autoprefixer(config.style.autoprefixerOptions))
      .pipe(plugins.concat(config.paths.css.fileName))
      .pipe(gulp.dest(config.paths.css.dest))
      .on('end', function () {
        gulp
          .src(config.paths.html.index)
          .pipe(plugins.inject(gulp.src(config.paths.css.dest + config.paths.css.fileName, {read: false}), {
            relative: true}))
          .pipe(gulp.dest('./'))
          .on('end', done);
      });
  }
};
