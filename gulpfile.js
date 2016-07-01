var plugins = require('gulp-load-plugins')({lazy: true});
var args = require('yargs').argv;
var glob = require('glob');
var gulp = require('gulp');
var config = require('./gulp.config')();
var del = require('del');

var port = process.env.PORT || config.defaultPort;

var environment;
var error;
var reloadPath;


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
gulp.task('analyze', [], function(done) {
  log('*** Performing full code analysis ***');
  plugins.sequence('jshint', 'jscs', 'sass-lint', done);
});

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
 * Perform a complete js analysis and creates a report to be visualized in the browser.
 * @param verbose Add --verbose to show an overview report in the console.
 */
gulp.task('plato', function(done) {
    log('*** Performing analysis and preparing Plato report ***');
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
    .src(config.paths[config.style.framework].dev)
    .pipe(plugins.if(!args.exhaustive, plugins.cached('sass-lint')))
    .pipe(plugins.checkGems({gemfile: 'scss_lint'}, plugins.scssLint()))
    .pipe(plugins.if(args.strict, plugins.scssLint.failReporter()));
});

//gulp.task('html-lint', function () {
//  log('***  Performing html lint analysis ***');
//
//  return gulp
//    .src(config.paths.html.templates)
//    .pipe(plugins.html5Lint());
//});

////////// ANGULAR TASKS ////////////
/**
 * Creates a new Angular module with the options specified in config,templateCache.options and adds it all templates to
 * angular template cache.
 * @param verbose Add --verbose to show the space saved for each file when minifying.
 */
gulp.task('template-cache', function () {
  log('*** Creating angular templates cache ***');

  return minifyHtml(config.paths.html.templates)
    .pipe(plugins.angularTemplatecache(
      config.templateCache.fileName,
      config.templateCache.options
      ))
    .pipe(gulp.dest(config.templateCache.dest));
});

///////// SERVE TASKS ///////////////
/**
 * Starts a server serving from development environment.
 */
gulp.task('serve-dev', [config.style.framework, 'template-cache'],  function (done) {
  environment = 'dev';
  if (args.analyze) {
    plugins.sequence('analyze', 'serve', done);
  } else {
    plugins.sequence('serve', done);
  }
});

/**
 * Starts a server serving from distribution environment.
 */
gulp.task('serve-dist', [/* TODO add copy dependencies */], function () {
  environment = 'dist';
  log('*** Starting dist server ***');
  if (args.analyze) {
    plugins.sequence('analyze', 'serve', done);
  } else {
    plugins.sequence('serve', done);
  }
});

/**
 * Start watch tasks for each type of files depending on the environment so the server reloads on file changes.
 */
function startServerWatchers () {
  log('*** Starting ' + environment + ' watchers ***');
  gulp.watch(config.paths.html.all, ['reload-' + environment + '-html']);
  gulp.watch(config.paths[config.style.framework].dev, ['reload-' + environment + '-styles']);
  gulp.watch(config.paths.js.dev, ['reload-' + environment + '-js']);
};

/**
 * Starts a server in the given environment.
 * Cannot be called on its own, it's essentially a subtask to be called from another task (serve-dev or serve-dist).
 */
gulp.task('serve', function (done) {
  if(environment) {
    log('*** Starting ' + environment + ' server ***');
    var serverOptions = config.server.options[environment];
    plugins.connect.server(serverOptions);
    startServerWatchers();  
  } else {
    logError('This task should not be called on its own. Call serve-dev or serve-dist instead');
  }
});

/**
 * Reloads the dev server with the new files.
 */
gulp.task('reload-dev-html', ['template-cache'], function() {
  return gulp
    .src([config.paths.html.all, config.templateCache.dest])
    .pipe(plugins.connect.reload());
});

/**
 * Reloads the dev server with the new files.
 */
gulp.task('reload-dev-styles', function() {
  reloadPath = config.paths.css.dest + '*.css';
  if (args.analyze) {
    plugins.sequence('analyze', config.style.framework, 'reload-server', done);
  } else {
    plugins.sequence(config.style.framework, 'reload-server', done);
  }
});

/**
 * Reloads the dev server with the new files.
 */
gulp.task('reload-dev-js', function(done) {
  reloadPath = config.paths.js.dev;
  if (args.analyze) {
    plugins.sequence('analyze', 'template-cache', 'reload-server', done);
  } else {
    plugins.sequence('template-cache', 'reload-server', done);
  }
});

/**
 * Reloads the distribution server with the new files.
 */
gulp.task('reload-dist-html', [/* TODO add copy dependencies */], function() {
  return gulp
    .src([config.paths.dist + '**/*.html', config.paths.dist + '**/*.js'])
    .pipe(plugins.connect.reload());
});

/**
 * Reloads the dist server with the new files.
 */
