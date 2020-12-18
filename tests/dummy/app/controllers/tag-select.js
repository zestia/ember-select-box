import Controller from '@ember/controller';
import { tags } from '../utils/dummy-data';
import { resolve } from 'rsvp';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class TagSelectController extends Controller {
  @tracked selectedTagNames;

  constructor() {
    super(...arguments);
    this.selectedTagNames = ['foo', 'bar'];
  }

  @action
  filterTagNames(query) {
    const names = tags
      .filter((tag) => tag.name.toLowerCase().indexOf(query.toLowerCase()) >= 0)
      .map((tag) => tag.name);

    return resolve(names);
  }

  @action
  handleSelectTags(tagNames) {
    this.selectedTagNames = tagNames;
  }
}
