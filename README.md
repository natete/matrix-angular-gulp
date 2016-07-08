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
### Common Tasks
  - **default**
    - *Description*: Prints out the list  of available tasks.

  - **annotate**
    - *Description*: Adds $inject arrays to angular functions.

  - **inject**
    - *Description*: Inject required files depending on the current environment.

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
    - *Description*: Analyzes the js files using jscs and based on the rules found in the .jscsrc file which is required.
    - *Params*:
      - *exhaustive*: Add --exhaustive to analyze all files when analyzing from a watch  task.
      - *autofix*: Add --autofix if you want jscs to fix your files based on the provided rules.


  - **analyze:jshint**
    - *Description*: Analyzes the js files using jshint.
    - *Params*:
      - *exhaustive*: Add --exhaustive to analyze all files when analyzing from a watch  task.
      - *strict*: Add --strict to prevent tasks that depend on this one to be executed if errors are found.


  - **analyze:plato**
    - *Description*: Performs a complete js analysis and creates a report to be visualized in the browser.
    - *Params*:
     - *verbose*: Add --verbose to show an overview report in the console.


  - **analyze:sass**
    - *Description*: Analyzes the scss/sass files using scss-lint.
    - *Params*:
      - *exhaustive*: Add --exhaustive to analyze all files when analyzing from a watch task.
      - *strict*: Add --strict to prevent tasks that depend on this one to be executed if errors are found.
    - *Requirements*:
      - scss_lint Ruby gem.


  - **analyze:watch**
    - Description: Watches js, scss and sass files and performs a complete analysis on them.
    - Params:
      - *exhaustive*: Add --exhaustive to analyze all files when analyzing from a watch  task.
      - *autofix*: Add --autofix if you want jscs to fix your files based on the provided rules.
      - *strict*: Add --strict to prevent tasks that depend on this one to be executed if errors are found.
    - *Requirements*:
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

