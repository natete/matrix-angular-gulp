var plugins = require('gulp-load-plugins')({lazy: true});

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

      var compiler = require('webpack')(require(global.PROJECT_DIR + '/webpack.config.js'));

      compiler.watch({}, getWebpackCb(done));
    } else {
      callServeBase(done);
    }

  }
};

function getWebpackCb(done) {
  var calledOnce = false;

  return function (err, stats) {
    plugins.util.log('[webpack]', stats.toString({chunks: false, colors: true}));

    if (!calledOnce) {
      calledOnce = true;
      callServeBase(done);
    }
  }
}

function callServeBase(done) {
  var sequence = [['build:dist', 'serve:base']];

  if (args.analyze) {
    sequence.unshift(['analyze']);
  }

  sequence.push(done);

  plugins.sequence.apply(this, sequence);
}
