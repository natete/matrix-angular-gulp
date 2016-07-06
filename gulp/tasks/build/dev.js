var plugins = require('gulp-load-plugins')({lazy: true});

var utils = require(global.GULP_DIR + '/utils');

/**
 * Builds the project for development environment.
 */
module.exports = {
  dep: ['styles', 'templatecache', 'annotate'],
  fn: function (gulp, done) {
    utils.log('*** Building dev environment ***');
    global.environment = 'dev';

    plugins.sequence('injectJs', done);
  }
};
