var plugins = require('gulp-load-plugins')({lazy: true});

var args = require('yargs').argv;

var utils = require(global.GULP_DIR + '/utils');
var config = require(global.GULP_DIR + '/gulp.config');

/**
 * Starts a server in the given environment.
 * Cannot be called on its own, it's essentially a subtask to be called from another task (serve-dev or serve-dist).
 */
 module.exports = {
  dep: [],
  fn: function(gulp, done) {
    if(global.environment) {
      utils.log('*** Starting ' + global.environment + ' server ***');
      var serverOptions = config.server.options[global.environment];
      plugins.connect.server(serverOptions);
      startServerWatchers(gulp);
    } else {
      logError('This task should not be called on its own. Call serve-dev or serve-dist instead');
    }
  }
};

/**
 * Start watch tasks for each type of files depending on the environment so the server reloads on file changes.
 */
function startServerWatchers (gulp) {
  utils.log('*** Starting ' + global.environment + ' watchers ***');
  gulp.watch(config.paths.html.all, ['serve:reload-' + global.environment + '-html']);
  gulp.watch(config.paths[config.style.framework].dev, ['serve:reload-' + global.environment + '-styles']);
  gulp.watch(config.paths.js.dev, ['serve:reload-' + global.environment + '-js']);
};
