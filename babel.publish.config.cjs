'use strict';

/**
 * This babel.config is only used for publishing.
 *
 * For local dev experience, see the babel.config
 */
module.exports = {
  plugins: [
    [
      'babel-plugin-ember-template-compilation',
      {
        targetFormat: 'hbs',
        transforms: []
      }
    ],
    [
      'module:decorator-transforms',
      {
        runtime: {
          import: 'decorator-transforms/runtime-esm'
        }
      }
    ]
  ],

  generatorOpts: {
    compact: false
  }
};
