var plugins = require('gulp-load-plugins')({lazy: true});

var utils = require(global.GULP_DIR + '/utils');

module.exports = {
  dep: ['styles', 'templatecache'],
  fn: function(gulp, done) {
    utils.log('*** Building dev environment ***');
    global.environment = 'dev';

    plugins.sequence('injectJs', done);
  }
};
