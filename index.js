'use strict';

module.exports = {
  name: require('./package').name, // eslint-disable-line global-require

  options: {
    babel: {
      plugins: [require.resolve('ember-concurrency/async-arrow-task-transform')]
    }
  }
};
