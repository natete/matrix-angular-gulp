var plugins = require('gulp-load-plugins')({lazy: true});
var webpack = require('webpack');

var utils = require(global.GULP_DIR + '/utils');

/**
 * Builds the project for development environment.
 */
module.exports = {
  dep: ['webpack:clean', 'styles', 'templatecache'],
  fn: function (gulp, done) {
    utils.log('*** Building dist environment using webpack ***');
    global.environment = 'dist';

    var webpackConfig = require(global.PROJECT_DIR + '/webpack.dist.config.js');

    var compiler = webpack(webpackConfig);
    compiler.run(getWebpackCb(done, gulp));

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
  plugins.sequence.use(gulp)(
    'build:clean',
    [
      'build:minify:css',
      'build:minify:html',
      'build:fonts:copy',
      'build:img:copy',
      'build:js:copy',
      'build:locale:copy'
    ],
    'inject', done);
}
