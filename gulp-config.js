module.exports = function () {

  var config = {};

  config.paths = {
    css: {
      dest: './assets/styles/',
      dev: './assets/sass/**/*.scss',
      fileName: 'styles.css',
    },
    html: {
      dev: './scripts/**/*.html',
      index: './index.html',
    },
    js: {
      dev: './scripts/**/*.js',
    }
  };

  return config;
};