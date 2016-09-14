var plugins = require('gulp-load-plugins')({lazy: true});
var webpack = require('webpack');
var args = require('yargs').argv;

var utils = require(global.GULP_DIR + '/utils');
var config = require(global.GULP_DIR + '/gulp.config');

/**
 * Starts a server serving from development environment.
 */
module.exports = {
  dep: [],
  fn: function (gulp, done) {

    global.environment = 'dist';

    if (config.packageMode === 'WEBPACK') {

      var compiler = webpack(require(global.PROJECT_DIR + '/webpack.div.config.js'));

      compiler.run(getWebpackCb(done, gulp));
    } else {
      callServeBase(done, gulp);
    }

  }
};

function getWebpackCb(done, gulp) {
  var calledOnce = false;

  return function (err, stats) {
    plugins.util.log('[webpack]', stats.toString({chunks: false, colors: true}));

    if (!calledOnce) {
      calledOnce = true;
      callServeBase(done, gulp);
    }
  }
}

function callServeBase(done, gulp) {
  if (config.packageMode === 'WEBPACK') {
    var sequence = [['webpack:dist', 'serve:base']];
  } else {
    var sequence = [['build:dist', 'serve:base']];
  }

  if (args.analyze) {
    sequence.unshift(['analyze']);
  }

  sequence.push(done);

  plugins.sequence.use(gulp).apply(this, sequence);
}
