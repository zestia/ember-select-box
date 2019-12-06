/* eslint-disable no-console */

import Controller from '@ember/controller';
import { computed, set, action } from '@ember/object';

export default class FastNativeSingleSelectController extends Controller {
  init() {
    super.init(...arguments);

    set(this, 'models', []);

    for (let i = 0; i < 500; i++) {
      this.models.push({
        id: `${i}`,
        name: `Model ${i}`
      });
    }

    set(this, 'selectedModelId', '100');
  }

  @computed('selectedModelId')
  get options() {
    return this.models.map(model => {
      return {
        model,
        selected: model.id === this.selectedModelId
      };
    });
  }

  @computed('selectedModelId')
  get selectedModel() {
    return this.models.find(model => {
      return model.id === this.selectedModelId;
    });
  }

  @action
  selectModelId(modelId) {
    set(this, 'selectedModelId', modelId);
  }
}
