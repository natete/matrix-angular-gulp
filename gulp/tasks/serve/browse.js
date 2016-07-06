var plugins = require('gulp-load-plugins')({lazy: true});

var args = require('yargs').argv;

var utils = require(global.GULP_DIR + '/utils');
var config = require(global.GULP_DIR + '/gulp.config');

 module.exports = {
  dep: [],
  fn: function(gulp, done) {
    if(global.environment) {
      utils.log('*** Opening browser ***');
      return gulp
        .src(config.server.openOptions[global.environment].home)
        .pipe(plugins.open(config.server.openOptions[global.environment]));
    } else {
      utils.logError('This task should not be called on its own. Call serve:dev or specs:serve instead');
    }
  }
};
