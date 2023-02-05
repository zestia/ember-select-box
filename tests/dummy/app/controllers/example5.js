import Controller from '@ember/controller';
import data from 'dummy/utils/data';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class extends Controller {
  @tracked selected = [];

  data = data;

  get pies() {
    return this.data.breads.map((bread) => bread.name);
  }

  @action
  handleSelect(items) {
    this.selected = items;
  }

  @action
  handleUnSelect(item) {
    this.selected = this.selected.filter((i) => i !== item);
  }
}
