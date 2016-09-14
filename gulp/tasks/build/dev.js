var plugins = require('gulp-load-plugins')({lazy: true});

var utils = require(global.GULP_DIR + '/utils');
var config = require(global.CONFIG_PATH || global.GULP_DIR + '/gulp.config');

/**
 * Builds the project for development environment.
 */
module.exports = {
  dep: ['styles', 'templatecache'],
  fn: function (gulp, done) {
    utils.log('*** Building dev environment ***');
    global.environment = 'dev';

    plugins.sequence.use(gulp)('inject', done);
  }
};
