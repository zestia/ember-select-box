import Controller from '@ember/controller';
import data from 'dummy/utils/data';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class extends Controller {
  @tracked selected = [];

  data = data;

  get selectedString() {
    return this.selected.map((item) => item.name).join(', ');
  }

  @action
  handleSelect(items) {
    this.selected = items;
  }
}
