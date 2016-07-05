var plugins = require('gulp-load-plugins')({lazy: true});
var args = require('yargs').argv;
var glob = require('glob');
var gulp = require('gulp');
var config = require('./gulp.config')();
var del = require('del');

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
gulp.task('watch-analyze', ['analyze'], function () {
  gulp.watch([config.paths.js.dev, config.paths.css.dev], ['analyze']);
});

/**
 * Analyzes the js files using jscs and based on the rules found in the .jscsrc file which is required.
 * @param exhaustive Add --exhaustive to analyze all files when analyzing from a watch task.
 * @param autofix Add --autofix if you want jscs to fix your files based on the provided rules.
 */
gulp.task('jscs', function () {

  log('***  Performing jscs analysis  ***');
  var options = {fix: args.autofix};

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

  log('***  Performing jshint analysis  ***');
  return gulp
    .src(config.paths.js.dev)
    .pipe(plugins.if(!args.exhaustive, plugins.cached('jshint')))
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter('jshint-stylish', {verbose: true}))
    .pipe(plugins.if(args.strict, plugins.jshint.reporter('fail')));
});

/**
 * Analyzes the scss/sass files using scss-lint.
 * @param exhaustive Add --exhaustive to analyze all files when analyzing from a watch task.
 * @param strict Add --strict to prevent tasks that depend on this one to be executed.
 * @requires scss_lint Ruby gem.
 */
gulp.task('sass-lint', function () {
  log('***  Performing sass lint analysis ***');
  return gulp
    .src(config.paths.css.dev)
    .pipe(plugins.if(!args.exhaustive, plugins.cached('sass-lint')))
    .pipe(plugins.checkGems({gemfile: 'scss_lint'}, plugins.scssLint()))
    .pipe(plugins.if(args.strict, plugins.scssLint.failReporter()));
  ;
});

