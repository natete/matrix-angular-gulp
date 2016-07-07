<img src="https://github.com/natete/angular-matrix-gulp/blob/master/assets/img/logo-repo-mini.png" align="right" />
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
###### Analyze
- Jscs
- Jshint
- Plato
- Sass
- Watch

###### Build
- Clean

>> ###### Fonts
>> ###### Img
>> ###### Minify

###### Serve
###### Specs
###### Styles
