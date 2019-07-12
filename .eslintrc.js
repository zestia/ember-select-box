'use strict';

module.exports = {
  extends: '@zestia/eslint-config/ember-addon',
  overrides: [
    {
      files: '**/*.js',
      rules: {
        'no-restricted-imports': 'off',
        'ember/no-get': 'off',
        'ember/no-new-mixins': 'off'
      }
    }
  ]
};
