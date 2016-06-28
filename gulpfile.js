var plugins = require('gulp-load-plugins')({ lazy: true });
var args = require('yargs').argv;
var glob = require('glob');
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
gulp.task('analyze', ['jshint', 'jscs', 'sass-lint', 'html-lint']);

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
 * Perform a complete js analysis and creates a report to be visualized in the browser.
 * @param verbose Add --verbose to show an overview report in the console.
 */
gulp.task('plato', function(done) {
    startPlatoVisualizer(done);
    if (args.verbose) {
      plugins.util.log(plugins.util.colors.blue('Plato report overview'));
    }
});

/**
* Analyzes the js files using jscs and based on the rules found in the .jscsrc file which is required.
* @param exhaustive Add --exhaustive to analyze all files when analyzing from a watch task.
* @param autofix Add --autofix if you want jscs to fix your files based on the provided rules.
*/
gulp.task('jscs', function () {

  log('Performing jscs analysis');
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

  log('(Performing jshint analysis');
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
  log('Performing sass lint analysis');
  return gulp
    .src(config.paths.css.dev)
    .pipe(plugins.if(!args.exhaustive, plugins.cached('sass-lint')))
    .pipe(plugins.checkGems({gemfile: 'scss_lint'}, plugins.scssLint()))
    .pipe(plugins.if(args.strict, plugins.scssLint.failReporter()));;
});

gulp.task('html-lint', function() {
  log('Performing html lint analysis');
  return gulp
    .src(config.paths.html.templates)
    .pipe(plugins.html5Lint());
});

////////// ANGULAR TASKS ////////////
/**
 * Creates a new Angular module with the options specified in config,templateCache.options and adds it all templates to
 * angular template cache.
 * @param verbose Add --verbose to show the space saved for each file when minifying.
 */
gulp.task('template-cache', function(){
  return minifyHtml(config.paths.html.templates)
    .pipe(plugins.angularTemplatecache(
      config.templateCache.fileName,
      config.templateCache.options
    ))
    .pipe(gulp.dest(config.templateCache.dest));
});

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


/**
 * Function that minifies the html files present in the given path and returns the stream.
 * @param {string | array} files The path or paths of the html files to be minified.
 */
function minifyHtml(files) {
  return gulp
    .src(files)
    .pipe(plugins.if(args.verbose, plugins.bytediff.start()))
    .pipe(plugins.htmlmin(config.htmlmin.options))
    .pipe(plugins.if(args.verbose, plugins.bytediff.stop()));
}

/**
 * Starts Plato Visualizer so it analyzes the code and wraps the analysis in a report.
 * @param {function} done callback fucntion.
 */
function startPlatoVisualizer(done) {
  var plato = require('plato');

  var files = glob.sync(config.paths.js.dev);

  var outputDir = config.plato.dest;

  function platoCompleted(report) {
        var overview = plato.getOverviewReport(report);
        if (args.verbose) {
          log(overview.summary);
        }
        if (done) { done(); }
    }

  plato.inspect(files, outputDir, config.plato.options, platoCompleted);
}

/**
 * Prints out in the console the given message or object.
 * @param {object | string} msg object or string to be logged.
 */
function log(msg) {
  if(typeof msg === 'object') {
    for(var item in msg) {
      if(msg.hasOwnProperty(item) && typeof msg[item] === 'string' || typeof msg[item] === 'number' ) {
        plugins.util.log('\t' + plugins.util.colors.cyan(item) + ': ' + plugins.util.colors.white(msg[item]));
      } else if (msg.hasOwnProperty(item)) {
        plugins.util.log(plugins.util.colors.blue(item));
        log(msg[item]);
      }
    }
  } else {
    plugins.util.log(plugins.util.colors.blue(msg));
  }
}
