'use strict';

module.exports = {
  plugins: ['@zestia/template-lint-config'],
  extends: 'zestia:recommended',
  // Temporarily disable linting pretty-ness of hbs in js files
  // Issue: https://discord.com/channels/480462759797063690/666416704418611233/1052203658445598722
  overrides: [
    {
      files: ['**/*.js'],
      rules: {
        prettier: false
      }
    }
  ]
};
