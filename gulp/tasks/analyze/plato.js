var plugins = require('gulp-load-plugins')({lazy: true});
var glob = require('glob');

var args = require('yargs').argv;

var utils = require(global.GULP_DIR + '/utils');
var config = require(global.GULP_DIR + '/gulp.config');

/**
 * Perform a complete js analysis and creates a report to be visualized in the browser.
 * @param verbose Add --verbose to show an overview report in the console.
 */
module.exports = {
  dep: [],
  fn: function(gulp, done) {
      utils.log('*** Performing analysis and preparing Plato report ***');
      startPlatoVisualizer(done);
      if (args.verbose) {
        plugins.util.log(plugins.util.colors.blue('Plato report overview'));
      }
  }
}

/**
 * Starts Plato Visualizer so it analyzes the code and wraps the analysis in a report.
 * @param {function} done callback fucntion.
 */
function startPlatoVisualizer(done) {
  var plato = require('plato');

  var files = glob.sync(config.paths.js.dev);

  var outputDir = config.plato.dest;

  function platoCompleted(report) {
    var overview = plato.getOverviewReport(report);
    if (args.verbose) {
      utils.log(overview.summary);
    }
    utils.log('Your report is available at: file://' + global.BASE_DIR + outputDir.slice(1) + '/index.html' );
    if (done) {
      done();
    }
  }

  plato.inspect(files, outputDir, config.plato.options, platoCompleted);
}
