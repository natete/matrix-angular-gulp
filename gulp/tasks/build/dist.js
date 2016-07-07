var plugins = require('gulp-load-plugins')({lazy: true});

var utils = require(global.GULP_DIR + '/utils');
var config = require(global.GULP_DIR + '/gulp.config');

/**
 * Builds the project for production environment.
 */
module.exports = {
  dep: [
    'build:clean',
    'templatecache',
    'annotate',
    'build:minify:css',
    'build:minify:html',
    'build:minify:js',
    'build:fonts:copy',
    'build:img:copy'
  ],
  fn: function (gulp, done) {
    utils.log('*** Building dist environment ***');

    global.environment = 'dist';

    plugins.sequence('inject', done);
  }
};
