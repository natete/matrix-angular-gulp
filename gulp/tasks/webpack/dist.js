var plugins = require('gulp-load-plugins')({lazy: true});
var webpack = require('webpack');

var utils = require(global.GULP_DIR + '/utils');

/**
 * Builds the project for development environment.
 */
module.exports = {
  dep: [],
  fn: function (gulp, done) {
    utils.log('*** Building dist environment using webpack ***');
    global.environment = 'dev';

    plugins.sequence('webpack:dev', 'build:dist', done);
  }
};
