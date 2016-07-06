var plugins = require('gulp-load-plugins')({lazy: true});

var utils = require(global.GULP_DIR + '/utils');
var config = require(global.GULP_DIR + '/gulp.config');

module.exports = {
  dep: ['templatecache'],
  fn: function(gulp, done) {
    utils.log('*** Building dev environment ***');

    global.environment = 'specs';

    plugins.sequence('injectJs', done);
  }
};
