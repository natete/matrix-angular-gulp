module.exports = function () {

  var config = {};

  config.paths = {
    css: {
      dest: './assets/styles/',
      dev: './assets/sass/**/*.s+(a|c)ss',
      fileName: 'styles.css'
    },
    html: {
      all: ['./scripts/**/*.html', './index.html'],
      dev: './scripts/**/*.html',
      index: './index.html'
    },
    js: {
      base: 'scripts',
      dev: './scripts/**/*.js',
      dest: './dist/scripts'
    },
  };

  return config;
};
