var plugins = require('gulp-load-plugins')({lazy: true});
var karma = require('karma');
var glob = require('glob');
var args = require('yargs').argv;

var utils = require(global.GULP_DIR + '/utils');
var config = require(global.GULP_DIR + '/gulp.config');

module.exports = {
  dep: ['templatecache'],
  fn: function(gulp, done) {
    utils.log('*** Creating angular templates cache ***');

    var jsPaths = glob.sync(config.paths.js.dev, {ignore: config.paths.js.specs});

    var preprocessors = {};

    jsPaths.forEach(function(item) {
      preprocessors[item] = ['coverage'];
    });

    var reporters = ['progress', 'coverage'];

    var localConfig = {
      configFile: global.BASE_DIR + '/karma.conf.js',
      singleRun: true,
      autoWatch: false,
      reporters: reporters,
      preprocessors: preprocessors
    };

    var server = new karma.Server(localConfig, function(exitCode) {
      done(exitCode && args.strict ? new Error('Failed ' + exitCode + ' tests.') : null);
    });

    server.start();
  }
};
