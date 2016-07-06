var plugins = require('gulp-load-plugins')({lazy: true});
var args = require('yargs').argv;
var mainBowerFiles = require('main-bower-files');

var utils = require(global.GULP_DIR + '/utils');
var config = require(global.GULP_DIR + '/gulp.config');

module.exports = {
  dep: [],
  fn: function(gulp, done) {
    switch (global.environment) {
      case 'dev':
        utils.log('*** Injecting ' + global.environment + ' js dependencies ***');
        return injectDevScripts(gulp);
        break;
      case 'dist':
        return utils.log('*** Injecting ' + global.environment + ' js dependencies ***');
        break;
      case 'specs':
        utils.log('*** Injecting ' + global.environment + ' js dependencies ***');
        return injectSpecScripts(gulp);
        break;
      default:
        utils.logError('This task should not be called on its own. Call build:dist, build: dev or build:specs instead');
        done();
        break;
    }
    // return gulp
    //   .src(config.paths.html.index)
    //   .pipe(plugins.inject(gulp.src(mainBowerFiles(), {read: false}, {name: 'bower'})))
    //   .pipe(gulp.dest(config.paths.dist));
  }
};

function injectDevScripts(gulp) {
  return gulp
    .src(config.paths.html.index)
    .pipe(injectBowerDependencies(gulp))
    .pipe(injectModules(gulp))
    .pipe(injectCommonScripts(gulp))
    .pipe(gulp.dest('./'));
}

function injectDistScripts(gulp) {
  return gulp
    .src(config.paths.html.index)
    .pipe(plugins.inject(gulp.src(config.paths.js.dest, {read: false})))
    .pipe(gulp.dest(config.paths.dist));
}

function injectSpecScripts(gulp) {
  return gulp
    .src(config.specs.specsFile)
    .pipe(injectBowerDependencies(gulp, true))
    .pipe(injectModules(gulp))
    .pipe(injectCommonScripts(gulp))
    .pipe(injectSpecs(gulp))
    .pipe(gulp.dest('./'));
}

function injectBowerDependencies(gulp, includeDev) {
  return plugins.inject(gulp.src(mainBowerFiles({includeDev: includeDev}), {read: false}), {name: 'bower'});
}

function injectModules(gulp) {
  return plugins.inject(
    gulp
      .src(config.paths.js.modules)
      .pipe(plugins.angularFilesort()), {name: 'modules'}
    );
}

function injectCommonScripts(gulp) {
  return plugins.inject(
    gulp
      .src([config.paths.js.dev, '!' + config.paths.js.specs, '!' + config.paths.js.modules])
      .pipe(plugins.angularFilesort())
    );
}

function injectSpecs(gulp) {
  return plugins.inject(
    gulp
      .src(config.paths.js.specs)
      .pipe(plugins.angularFilesort()), {name: 'specs'}
    );
}
