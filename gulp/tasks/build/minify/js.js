var plugins = require('gulp-load-plugins')({lazy: true});
var mainBowerFiles = require('main-bower-files');

var args = require('yargs').argv;

var utils = require(global.GULP_DIR + '/utils');
var config = require(global.GULP_DIR + '/gulp.config');

/**
 * Minifies the js files, concatenates them, renames the result adding a hash to the filename and puts it into the dist directory.
 * @param verbose Add --verbose to show original and final size of all minified files.
 */
module.exports = {
  dep: [],
  fn: function (gulp, done) {
    utils.log('***  Uglifying javascript files ***');

    return gulp.src([config.paths.js.modules, config.paths.js.dev, '!' + config.paths.js.specs])
      .pipe(plugins.if(args.verbose, plugins.bytediff.start()))
      .pipe(plugins.uglify())
      .pipe(plugins.if(args.verbose, plugins.bytediff.stop()))
      .pipe(plugins.addSrc.prepend(mainBowerFiles(null, null, plugins.plumber)))
      .pipe(plugins.concat(config.paths.js.destFileName))
      .pipe((plugins.hashFilename({"format": "{name}.{hash}.min{ext}"})))
      .pipe(gulp.dest(config.paths.js.dest));
  }
};
