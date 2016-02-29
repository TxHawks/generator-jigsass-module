# generator-jigsass-module

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]


> A Yeoman generator for scaffolding out a module for use in the JigSass framework.

## Installation

First, install [Yeoman](http://yeoman.io) and generator-jigsass-module using [npm](https://www.npmjs.com/) (Assuming you already have [node.js](https://nodejs.org/) pre-installed).

```bash
npm i -g yo
npm i -g generator-jigsass-module
```

Then generate your new project:

```bash
mkdir jigsass-my-new-model && cd $_
yo jigsass-module
```

## What You Get

Running the generator will create the following file structure:

See the generated `README.md` for more details

```bash
┬ ./
│
├─┬ scss/ 
│ └─ index.scss # The module's importable file.
│
├─┬ sgSrc/      # Style guide sources
│ │
│ ├── sg.scc    # It is a best practice for JigSass 
│ │             # modules to not automatically generate 
│ │             # css and documentation on `@import` 
│ │             # Please use this file to enable css
│ │             # and documentation comments) generation.
│ │
│ └── assets/   # Files in `sgSrc/assets` will be 
│               # available for use in the style guide
│
├── sassdoc/    # Generated documentation 
│               # of the module's sass features
│
├── styleguide/ # Generated documentation 
│               # of the module's CSS
│
└─┬─ test/
  │
  ├─┬ helpers/
  │ │
  │ ├── importer.scss       # Used for easilty importing tested scss files
  │ │
  │ └── _test_helpers.scss  # JigSass's assertion helpers,
  │                         # for use inside Sassaby tests.
  │                         
  ├── helper.js              # Used for defining global `before()`
  │                          # functions and requiring modules.
  │                         
  └── test_<%= moduleName %>  # Specs. Mocha will automatically 
                             # run all javascript files located
                             # in the `test` directory.
```


## Getting To Know Yeoman

Yeoman has a heart of gold. He&#39;s a person with feelings and opinions, but he&#39;s very easy to work with. If you think he&#39;s too opinionated, he can be easily convinced. Feel free to [learn more about him](http://yeoman.io/).

## License

MIT


[npm-image]: https://badge.fury.io/js/generator-jigsass-module.svg
[npm-url]: https://npmjs.org/package/generator-jigsass-module
[travis-image]: https://travis-ci.org/TxHawks/generator-jigsass-module.svg?branch=master
[travis-url]: https://travis-ci.org/TxHawks/generator-jigsass-module
[daviddm-image]: https://david-dm.org/TxHawks/generator-jigsass-module.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/TxHawks/generator-jigsass-module
