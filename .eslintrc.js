'use strict';

module.exports = {
  extends: '@zestia/eslint-config/ember-addon',

  rules: {
    // Temporarily disabled due to:
    // https://github.com/ember-template-lint/eslint-plugin-hbs/issues/42
    // https://github.com/ember-template-lint/eslint-plugin-hbs/issues/44
    'hbs/check-hbs-template-literals': 'off'
  }
};
