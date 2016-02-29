'use strict';
import path from 'path';
import assert from 'yeoman-assert';
import helpers from 'yeoman-test';

describe('generator-jigsass-module:app', () => {
  it('Can be required', () => {
    require('../generators/app');
  });

  describe('Basic functionality', () => {
    before((done) => {
      helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        name: 'test name',
      })
      .on('end', done);
    });

    it('Created files', () => {
      assert.file([
        '.babelrc',
        '.editorconfig',
        '.gitattributes',
        '.gitignore',
        '.sassdocrc',
        '.stylelintrc',
        'gulpfile.babel.js',
        'package.json',
        'README.md',
        'CHANGELOG.md',
        'scss/index.scss',
        'sgSrc/sg.scss',
        'test/test_jigsass-test-name.js',
        'test/helper.js',
        'test/helpers/importer.scss',
        'test/helpers/_test-helpers.scss',
      ]);
    });

    it('Creates Gulp tasks', () => {
      [
        'sass:lint',
        'sass:test',
        'sass:sg',
        'sass:doc',
        'serve:sassdoc',
        'serve:sg',
        'tdd',
        'prepublish',
        'build',
        'default',
      ].forEach((task) => { assert.fileContent('gulpfile.babel.js', `gulp.task(\'${task}`); });
    });
  });

  describe('Module name', () => {
    before((done) => {
      helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        name: 'test name',
      })
      .on('end', done);
    });

    describe('Module name jigsassification', () => {
      it('Injected the jigsassified name into package.json', () => {
        assert.fileContent('package.json', '"name": "jigsass-test-name"');
      });
      it('Injected the jigsassified name into index.scss', () => {
        assert.fileContent('scss/index.scss', '// # jigsass-test-name');
      });
      it('Injected the jigsassified name into sg.scss', () => {
        assert.fileContent('sgSrc/sg.scss', '// # jigsass-test-name style guide generator');
      });
      it('Injected the jigsassified name into README.md', () => {
        assert.fileContent('README.md', '@import \'path/to/jigsass-test-name\';');
      });
      it('Injected the jigsassified name into gulpfile.babel.js', () => {
        assert.fileContent('gulpfile.babel.js', 'title: \'jigsass-test-name\'');
      });
      it('Injected the jigsassified name into test file', () => {
        assert.fileContent('test/test_jigsass-test-name.js', 'describe(\'jigsass-test-name\', ()');
      });
    });

    describe('Title cased name', () => {
      it('Injected the tite-cased name into README.md', () => {
        assert.fileContent('README.md', 'JigSass Test Name');
      });
    });
  });

  describe('Description property', () => {
    describe('Exists', () => {
      before((done) => {
        helpers.run(path.join(__dirname, '../generators/app'))
        .withPrompts({
          description: 'A short description.',
        })
        .on('end', done);
      });

      it('Injected a description property into package.json', () => {
        assert.fileContent('package.json', '"description": "A short description."');
      });
      it('Injected the description into index.scc', () => {
        assert.fileContent('scss/index.scss', '-> A short description');
      });
      it('Removed the default description text from index.scss', () => {
        assert.noFileContent('scss/index.scss', '-> Description text');
      });
      it('Injected the description into README.md', () => {
        assert.fileContent('README.md', 'A short description');
      });
    });

    describe('Does not exist', () => {
      before((done) => {
        helpers.run(path.join(__dirname, '../generators/app'))
        .on('end', done);
      });

      it('Does not inject a description property into package.json', () => {
        assert.noFileContent('package.json', '"description":');
      });
      it('Kept the default description text in index.scss', () => {
        assert.fileContent('scss/index.scss', '-> Description text');
      });
    });
  });

  describe('Hompage property', () => {
    describe('Exists', () => {
      before((done) => {
        helpers.run(path.join(__dirname, '../generators/app'))
        .withPrompts({
          name: 'test name',
          homepage: 'is-where-your-heart.is',
        })
        .on('end', done);
      });

      it('Injected a homepage property into package.json', () => {
        assert.fileContent('package.json', '"homepage": "is-where-your-heart.is"');
      });
      it('Injected the homepage into index.scss', () => {
        assert.fileContent('scss/index.scss', 'is-where-your-heart.is');
      });
    });

    describe('Does not exist', () => {
      before((done) => {
        helpers.run(path.join(__dirname, '../generators/app'))
        .withPrompts({
          name: 'test name',
        })
        .on('end', done);
      });

      it('Did not inject a homepage property into package.json', () => {
        assert.noFileContent('package.json', '"homepage":');
      });
      it('Did not inject the homepage property into index.scss', () => {
        assert.noFileContent('scss/index.scss', 'is-where-your-heart.is');
      });
    });
  });

  describe('Github Account', () => {
    before((done) => {
      helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        name: 'test name',
        githubAccount: 'GHAtest',
      })
      .on('end', done);
    });

    describe('Repository object in package.json', () => {
      it('Created a repository object in package.json', () => {
        assert.fileContent('package.json', '"repository": {');
      });
      it('Injected the repository.url to package.json', () => {
        assert.fileContent('package.json', '"url": "GHAtest/jigsass-test-name"');
      });
    });

    it('Included account-dependant badges in README.md', () => {
      assert.fileContent('README.md', '[Dependency Status][daviddm-image]][daviddm-url]');
    });
    it('Injected account-dependant badge-dfeinitions into README.md', () => {
      assert.fileContent('README.md', '[daviddm-image]: https://david-dm.org/');
    });
  });

  describe('Author name', () => {
    before((done) => {
      helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        authorName: 'John Doe',
      })
      .on('end', done);
    });

    it('Created an author object in package.json', () => {
      assert.fileContent('package.json', '"author": {');
    });
    it('Injected the author\'s name into package.json', () => {
      assert.fileContent('package.json', '"name": "John Doe"');
    });
  });

  describe('Author email', () => {
    describe('With author name property', () => {
      before((done) => {
        helpers.run(path.join(__dirname, '../generators/app'))
        .withPrompts({
          authorName: 'John Doe',
          authorEmail: 'john@doe.com',
        })
        .on('end', done);
      });

      it('Created an author object in package.json', () => {
        assert.fileContent('package.json', '"author": {');
      });
      it('Injected the author\'s email into package.json', () => {
        assert.fileContent('package.json', '"email": "john@doe.com"');
      });
    });
  });

  describe('License', () => {
    before((done) => {
      helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        license: 'MIT',
      })
      .on('end', done);
    });

    it('Injected a license property into package.json', () => {
      assert.fileContent('package.json', '"license": "MIT"');
    });
    it('Injected license into README.md', () => {
      assert.fileContent('README.md', 'License: MIT');
    });
  });

  describe('Travis', () => {
    describe('Is included', () => {
      before((done) => {
        helpers.run(path.join(__dirname, '../generators/app'))
        .withPrompts({
          includeTravis: true,
        })
        .on('end', done);
      });
      it('Created a .travis.yml file', () => {
        assert.file(['.travis.yml']);
      });
    });

    describe('Is not included', () => {
      before((done) => {
        helpers.run(path.join(__dirname, '../generators/app'))
        .withPrompts({
          includeTravis: false,
        })
        .on('end', done);
      });
      it('Did not create a .travis.yml file', () => {
        assert.noFile(['.travis.yml']);
      });
      it('Did not include travis-dependant badges in README.md', () => {
        assert.noFileContent('README.md', '[![Build Status][travis-image]][travis-url] ');
      });
      it('Did not inject travis-dependant badge-dfeinitions into README.md', () => {
        assert.noFileContent('README.md', '[travis-image]: https://travis-ci.org/');
      });
    });
  });
});
