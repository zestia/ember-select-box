import Controller from '@ember/controller';
import { mapBy, max } from '@ember/object/computed';
import { A as emberA } from '@ember/array';
import { tags } from '../utils/dummy-data';
import { resolve } from 'rsvp';

export default Controller.extend({
  init() {
    this._super(...arguments);
    this.set('selectedTags', emberA(tags));
  },

  selectedTagIDs: mapBy('selectedTags', 'id'),
  selectedTagNames: mapBy('selectedTags', 'name'),
  maxTagID: max('selectedTagIDs'),

  actions: {
    findTags(query) {
      return this._findTags(query);
    },

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
    },

    detag(name) {
      const selectedTags = this.selectedTags;
      const tag = selectedTags.findBy('name', name);

      if (tag) {
        selectedTags.removeObject(tag);
      }
    }
  },

  _findTags(query) {
    const tags = emberA(this.selectedTags.filter(tag => {
      return tag.name.toLowerCase().indexOf(query.toLowerCase()) >= 0;
    }));
    return resolve(tags.mapBy('name'));
  }
});
