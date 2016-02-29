'use strict';

/* global assert, fs, path, Sassaby,  */

describe('<%= moduleName %>', () => {
  const file = path.resolve(__dirname, 'helpers/importer.scss');
  const sassaby = new Sassaby(file);

  it('Does something under certain conditions', () => {
    // sassaby.func('tested-function').calledWithArgs('arguments').equals('expected result');
  });
});
