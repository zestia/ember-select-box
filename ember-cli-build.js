'use strict';

const EmberAddon = require('ember-cli/lib/broccoli/ember-addon');
const { maybeEmbroider } = require('@embroider/test-setup');

process.env.buildTarget = EmberAddon.env();

module.exports = function (defaults) {
  const app = new EmberAddon(defaults, {
    minifyCSS: {
      enabled: false
    }
  });

  // This build file specifies the options for the dummy test app of this
  // addon, located in `/tests/dummy`
  // This build file does *not* influence how the addon or the app using it
  // behave. You most likely want to be modifying `./index.js` or app's build file

  return maybeEmbroider(app, {
    // Needed for IE11 https://github.com/embroider-build/embroider/issues/731
    skipBabel: [
      {
        package: 'qunit',
      },
    ],
    packageRules: [
      {
        package: 'dummy',
        components: {
          '{{foo-select-box}}': {
            safeToIgnore: true
          }
        }
      }
    ]
  });
};