### Serve Tasks
  - **serve:base**
    - *Description*: Starts a server in the given environment.
    - *Requirements*:
      - [serve:browse]
    - **Limitations**: Cannot be called on its own, it's essentially a subtask to be called from another task (serve:dev or serve:dist).


  - **serve:browse**
    - *Description*: Opens a browser with the specified environment.
    - **Limitations**: Cannot be called on its own, it's essentially a subtask to be called from another task (serve:dev, serve:dist or specs:serve).  


  - **serve:dev**
    - *Description*: Starts a server serving from development environment.
    - *Params*:
      - *analyze*: Add --analyze to analyze all files on every server reload.
      - *exhaustive*: Add --exhaustive to analyze all files when analyzing from a watch  task.
      - *autofix*: Add --autofix if you want jscs to fix your files based on the provided rules.
      - *strict*: Add --strict to prevent tasks that depend on this one to be executed if errors are found.
    - *Requirements*:
      - [build:dev, serve:base, serve:reload:dev:css, serve:reload:dev:html, serve:reload:dev:js]


  - **serve:dist**
    - *Description*: Starts a server serving from production environment.
    - *Params*:
      - *analyze*: Add --analyze to analyze all files on every server reload.
      - *exhaustive*: Add --exhaustive to analyze all files when analyzing from a watch  task.
      - *autofix*: Add --autofix if you want jscs to fix your files based on the provided rules.
      - *strict*: Add --strict to prevent tasks that depend on this one to be executed if errors are found.
    - *Requirements*:
      - [build:dist, serve:base, serve:reload:dist:css, serve:reload:dist:html, serve:reload:dist:js]


  - **serve:reload**
    - *Description*: Reloads the server for the files in reloadPath.
    - *Requirements*:
      - [serve:browse]
    - **Limitations**: Cannot be called on its own, it's essentially a subtask to be called from another task (serve:reload:\*).


  - **serve:reload:dev:html**
    - *Description*: Reloads the dev server with the new files.


  - **serve:reload:dev:js**
    - *Description*: Reloads the dev server with the new files.
    - *Params*:
      - *analyze*: Add --analyze to analyze all files on every server reload.
      - *exhaustive*: Add --exhaustive to analyze all files when analyzing from a watch  task.
      - *autofix*: Add --autofix if you want jscs to fix your files based on the provided rules.
      - *strict*: Add --strict to prevent tasks that depend on this one to be executed if errors are found.
    - *Requirements*:
      - [templatecache, serve:reload]


  - **serve:reload:dev:styles**
    - *Description*: Reloads the dev server with the new files.
    - *Params*:
      - *analyze*: Add --analyze to analyze all files on every server reload.
      - *exhaustive*: Add --exhaustive to analyze all files when analyzing from a watch  task.
      - *autofix*: Add --autofix if you want jscs to fix your files based on the provided rules.
      - *strict*: Add --strict to prevent tasks that depend on this one to be executed if errors are found.
    - *Requirements*:
      - [templatecache, styles, serve:reload]
  

  - **serve:reload:dist:html**
    - *Description*: Reloads the production server with the new files.


  - **serve:reload:dist:js**
    - *Description*: Reloads the production server with the new files.
    - *Params*:
      - *analyze*: Add --analyze to analyze all files on every server reload.
      - *exhaustive*: Add --exhaustive to analyze all files when analyzing from a watch  task.
      - *autofix*: Add --autofix if you want jscs to fix your files based on the provided rules.
      - *strict*: Add --strict to prevent tasks that depend on this one to be executed if errors are found.
    - *Requirements*:
      - [templatecache, serve:reload]


  - **serve:reload:dist:styles**
    - *Description*: Reloads the production server with the new files.
    - *Params*:
      - *analyze*: Add --analyze to analyze all files on every server reload.
      - *exhaustive*: Add --exhaustive to analyze all files when analyzing from a watch  task.
      - *autofix*: Add --autofix if you want jscs to fix your files based on the provided rules.
      - *strict*: Add --strict to prevent tasks that depend on this one to be executed if errors are found.
    - *Requirements*:
      - [templatecache, styles, serve:reload]


  - **serve:reload:specs:html**
    - *Description*: Doesn't perform any real task right now.


  - **serve:reload:specs:js**
    - *Description*: Reloads the specs server with the new files.
    - *Params*:
      - *analyze*: Add --analyze to analyze all files on every server reload.
      - *exhaustive*: Add --exhaustive to analyze all files when analyzing from a watch  task.
      - *autofix*: Add --autofix if you want jscs to fix your files based on the provided rules.
      - *strict*: Add --strict to prevent tasks that depend on this one to be executed if errors are found.
    - *Requirements*:
      - [templatecache, serve:reload]


  - **serve:reload:specs:styles**
    - *Description*: Doesn't perform any real task right now.

---

### Karma-Jasmine testint tasks
  - **specs:run**
    - *Description*: Runs all unit tests producing a single result along with coverage information.
    - *Requirements*:
      - [templatecache]


  - **specs:serve**
    - *Description*: Runs tests in serve mode. Runs over tests on every file change.
    - *Params*:
      - *strictTest*: Add --strictTest to stop current execution when errors are found.Add --strictTest to stop current execution when errors are found.
    - *Requirements*:
      - [build:specs, serve:base]


---


### Karma-Jasmine testint tasks
  - **styles**
    - *Description*: Calls the configured styles framework task to compile the files and generate a css file.


  - **styles:clean**
    - *Description*: Cleans the css directory.


  - **styles:less**
    - *Description*: Compiles all the less partials, shows the errors on the console log & concatenates all the files in only one.
    - *Requirements*:
      - [styles:clean]


  - **styles:sass**
      - *Description*: Compiles all the sass partials, shows the errors on the console log & concatenates all the files in only one.
      - *Requirements*:
        - [styles:clean]


- **styles:watch**
      - *Description*: Watches (sass | less) changes to call recompile the styles.
      - *Requirements*:
        - [styles]

## License

Copyright (c) 2016 Ignacio Gonzalez Bullon / Francisco Javier Fernandez Ceña

![repo-logo](https://github.com/natete/angular-matrix-gulp/blob/master/assets/img/mit-logo.png)
