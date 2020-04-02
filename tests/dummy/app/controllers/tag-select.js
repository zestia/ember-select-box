import Controller from '@ember/controller';
import { tags } from '../utils/dummy-data';
import { resolve } from 'rsvp';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class TagSelectController extends Controller {
  @tracked selectedTags;

  init() {
    super.init(...arguments);
    this.selectedTags = tags;
  }

  get selectedTagNames() {
    return this.selectedTags.map((tag) => tag.name);
  }

  @action
  filterTagNames(query) {
    const names = this.selectedTags
      .filter((tag) => tag.name.toLowerCase().indexOf(query.toLowerCase()) >= 0)
      .map((tag) => tag.name);

    return resolve(names);
  }

  @action
  tag(name) {
    const { selectedTags } = this;

    let tag = selectedTags.find((tag) => tag.name === name);

    if (!tag) {
      tag = {
        id: this.selectedTags.length + 1,
        name,
      };
    }

    if (!selectedTags.includes(tag)) {
      selectedTags.push(tag);

      this.selectedTags = selectedTags;
    }
  }

  @action
  detag(name) {
    const selectedTags = this.selectedTags;
    const tag = selectedTags.find((tag) => tag.name === name);

    if (tag) {
      const index = selectedTags.indexOf(tag);

      selectedTags.splice(index, 1);

      this.selectedTags = selectedTags;
    }
  }
}
