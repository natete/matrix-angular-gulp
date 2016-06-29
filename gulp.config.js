module.exports = function () {

  var config = {
    style: {}
  };

  config.htmlmin = {
    options: {
      collapseWhitespace: true,
      conservativeCollapse: true,
      removeComments: true
    }
  }

  //Allows to change between sass or less framework
  config.style.framework = 'sass';

  config.paths = {
    css: {
      dest: './assets/styles/',
      dev: './assets/styles/styles.css',
      fileName: 'styles.min.css'
    },
    scss: {
      dest: './assets/styles/',
      dev: './assets/sass/**/*.s+(a|c)ss',
      fileName: 'styles.css'
    },
    less: {
      dest: './assets/styles/',
      dev: './assets/less/**/*.less',
      fileName: 'styles.css'
    },
    html: {
      all: ['./**/*.html', '!./node_modules/**/*'],
      templates: './scripts/**/*.html',
      index: './scripts/index.html',
      mainDirectory: './scripts/'
    },
    js: {
      base: 'scripts',
      dev: './scripts/**/*.js',
      dest: './dist/scripts'
    },
    dist: 'dist/',
    devCommons: []
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