gulp.task('html-lint', function () {
  log('***  Performing html lint analysis ***');
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
gulp.task('template-cache', function () {
  return minifyHtml(config.paths.html.templates)
    .pipe(plugins.angularTemplatecache(
      config.templateCache.fileName,
      config.templateCache.options
      ))
    .pipe(gulp.dest(config.templateCache.dest));
});

/**
 * Create a visualizer report
 */
gulp.task('plato', function (done) {
  startPlatoVisualizer(done);
});

////// fjfernandez tasks /////////////

/**
 * This task clean the css directory
 * Dependency: null
 * @param: null
 */
gulp.task('clean-sass', [], function () {
  log('*** Cleaning css directory ***');
  del(config.paths.scss.dest);
});

/**
 * This task compiles all the scss partials, show the errors on the console log & concat all the files in only one.
 * Dependency: clean-css
 * @param {callback} it makes the task be syncronous
 */
gulp.task('sass', ['clean-sass'], function (done) {

  log('*** Sass --> Generating css file ***');

  gulp.src(config.paths.scss.dev)
    .pipe(plugins.plumber())
    .pipe(plugins.sass())
    .pipe(plugins.autoprefixer({browsers: ['last 2 version', '> 5%']}))
    .pipe(plugins.concat(config.paths.scss.fileName))
    .pipe(gulp.dest(config.paths.scss.dest))
    .on('end', done);
});

/**
 * This task observe the scss changes to call the compile sass function.
 * Dependency: null
 * @param {}
 */
gulp.task('watch-sass', ['sass'], function () {
  log('*** Watching scss files ***');
  gulp.watch(config.paths.scss.dev, ['sass']);
});

/**
 * This task clean the css directory
 * Dependency: null
 * @param: null
 */
gulp.task('clean-less', [], function () {
  log('*** Cleaning css directory ***');
  del(config.paths.less.dest);
});

/**
 * This task compiles all the less partials, show the errors on the console log & concat all the files in only one.
 * Dependency: clean-less
 * @param {callback} it makes the task be syncronous
 */
gulp.task('less', ['clean-less'], function (done) {

  log('*** Less --> Generating css file ***');

  gulp.src(config.paths.less.dev)
    .pipe(plugins.plumber())
    .pipe(plugins.less())
    .pipe(plugins.autoprefixer({browsers: ['last 2 version', '> 5%']}))
    .pipe(plugins.concat(config.paths.less.fileName))
    .pipe(gulp.dest(config.paths.less.dest))
    .on('end', done);
});

/**
 * This task observe the less changes to call the compile less function.
 * Dependency: null
 * @param {}
 */
gulp.task('watch-less', ['less'], function () {
  log('*** Watching less files ***');
  gulp.watch(config.paths.less.dev, ['less']);
});

/**
 * This task copies the app into DIST folder
 * Dependency: clean-dist, minify-html-files, uglify, fonts
 * @param {}
 */
gulp.task('generate-dist', plugins.sync(gulp).sync(['clean-dist', 'minify-html-files', 'uglify', 'inject-css-pro',
  'copy-fonts', 'copy-images']),
  function () {
    log('*** Generating Dist ***');
  });

/**
 * This task clean the dist directory.
 * Dependency: null
 * @param {}
 */
gulp.task('clean-dist', [], function () {
  log('*** Cleaning dist directory ***');
  del(config.paths.dist);
});

/**
 * This task minify and hash the css
 * Dependency: sass or less
 * @param {}
 **/
gulp.task('minify-styles', [config.style.framework], function (done) {

  log('*** Minifiying && Hashing css files ***');

  gulp.src(config.paths.css.dev)
    .pipe(plugins.if(args.verbose, plugins.bytediff.start()))
    .pipe(plugins.minifyCss({keepSpecialComments: 0}))
    .pipe(plugins.if(args.verbose, plugins.bytediff.stop()))
    .pipe((plugins.hashFilename({"format": "{name}.{hash}.min{ext}"})))
    .pipe(gulp.dest(config.paths.css.dest))
    .on('end', done);
});

/**
 * This task use a function that minifies the html files present in the given path.
 * Dependency: null
 * @param {}
 */
gulp.task('minify-html-files', [], function () {

  log('***  Minifiying html files ***');

  return minifyHtml(config.paths.html.all)
    .pipe(gulp.dest(config.paths.dist))
});

/**
 * This task uglify the js files and put them on the dist directory.
 * Dependency: null
 * @param {}
 */
gulp.task('uglify', [], function () {
  log('***  Uglifying js files ***');

  gulp.src(config.paths.js.dev)
    .pipe(plugins.ngAnnotate({
      single_quotes: true
    }))
    .pipe(plugins.if(args.verbose, plugins.bytediff.start()))
    .pipe(plugins.uglify())
    .pipe((plugins.hashFilename({"format": "{name}.min{ext}"})))
    .pipe(plugins.if(args.verbose, plugins.bytediff.stop()))
    .pipe(gulp.dest(config.paths.js.dest));
});

/**
 * This tasks inject the css into the index.html file
 * Dependency: null
 * @param {}
 */
gulp.task('inject-css-dev', [config.style.framework], function () {

  log('***  Injecting css ***');

  var sources = gulp.src(config.paths.css.dev, {read: false});

  return gulp
    .src(config.paths.html.index)
    .pipe(plugins.inject(sources, {relative: true}))
    .pipe(gulp.dest(config.paths.html.mainDirectory));
});

/**
 * This tasks inject the css.min into the index.html file
 * Dependency: null
 * @param {}
 */
gulp.task('inject-css-pro', ['minify-styles'], function () {

  log('***  Injecting css ***');

  var sources = gulp.src(config.paths.css.dest + '*min.css', {read: false});

  return gulp
    .src(config.paths.html.index)
    .pipe(plugins.inject(sources, {relative: true}))
    .pipe(gulp.dest(config.paths.html.mainDirectory));
});

/**
 * This task copy the project fonts into dist directory
 * Dependency: clean-fonts
 * @param {}
 */
gulp.task('copy-fonts', [], function () {
  log('***  Copying fonts ***');

  return gulp
    .src(config.paths.fonts + '/**/*')
    .pipe(gulp.dest(config.paths.dist + config.paths.fonts));
});

/**
 * This task clean the fonts directory
 * Dependency: null
 * @param {}
 */
gulp.task('clean-fonts', function (done) {
  log('*** Cleaning dist fonts directory  ***');
  del(config.paths.dist + config.paths.fonts, done);
});

/**
 * This task copy and minify images into dist directory
 * Dependency: null
 * @param {}
 */
gulp.task('copy-images', [], function () {
  log('***  Copying and minifiying images ***');

  return gulp
    .src(config.paths.images + '/**/*')
    .pipe(plugins.if(args.verbose, plugins.bytediff.start()))
    .pipe(plugins.imagemin())
    .pipe(plugins.if(args.verbose, plugins.bytediff.stop()))
    .pipe(gulp.dest(config.paths.dist + config.paths.images));
});

/**
 * This task clean the img directory
 * Dependency: null
 * @param {}
 */
gulp.task('clean-images', function (done) {
  log('*** Cleaning dist images directory ***');
  del(config.paths.dist + config.paths.images, done);
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
    if (done) {
      done();
    }
  }

  plato.inspect(files, outputDir, config.plato.options, platoCompleted);
}

/**
 * Prints out in the console the given message or object.
 * @param {object | string} msg object or string to be logged.
 */
function log(msg) {
  if (typeof msg === 'object') {
    for (var item in msg) {
      if (msg.hasOwnProperty(item) && typeof msg[item] === 'string' || typeof msg[item] === 'number') {
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
