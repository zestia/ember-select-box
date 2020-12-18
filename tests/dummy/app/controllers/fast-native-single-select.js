/* eslint-disable no-console */

import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class FastNativeSingleSelectController extends Controller {
  @tracked selectedModelId;

  constructor() {
    super(...arguments);

    this.models = [];

    for (let i = 0; i < 500; i++) {
      this.models.push({
        id: `${i}`,
        name: `Model ${i}`
      });
    }

    this.selectedModelId = '100';
  }

  get options() {
    return this.models.map((model) => ({
      model,
      selected: model.id === this.selectedModelId
    }));
  }

  get selectedModel() {
    return this.models.find((model) => model.id === this.selectedModelId);
  }

  @action
  selectModelId(modelId) {
    this.selectedModelId = modelId;
  }
}
