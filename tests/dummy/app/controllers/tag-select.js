import Controller from '@ember/controller';
import { mapBy, max } from '@ember/object/computed';
import { A as emberA } from '@ember/array';
import { tags } from '../utils/dummy-data';
import { resolve } from 'rsvp';
import { set, action } from '@ember/object';

export default class TagSelectController extends Controller {
  init() {
    super.init(...arguments);
    set(this, 'selectedTags', emberA(tags));
  }

  @mapBy('selectedTags', 'id') selectedTagIDs;
  @mapBy('selectedTags', 'name') selectedTagNames;
  @max('selectedTagIDs') maxTagID;

  @action
  findTags(query) {
    return this._findTags(query);
  }

  @action
  tag(name) {
    const selectedTags = this.selectedTags;
    let tag = selectedTags.findBy('name', name);

    if (!tag) {
      tag = {
        id: this.maxTagID + 1,
        name
      };
    }

    selectedTags.addObject(tag);
  }

  @action
  detag(name) {
    const selectedTags = this.selectedTags;
    const tag = selectedTags.findBy('name', name);

    if (tag) {
      selectedTags.removeObject(tag);
    }
  }

  _findTags(query) {
    const tags = emberA(
      this.selectedTags.filter(tag => {
        return tag.name.toLowerCase().indexOf(query.toLowerCase()) >= 0;
      })
    );

    return resolve(tags.mapBy('name'));
  }
}
