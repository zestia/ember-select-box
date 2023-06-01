import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class extends Controller {
  @tracked selected;

  get data() {
    const array = [];

    for (let i = 0; i < 10000; i++) {
      array.push({
        id: i,
        name: `Option ${i}`
      });
    }

    return array;
  }

  @action
  handleSelect(item) {
    this.selected = item;
  }
}
