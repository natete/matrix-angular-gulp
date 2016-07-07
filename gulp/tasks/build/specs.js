var plugins = require('gulp-load-plugins')({lazy: true});

var utils = require(global.GULP_DIR + '/utils');
var config = require(global.GULP_DIR + '/gulp.config');

/**
 * Builds the project for karma environment.
 */
module.exports = {
  dep: ['templatecache', 'annotate'],
  fn: function (gulp, done) {
    utils.log('*** Building dev environment ***');

    global.environment = 'specs';

    plugins.sequence('inject', done);
  }
};
