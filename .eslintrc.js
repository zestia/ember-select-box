module.exports = {
  extends: '@zestia/eslint-config/ember-addon',
  overrides: [{
    files: '**/*.js',
    rules: {
      'no-restricted-imports': 'off'
    }
  }]
};
