/* eslint-disable no-console */

import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  init() {
    this._super(...arguments);

    this.set('models', []);

    for (let i = 0; i < 500; i++) {
      this.get('models').push({
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
    return this.get('models').find(model => {
      return model.id === this.get('selectedModelId');
    });
  }),

  actions: {
    selectModelId(modelId) {
      this.set('selectedModelId', modelId);
    }
  }
});
