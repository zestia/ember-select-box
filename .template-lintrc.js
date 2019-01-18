'use strict';

module.exports = {
  extends: 'select-box:temporary',

  plugins: [
    '@zestia/ember-template-lint-plugin',

    // Remove me eventually
    {
      name: 'select-box',
      configurations: {
        temporary: {
          extends: 'zestia:recommended',

          rules: {
            'no-implicit-this': {
              allow: [
                'foo-select',
                'native-select-box',
                'native-select-box/group',
                'native-select-box/option',
                'select-box-class',
                'select-box',
                'select-box/foo',
                'select-box/group',
                'select-box/input',
                'select-box/option',
                'select-box/options',
                'select-box/selected-option',
                'select-box/selected-options'
              ]
            }
          }
        }
      }
    }
  ]
};