gulp.task('reload-dist-styles', function() {
  // TODO add copy dependencies
  reloadPath = config.paths.dist + '**/*.css';
  if (args.analyze) {
    plugins.sequence('analyze', config.style.framework, 'reload-server', done);
  } else {
    plugins.sequence(config.style.framework, 'reload-server', done);
  }
});

/**
 * Reloads the dist server with the new files.
 */
gulp.task('reload-dist-js', ['template-cache'/* TODO add copy dependencies */], function() {
  // TODO add copy dependencies
  reloadPath = config.paths.dist + '**/*.js';
  if (args.analyze) {
    plugins.sequence('analyze', 'template-cache', 'reload-server', done);
  } else {
    plugins.sequence('template-cache', 'reload-server', done);
  }
});

/**
 * Reloads the server for the files in reloadPath.
 * This task is not intended to be called on its own but as a sub task called by reload tasks.
 */
gulp.task('reload-server', function() {
  if (reloadPath) {
    log('*** Reloading server ***');
    return gulp
      .src(reloadPath)
      .pipe(plugins.connect.reload());
  } else {
    logError('This task should not be called on its own. Call any of the reload-*-* instead');
  }
});


//////// TESTING TASKS //////////////


////// fjfernandez tasks /////////////

/**
 * This task clean the css directory
 * Dependency: null
 * @param: null
 */
gulp.task('clean-sass', [], function () {
  del(config.paths.css.dest);
});

/**
 * This task compiles all the scss partials, show the errors on the console log & concat all the files in only one.
 * Dependency: clean-css
 * @param {callback} it makes the task be syncronous
 */
gulp.task('sass', ['clean-sass'], function (done) {
  gulp.src(config.paths.sass.dev)
    .pipe(plugins.plumber())
    .pipe(plugins.sass())
    .pipe(plugins.autoprefixer({browsers: ['last 2 version', '> 5%']}))
    .pipe(plugins.concat(config.paths.css.fileName))
    .pipe(gulp.dest(config.paths.css.dest))
    .on('end', done);
});

/**
 * This task observe the scss changes to call the compile sass function.
 * Dependency: null
 * @param {}
 */
gulp.task('watch-sass', ['sass'], function () {
  gulp.watch(config.paths.sass.dev, ['sass']);
});


/**
 * This task clean the css directory
 * Dependency: null
 * @param: null
 */
gulp.task('clean-less', [], function () {
  del(config.paths.less.dest);
});

/**
 * This task compiles all the less partials, show the errors on the console log & concat all the files in only one.
 * Dependency: clean-less
 * @param {callback} it makes the task be syncronous
 */
gulp.task('less', ['clean-less'], function (done) {
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
  gulp.watch(config.paths.less.dev, ['less']);
});

/**
 * This task copies the app into DIST folder
 * Dependency: clean-dist, minify-html, minify-js
 * @param {}
 */
gulp.task('generate-dist', plugins.sync(gulp).sync(['clean-dist', 'minify-html', 'minify-js']), function () {});

/**
 * This task clean the dist directory.
 * Dependency: null
 * @param {}
 */
gulp.task('clean-dist', [], function () {
  del(config.paths.dist);
});

/**
 * This task minify and hash the css
 * Dependency: sass or less
 * @param {}
 **/
gulp.task('minify-styles', [config.style.framework], function (done) {
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
gulp.task('minify-html', [], function () {
  return minifyHtml(config.paths.html.all)
    .pipe(gulp.dest(config.paths.dist))
});

/**
 * This task uglifies the js files and put them on the dist directory.
 * Dependency: null
 * @param {}
 */
gulp.task('minify-js', [], function () {
  gulp.src(config.paths.js.dev)
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

  var sources = gulp.src(config.paths.css.dest + '*min.css', {read: false});

  return gulp
    .src(config.paths.html.index)
    .pipe(plugins.inject(sources, {relative: true}))
    .pipe(gulp.dest(config.paths.html.mainDirectory));
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
    log('Your report is available at: file://' + __dirname + outputDir.slice(1) + '/index.html' );
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

/**
 * Prints out in the console the given message or object.
 * @param {object | string} msg object or string to be logged.
 */
function logError(msg) {
  if (typeof msg === 'object') {
    for (var item in msg) {
      if (msg.hasOwnProperty(item) && typeof msg[item] === 'string' || typeof msg[item] === 'number') {
        plugins.util.log('\t' + plugins.util.colors.red(item) + ': ' + plugins.util.colors.red(msg[item]));
      } else if (msg.hasOwnProperty(item)) {
        plugins.util.log(plugins.util.colors.red(item));
        log(msg[item]);
      }
    }
  } else {
    plugins.util.log(plugins.util.colors.red(msg));
  }
}
