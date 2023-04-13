import Controller from '@ember/controller';
import data from 'dummy/utils/data';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { filter } from '@zestia/ember-select-box/utils';

export default class extends Controller {
  @tracked selected;

  data = data;

  @action
  handleSearch(query) {
    return filter(data.breads).by('name').query(query).run();
  }

  @action
  handleSelect(item) {
    this.selected = item;
  }
}
