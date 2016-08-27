var plugins = require('gulp-load-plugins')({lazy: true});
var webpack = require('webpack');

var utils = require(global.GULP_DIR + '/utils');

/**
 * Builds the project for development environment.
 */
module.exports = {
  dep: ['styles', 'templatecache', 'annotate'],
  fn: function (gulp, done) {
    utils.log('*** Building dev environment using webpack ***');
    global.environment = 'dev';

    var webpackConfig = require(global.PROJECT_DIR + '/webpack.config.js');

    webpackConfig.devtool = 'sourcemap';

    var compiler = webpack(webpackConfig);
    compiler.run(getWebpackCb(done));
  }
};

function getWebpackCb(done) {
  return function (err, stats) {
    plugins.util.log('[webpack]', stats.toString({chunks: false, colors: true}));
    done();
  };
}
