var plugins = require('gulp-load-plugins')({lazy: true});
var webpack = require('webpack');

var args = require('yargs').argv;

var utils = require(global.GULP_DIR + '/utils');
var config = require(global.CONFIG_PATH || global.GULP_DIR + '/gulp.config');

/**
 * Starts a server serving from development environment.
 */
module.exports = {
  dep: ['build:dev'],
  fn: function (gulp, done) {
    global.environment = 'dev';

    if(config.packageMode === 'WEBPACK') {
      var webpackConfig = require(global.PROJECT_DIR + '/webpack.config.js');

      webpackConfig.devtool = 'sourcemap';
      
      var compiler = webpack(webpackConfig);
      compiler.watch({}, getWebpackCb(done));
    } else {
      callServeBase(done);
    }
  }
};

function getWebpackCb(done) {
  var calledOnce = false;

  return function(err, stats) {
    plugins.util.log('[webpack]', stats.toString({chunks: false, colors: true}));

    if(!calledOnce) {
      calledOnce = true;
      callServeBase(done);
    }
  }
}

function callServeBase(done) {
  if (args.analyze) {
    plugins.sequence('analyze', 'inject', 'serve:base', done);
  } else {
    plugins.sequence('inject', 'serve:base', done);
  }
}
