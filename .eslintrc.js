module.exports = {
  extends: '@zestia/eslint-config/ember',
  overrides: [{
    files: '**/*.js',
    rules: {
      'no-restricted-imports': 'off'
    }
  }]
};
