module.exports = getConfig();

function getConfig() {

  var distFolder = './dist/';
  var assetsFolder = './assets/';
  var scriptsFolder = './scripts/';
  var server = './server/';

  var config = {};

  config.defaultPort = 7654;

  config.htmlmin = {
    options: {
      collapseWhitespace: true,
      conservativeCollapse: true,
      removeComments: true
    }
  }

  config.paths = {
    css: {
      dest: assetsFolder + 'styles/',
      fileName: 'styles.css'
    },
    dist: distFolder,
    devCommons: [],
    fonts: assetsFolder + 'fonts/',
    html: {
      all: ['./**/*.html', '!./node_modules'],
      templates: scriptsFolder + '**/*.html',
      index: './index.html'
    },
    images: assetsFolder + 'img/',
    js: {
      base: 'scripts',
      dev: scriptsFolder + '**/*.js',
      dest: distFolder + 'scripts'
    },
    less: {
      dest: './assets/styles/',
      dev: './assets/less/**/*.less',
      fileName: 'styles.css'
    },
    sass: {
      dev: './assets/sass/**/*.s+(a|c)ss',
    },
  };

  config.node = {
    devEnvFolder: scriptsFolder,
    devIndex: './index.html',
    distEnvFolder: distFolder,
    distIndex: './index.html',
    options: {
      script: server + 'app.js',
      delayTime: 1,
      watch: [server]
    }
  };

  config.plato = {
    dest: './reports/plato',
    options: {
      title: 'Plato report'
    }
  };

  config.server = {
    options: {
      dev: {
        root: './',
        livereload: true,
      },
      dist: {
        root: distFolder,
      }
    }
  };

  //Allows to change between sass or less framework
  config.style = {
    framework: 'sass',
    autoprefixerOptions: {browsers: ['last 2 version', '> 5%']}
  };

  config.templateCache = {
    dest: scriptsFolder + 'app/templates/',
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
