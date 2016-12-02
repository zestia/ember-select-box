/* eslint-disable no-console */

import Controller from 'ember-controller';
import computed from 'ember-computed';
import { A as emberA } from 'ember-array/utils';

export default Controller.extend({
  init() {
    this.set('models', emberA());

    for (let i = 0; i < 500; i++) {
      this.get('models').pushObject({
        id: `${i}`,
        name: `Model ${i}`
      });
    }

    this.set('selectedModelId', '100');
  },

  options: computed('selectedModelId', function() {
    return this.get('models').map(model => {
      return {
        model,
        selected: model.id === this.get('selectedModelId')
      };
    });
  }),

  selectedModel: computed('selectedModelId', function() {
    return this.get('models').findBy('id', this.get('selectedModelId'));
  }),

  actions: {
    selectModelId(modelId) {
      this.set('selectedModelId', modelId);
    }
  }
});
