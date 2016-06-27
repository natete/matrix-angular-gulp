module.exports = function () {

  var config = {};

  config.htmlmin = {
    options: {
      collapseWhitespace: true,
      conservativeCollapse: true,
      removeComments: true
    }
  }

  config.paths = {
    css: {
      dest: './assets/styles/',
      dev: './assets/sass/**/*.s+(a|c)ss',
      fileName: 'styles.css'
    },
    html: {
      all: ['./**/*.html', '!./node_modules'],
      templates: './scripts/**/*.html',
      index: './index.html'
    },
    js: {
      base: 'scripts',
      dev: './scripts/**/*.js',
      dest: './dist/scripts'
    }
  };

  config.plato = {
    dest: './reports/plato',
    options: {
      title: 'Plato report'
    }
  }

  config.templateCache = {
    dest: './scripts/app/templates/',
    fileName: 'templates.js',
    options: {
      module: 'app.core.templates',
      moduleSystem: 'IIFE',
      root: 'scripts/',
      standalone: true
    }
  }

  return config;
};
