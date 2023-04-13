import Controller from '@ember/controller';
import data from 'dummy/utils/data';
import sleep from 'dummy/utils/sleep';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { filter } from '@zestia/ember-select-box/utils';

export default class extends Controller {
  @tracked selected;

  data = data;

  @action
  async search(query) {
    await sleep(300);

    return filter(data.pastries).by('name').query(query).run();
  }

  @action
  handleSelect(item) {
    this.selected = item;
  }
}
