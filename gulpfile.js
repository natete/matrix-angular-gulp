var plugins = require('gulp-load-plugins')({ lazy: true });
var args = require('yargs').argv;
var gulp = require('gulp');
var config = require('./gulp.config')();

////////// TASKS ////////////

/**
 * Prints out the list  of available tasks.
 */
gulp.task('default', plugins.shell.task(['gulp --tasks']));

////// igonzalez tasks /////////////

////////// CODE ANALYSIS TASKS ////////////
/**
 * Analyzes js and sass files.
 * @param exhaustive Add --exhaustive to analyze all files when analyzing from a watch task.
 * @param autofix Add --autofix if you want jscs to fix your files based on the provided rules.
 * @param strict Add --strict to prevent tasks that depend on this one to be executed.
 */
gulp.task('analyze', ['jshint', 'jscs', 'sass-lint']);

/**
 * Watch js, scss and sass files and performs a complete analysis on them.
 * @param exhaustive Add --exhaustive to analyze all files. By default only changed files will be analyzed.
 * @param autofix Add --autofix if you want jscs to fix your files based on the provided rules.
 * @param strict Add --strict to prevent tasks that depend on this one to be executed.
 */
gulp.task('watch-analyze', ['analyze'], function() {
  gulp.watch([config.paths.js.dev, config.paths.css.dev], ['analyze']);
});

/**
* Analyzes the js files using jscs and based on the rules found in the .jscsrc file which is required.
* @param exhaustive Add --exhaustive to analyze all files when analyzing from a watch task.
* @param autofix Add --autofix if you want jscs to fix your files based on the provided rules.
*/
gulp.task('jscs', function () {
  var options = { fix: args.autofix };

  return gulp
  .src(config.paths.js.dev)
  .pipe(plugins.if(!args.exhaustive, plugins.cached('jscs')))
  .pipe(plugins.jscs(options))
  .pipe(plugins.jscsStylish())
  .pipe(plugins.if(args.autofix, gulp.dest(config.paths.js.base)));
});

/**
 * Analyzes the js files using jshint.
 * @param exhaustive Add --exhaustive to analyze all files when analyzing from a watch task.
 * @param strict Add --strict to prevent tasks that depend on this one to be executed.
 */
gulp.task('jshint', function () {
  return gulp
    .src(config.paths.js.dev)
    .pipe(plugins.if(!args.exhaustive, plugins.cached('jshint')))
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter('jshint-stylish', { verbose: true }))
    .pipe(plugins.if(args.strict, plugins.jshint.reporter('fail')));
});

/**
 * Analyzes the scss/sass files using scss-lint.
 * @param exhaustive Add --exhaustive to analyze all files when analyzing from a watch task.
 * @param strict Add --strict to prevent tasks that depend on this one to be executed.
 * @requires scss_lint Ruby gem.
 */
gulp.task('sass-lint', function() {
  return gulp
    .src(config.paths.css.dev)
    .pipe(plugins.if(!args.exhaustive, plugins.cached('sass-lint')))
    .pipe(plugins.checkGems({gemfile: 'scss_lint'}, plugins.scssLint()))
    .pipe(plugins.if(args.strict, plugins.scssLint.failReporter()));;
});

gulp.task('html-lint', function() {
  return gulp
    .src(config.paths.html.all)
    .pipe(plugins.html5Lint());
});

////////// ANGULAR TASKS ////////////
/**
 * Creates a new Angular module with the options specified in config,templateCache.options and adds it all templates to
 * angular template cache.
 * @param verbose Add --verbose to show the space saved for each file when minifying.
 */
gulp.task('template-cache', function(){
  minifyHtml(config.paths.html.templates)
    .pipe(plugins.angularTemplatecache(
      config.templateCache.fileName,
      config.templateCache.options
    ))
    .pipe(gulp.dest(config.templateCache.dest));
});

/**
 * Function that minifies all html and
 */
function minifyHtml(files) {
  return gulp
    .src(files)
    .pipe(plugins.if(args.verbose, plugins.bytediff.start()))
    .pipe(plugins.htmlmin(config.htmlmin.options))
    .pipe(plugins.if(args.verbose, plugins.bytediff.stop()));
}

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
