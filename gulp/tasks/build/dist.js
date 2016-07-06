var plugins = require('gulp-load-plugins')({lazy: true});
var args = require('yargs').argv;

var utils = require(global.GULP_DIR + '/utils');
var config = require(global.GULP_DIR + '/gulp.config');

module.exports = {
  dep: ['templatecache', 'build:minify:css', 'build:minify:html', 'build:minify:js'],
  fn: function(gulp, done) {
    utils.log('*** Building dist environment ***');
    global.environment = 'dist';

    plugins.sequence('injectJs', done);
  }
};
