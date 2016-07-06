var plugins = require('gulp-load-plugins')({lazy: true});
var args = require('yargs').argv;

var utils = require(global.GULP_DIR + '/utils');
var config = require(global.GULP_DIR + '/gulp.config');

module.exports = {
  dep: ['build:minify:css', 'build:minify:html', 'build:minify:js', 'templatecache'],
  fn: function(gulp, done) {
  }
};
