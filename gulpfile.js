var plugins = require('gulp-load-plugins')({
  lazy: true
});


////////// TASKS ////////////

/**
 * Prints out the list  of available tasks.
 */
gulp.task('default', plugins.taskListing);



/////// ACCESSORY FUNCTIONS ////////
