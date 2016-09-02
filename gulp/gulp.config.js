module.exports = getConfig();

function getConfig() {

  var distFolder = './dist/';
  var assetsFolder = './assets/';
  var scriptsFolder = './scripts/';
  var webpackFolder = './webpack/';
  var server = './server/';
  var specsFileName = 'specs.html';
  var specsPath = './' + specsFileName;
  var jasmineHost = 'localhost';
  var jasminePort = 8090;

  var config = {};

  config.defaultPort = 7654;

  config.htmlmin = {
    options: {
      collapseWhitespace: true,
      conservativeCollapse: true,
      removeComments: true
    }
  };

  config.jshint = {
    jenkinsReport: './target/jshint-checkstyle.xml'
  };
  
  config.packageMode = 'INJECT';

  config.paths = {
    bower: './bower_components',
    css: {
      dest: distFolder + 'assets/styles/',
      dev: assetsFolder + 'styles/',
      fileName: 'styles.css'
    },
    dist: distFolder,
    devCommons: [],
    fonts: {
      dev: assetsFolder + 'fonts/**',
      dest: distFolder + 'assets/fonts'
    },
    html: {
      all: ['./**/*.html', '!./node_modules/**/*', '!./reports/**/*', '!./dist/**/*', '!./coverage/**/*'],
      dest: './dist/**/*html',
      templates: scriptsFolder + '**/*.html',
      index: './index.html'
    },
    images: {
      dev: assetsFolder + 'img/**',
      dest: distFolder + 'assets/img/'
    },
    js: {
      base: 'scripts',
      dev: scriptsFolder + '**/*.js',
      dest: distFolder + 'scripts',
      destFileName: 'bundle.js',
      modules: scriptsFolder + '**/*module.js',
      specs: scriptsFolder + '**/*.spec.js'
    },
    less: {
      dev: assetsFolder + 'less/**/*.less'
    },
    locale: {
      dev: assetsFolder + '/locale/**',
      dest: distFolder + 'assets/locale'
    },
    sass: {
      dev: assetsFolder + 'sass/**/*.s+(a|c)ss',
      watch: [assetsFolder + 'sass/**/*.s+(a|c)ss', scriptsFolder + '**/*.s+(a|c)ss']
    },
    webpack: {
      watchPath: [webpackFolder + 'scripts/**/vendor*.js', webpackFolder + 'scripts/**/app*.js'],
      bundleFile: webpackFolder + 'scripts/*.js',
      folder: webpackFolder
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
        livereload: true
      },
      dist: {
        root: distFolder,
        livereload: true
      },
      specs: {
        root: './',
        port: jasminePort,
        livereload: {
          hostname: jasmineHost,
          port: 35739
        },
        fallback: specsPath
      }
    },
    openOptions: {
      dev: {
        app: 'google-chrome', // depends on platform i.e. 'chrome' for win platforms,
        uri: 'http://localhost:8080',
        home: './index.html'
      },
      dist: {
        app: 'google-chrome', // depends on platform i.e. 'chrome' for win platforms,
        uri: 'http://localhost:8080',
        home: './dist/index.html'
      },
      specs: {
        app: 'google-chrome', // depends on platform i.e. 'chrome' for win platforms,
        uri: 'http://' + jasmineHost + ':' + jasminePort + '/' + specsFileName,
        home: specsPath
      }
    }
  };

  config.specs = {
    coverage: {
      dir: './',
      reporters: [ // possible values: html, lcov, lcovonly, text, text-summary, cobertura, teamcity, json, in-memory
        {type: 'text-summary'},
        {type: 'html', subdir: 'coverage/'},
        {type: 'cobertura', subdir: 'target/', file: 'coverage-report.xml'}
      ]
    },
    jenkinsReport: 'target/test-results.xml',
    specsFilePath: specsPath
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
  };

  return config;
}
