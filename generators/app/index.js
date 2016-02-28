'use strict';

/* eslint-disable no-var, object-shorthand, func-names, prefer-template, prefer-arrow-callback */

var _ = require('lodash');
var chalk = require('chalk');
var mkdirp = require('mkdirp');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');

function jigsassifyName(name) {
  var kebabedName = _.kebabCase(name);
  var hasJigsass = kebabedName.slice(0, 8) === ('jigsass-');

  return hasJigsass ? kebabedName : 'jigsass-' + kebabedName;
}

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the ' + chalk.red('JigSass Module Generator') + '! \n' +
      'Lets start scaffolding your module.'
    ));

    // Prompt the user
    var prompts = [ // eslint-disable-line vars-on-top
      {
        name: 'name',
        message: 'How would you like to name your module?',
        default: jigsassifyName(path.basename(process.cwd())),
        filter: jigsassifyName,
        validate: function (str) {
          return str.length > 0;
        },
      },
      {
        name: 'description',
        message: 'Description',
        default: '',
      },
      {
        name: 'homepage',
        message: 'Is there webpage for your module?',
        default: '',
      },
      {
        name: 'githubAccount',
        message: 'Which GitHub account or organization will host your module?',
        default: this.user.git.name(),
      },
      {
        name: 'authorName',
        message: 'Your Name, please',
        default: this.user.git.name(),
        store: true,
      },
      {
        name: 'authorEmail',
        message: 'Mind giving me your Email?',
        default: this.user.git.email(),
        store: true,
      },
      {
        name: 'license',
        message: 'Which license do you want to use?',
        default: 'MIT',
      },
      // {
      //   type: 'checkbox',
      //   name: 'deps',
      //   message: 'Would you like me to import one of these for you?',
      //   choices: [
      //     {
      //       name: 'jigsass-base',
      //       value: 'includeBase',
      //       checked: false,
      //       default: false
      //     },
      //     {
      //       name: 'jigsass-objects',
      //       value: 'includeObjects',
      //       checked: false,
      //       default: false
      //     },
      //     {
      //       name: 'jigsass-utils',
      //       value: 'includeUtils',
      //       checked: false,
      //       default: false
      //     },
      //   ]
      // },
      {
        name: 'includeTravis',
        type: 'confirm',
        message: 'Include Travis config?',
      },
    ];

    this.prompt(prompts, function (props) {
      for (var prop in props) {
        if (props.hasOwnProperty(prop)) {
          this[prop] = props[prop];
        }
      }

      this.moduleName = jigsassifyName(props.name);

      // Store the module name in title case
      this.moduleTitle = this.moduleName
        .replace(/-/g, ' ')
        .replace(/jigsass/i, 'JigSass')
        .replace(/(?:^|\s)(\w)/g, function (l) { return l.toUpperCase(); });

      // Store the module name in camel case
      this.moduleSafeName = _.camelCase(this.moduleName);

      done();
    }.bind(this));
  },

  writing: function () {
    var pkg = {
      name: this.moduleName,
      author: {
        name: this.authorName,
        email: this.authorEmail,
      },
      version: '0.0.0',
      main: 'index.scss',
      files: ['scss'],
      repository: {
        type: 'git',
        url: this.githubAccount + '/' + this.moduleName,
      },
      bugs: {
        bugs: this.githubAccount + '/' + this.moduleName + '/issues',
      },
      keywords: [
        'jigsass',
        'sass',
        'scss',
        'css',
        'oocss',
        'atomic css',
        'eyeglass-module',
      ],
      eyeglass: {
        exports: false,
        needs: '^0.8.2',
        sassDir: 'scss',
      },
      scripts: {
        test: 'gulp sass:test',
        prepublish: 'gulp prepublish',
      },
      dependencies: {},
      devDependencies: {
        autoprefixer: '^6.3.3',
        'babel-core': '^6.5.2',
        'babel-preset-es2015': '^6.5.0',
        'browser-sync': '^2.11.1',
        chai: '^3.5.0',
        del: '^2.2.0',
        eyeglass: '^0.8.2',
        gulp: '^3.9.1',
        'gulp-load-plugins': '^1.2.0',
        'gulp-mocha': '^2.2.0',
        'gulp-plumber': '^1.1.0',
        'gulp-postcss': '^6.1.0',
        'gulp-sass': '^2.2.0',
        'gulp-util': '^3.0.7',
        mdcss: '^1.5.1',
        'mdcss-theme-jigsass': '^0.1.5',
        'postcss-reporter': '^1.3.3',
        'postcss-scss': '^0.1.5',
        'run-sequence': '^1.1.5',
        sassaby: '^2.1.1',
        sassdoc: '^2.1.20',
        'sassdoc-theme-jigsass': '^0.2.12',
        stylelint: '^4.4.0',
      },
    };

    // Append properties to package.json
    ['description', 'license', 'homepage'].forEach((prop) => {
      if (this[prop]) pkg[prop] = this[prop];
    });

    // Insert required dependencies to pkg
    // TODO: Uncomment when these are ready (and update version);
    // if (this.includeBase) pkg.dependencies['jigsass-base'] = '^0.0.0';
    // if (this.includeObjects) pkg.dependencies['jigsass-objects'] = '^0.0.0';
    // if (this.includeUtils) pkg.dependencies['jigsass-utils'] = '^0.0.0';

    // Write `package.json` to disk
    this.fs.writeJSON(this.destinationPath('package.json'), pkg);

    // Create folders
    mkdirp('scss');
    mkdirp('sgSrc');
    mkdirp('sgSrc/assets');
    mkdirp('test');
    mkdirp('test/helpers');

    // Module files
    this.fs.copyTpl(
      this.templatePath('index.scss'),
      this.destinationPath('scss/index.scss'),
      {
        moduleName: this.moduleName,
        description: this.description,
        homepage: this.homepage,
        authorName: this.authorName,
        authorEmail: this.authorEmail,
      }
    //   {
      // }
    );

    // Documentation
    this.fs.copyTpl(
      this.templatePath('sg.scss'),
      this.destinationPath('sgSrc/sg.scss'),
      {
        moduleName: this.moduleName,
      }
    );
    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath('README.md'),
      {
        description: this.description,
        githubAccount: this.githubAccount,
        includeTravis: this.includeTravis,
        license: this.license,
        moduleName: this.moduleName,
        moduleTitle: this.moduleTitle,
      }
    );
    this.fs.copy(
      this.templatePath('CHANGELOG.md'),
      this.destinationPath('CHANGELOG.md')
    );

    // Tests
    this.fs.copyTpl(
      this.templatePath('test.js'),
      this.destinationPath('test/test_' + this.moduleName + '.js'),
      { moduleName: this.moduleName }
    );
    this.fs.copy(
      this.templatePath('helper.js'),
      this.destinationPath('test/helper.js')
    );
    this.fs.copy(
      this.templatePath('importer.scss'),
      this.destinationPath('test/helpers/importer.scss')
    );
    this.fs.copy(
      this.templatePath('test-helpers.scss'),
      this.destinationPath('test/helpers/_test-helpers.scss')
    );

    // Config and dotfiles
    this.fs.copyTpl(
      this.templatePath('gulpfile.babel.js'),
      this.destinationPath('gulpfile.babel.js'),
      { moduleName: this.moduleName }
    );
    this.fs.copy(
      this.templatePath('babelrc'),
      this.destinationPath('.babelrc')
    );
    this.fs.copy(
      this.templatePath('editorconfig'),
      this.destinationPath('.editorconfig')
    );
    this.fs.copy(
      this.templatePath('gitattributes'),
      this.destinationPath('.gitattributes')
    );
    this.fs.copy(
      this.templatePath('gitignore'),
      this.destinationPath('.gitignore')
    );
    this.fs.copy(
      this.templatePath('sassdocrc'),
      this.destinationPath('.sassdocrc')
    );
    this.fs.copy(
      this.templatePath('stylelintrc'),
      this.destinationPath('.stylelintrc')
    );


    if (this.includeTravis) {
      this.composeWith('travis', {}, {
        local: require.resolve('generator-travis/generators/app'),
      });
    }
  },

  install: function () {
    this.installDependencies();
  },
});
