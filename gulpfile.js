var plugins = require('gulp-load-plugins')({
  lazy: true
});

var config = require('./gulp.config')();

////////// TASKS ////////////

/**
 * Prints out the list  of available tasks.
 */
gulp.task('default', plugins.taskListing);


////// igonzalez tasks /////////////
gulp.task('analyze');

////// fjfernandez tasks /////////////

/**
 * This task clean the css directory
 * Dependency: null
 * @param: null
 */
gulp.task('clean-css', [], function () {
  del(config.paths.css.dest);
});

/**
 * This task compiles all the scss partials, show the errors on the console log & concat all the files in only one.
 * Dependency: clean-css
 * @param {callback} it makes the task be syncronous
 */
gulp.task('sass', ['clean-css'], function (done) {
  gulp.src(config.paths.css.dev)
    .pipe(plugins.sass())
    .on('error', plugins.sass.logError)
    .pipe(concat(config.paths.css.fileName))
    .pipe(gulp.dest(config.paths.css.dest))
    .on('end', done);
});


/**
 * This task observe the scss changes to call the compile sass function.
 * Dependency: null
 * @param {}
 */
gulp.task('watch', [], function () {
  gulp.watch(config.paths.css.dev, ['sass']);
});

/////// ACCESSORY FUNCTIONS ////////
