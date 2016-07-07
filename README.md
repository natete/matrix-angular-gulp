<a href="http://www.emergya.es/">
<img src="https://github.com/natete/angular-matrix-gulp/blob/master/assets/img/logo-repo-mini.png" align="right" />
</a>

# Angular / Gulp Patterns

![repo-logo](https://github.com/natete/angular-matrix-gulp/blob/master/assets/img/logo-repo.png)

## Synopsis

This repository contains some **[gulp](http://gulpjs.com/ "Gulp")** tasks. They can be applied using **[AngularJS](https://angularjs.org/ "AngularJS")** version 1. There is a main *gulpfile.js* with some general tasks, more specific tasks can be found in the **gulp/tasks** folder. The proposed project structure is:

```
├── assets
│   ├── fonts
│   ├── img
│   ├── (sass | less)
│   └── styles
├── gulp
│   ├── tasks
│   └── gulp.config,js
├── scripts
│   └── app
│       ├── landing
│       │   ├── landing.controller.js
│       │   ├── landing.html
│       │   └── landing.module.js
│       └── app.js
├── gulpfile.js
└── index.html
```
There are many configurable options in the *gulp.config.js* so you can adapt the tasks to your own project structure.

## Tasks
### Code analysis Tasks
  - **analyze**
    - *Description*: Performs jshint, jscs and sass analysis.
    - *Params*:
      - *exhaustive*: Add --exhaustive to analyze all files when analyzing from a watch  task.
      - *autofix*: Add --autofix if you want jscs to fix your files based on the provided rules.
      - *strict*: Add --strict to prevent tasks that depend on this one to be executed if errors are found.
    - *Requirements*:
      - [analyze:jscs, analyze:jshint, analyze:sass]


  - **analyze:jscs**
    - Description: Analyzes the js files using jscs and based on the rules found in the .jscsrc file which is required.
    - Params:
      - *exhaustive*: Add --exhaustive to analyze all files when analyzing from a watch  task.
      - *autofix*: Add --autofix if you want jscs to fix your files based on the provided rules.


  - **analyze:jshint**
    - Description: Analyzes the js files using jshint.
    - Params:
      - *exhaustive*: Add --exhaustive to analyze all files when analyzing from a watch  task.
      - *strict*: Add --strict to prevent tasks that depend on this one to be executed if errors are found.


  - **analyze:plato**
    - Description: Performs a complete js analysis and creates a report to be visualized in the browser.
    - Params:
     - *verbose*: Add --verbose to show an overview report in the console.


  - **analyze:sass**
    - Description: Analyzes the scss/sass files using scss-lint.
    - Params:
      - *exhaustive*: Add --exhaustive to analyze all files when analyzing from a watch task.
      - *strict*: Add --strict to prevent tasks that depend on this one to be executed if errors are found.
    - Requirements:
      - scss_lint Ruby gem.


  - **analyze:watch**
    - Description: Watches js, scss and sass files and performs a complete analysis on them.
    - Params:
      - *exhaustive*: Add --exhaustive to analyze all files when analyzing from a watch  task.
      - *autofix*: Add --autofix if you want jscs to fix your files based on the provided rules.
      - *strict*: Add --strict to prevent tasks that depend on this one to be executed if errors are found.
    - Requirements:
      - [analyze]

---

### Build tasks
  - **build:clean**
    - *Description*: Cleans the dist directory.


  - **build:dev**
    - *Description*: Builds the project for development environment.


  - **build:dist**
    - *Description*: Builds the project for production environment.


  - **build:specs**
    - *Description*: Builds the project for karma environment.


  - **build:fonts:clean**
    - *Description*: Cleans the fonts directory.


  - **build:fonts:copy**
    - *Description*: Copies the project fonts into dist directory.


  - **build:img:clean**
    - *Description*: Cleans the dist images directory.


  - **build:img:copy**
    - *Description*: Copies the project images into dist directory.


  - **build:minify:css**
    - *Description*: Minifies, hashes the css filename and copies it to the corresponding dist directory.
    - *Params*:
      - *verbose* Add --verbose to show original and final size of all minified files.
    - *Requirements*:
      - [styles]


  - **build:minify:html**
    - *Description*: Minifies the html files and copies them to the dist directory.


  - **build:minify:js**
    - *Description*: Uglifies the js files and puts them on the dist directory.
    - *Params*:
      - *verbose* Add --verbose to show original and final size of all minified files.


---
###### Serve
###### Specs
###### Styles

## License

Copyright (c) 2016 Ignacio Gonzalez Bullon / Francisco Javier Fernandez Ceña

![repo-logo](https://github.com/natete/angular-matrix-gulp/blob/master/assets/img/mit-logo.png)


