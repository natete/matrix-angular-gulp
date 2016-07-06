var utils = require(global.GULP_DIR + '/utils');
var config = require(global.GULP_DIR + '/gulp.config');

/**
 * This task use a function that minifies the html files present in the given path.
 */
module.exports = {
  dep: [],
  fn: function (gulp, done) {
    utils.log('***  Minifiying html files ***');

    return utils.minifyHtml(gulp, config.paths.html.all)
      .pipe(gulp.dest(config.paths.dist));
  }
};