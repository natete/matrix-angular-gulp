var plugins = require('gulp-load-plugins')({lazy: true});
var karma = require('karma');
var args = require('yargs').argv;

var utils = require(global.GULP_DIR + '/utils');
var config = require(global.GULP_DIR + '/gulp.config');

/**
  * Runs tests in serve mode. Runs over tests on every file change.
  * @param strictTest Add --strictTest to stop current execution when errors are found.
  */
module.exports = {
  dep: ['templatecache'],
  fn: function(gulp, done) {
    utils.log('*** Creating angular templates cache ***');

    var jsPaths = [config.paths.js.specs];

    var localConfig = {
      configFile: global.BASE_DIR + '/karma.conf.js',
      singleRun: false,
      autoWatch: true,
    };

    var server = new karma.Server(localConfig, function(exitCode) {
      done();
    });

    server.on('run_complete', function(browsers, results) {
      if (results.failed > 0 && args.strict) {
        // done(new Error('Failed ' + results.exitCode + ' tests.'));
        process.exit(results.exitCode);
      }
    });

    server.start();
  }
};
