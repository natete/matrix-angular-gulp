var plugins = require('gulp-load-plugins')({lazy: true});

var utils = require(global.GULP_DIR + '/utils');
var config = require(global.CONFIG_PATH || global.GULP_DIR + '/gulp.config');

/**
 * Copy and add a hash to the webpack bundle file
 */
module.exports = {
  dep: [],
  fn: function (gulp, done) {

    utils.log('***  Copying js file ***');

    return gulp
      .src(config.paths.webpack.bundleFile)
      .pipe(plugins.hashFilename({"format": "{name}.{hash}.min{ext}"}))
      .pipe(gulp.dest(config.paths.js.dest));
  }
};