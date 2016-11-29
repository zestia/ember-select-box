/* eslint-disable no-console */

import Controller from 'ember-controller';
import computed from 'ember-computed';

export default Controller.extend({
  init() {
    this.set('models', []);

    for (let i = 0; i < 500; i++) {
      this.get('models').push({
        id: i,
        name: `Model ${i}`
      });
    }

    this.set('selectedModel', this.get('models')[100]);
  },

  options: computed('selectedModel', function() {
    return this.get('models').map(model => {
      return {
        model,
        selected: model === this.get('selectedModel')
      };
    });
  }),

  actions: {
    selectedModel() {
      console.log('TODO');
    }
  }
});
