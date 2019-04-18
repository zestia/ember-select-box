import Component from '@ember/component';
import { set } from '@ember/object';
import layout from '../templates/components/tag-select';

export default Component.extend({
  layout,
  tagName: '',

  actions: {
    pressedUp(e, sb) {
      e.preventDefault();
      sb.activatePreviousOption();
    },

    pressedDown(e, sb) {
      e.preventDefault();
      sb.activateNextOption();
      sb.open();
    },

    close(e, sb) {
      sb.close();
    },

    updateAvailableTags(search, query) {
      return search(query).then(tags => {
        set(this, 'availableTags', tags);
        set(this, 'newTag', query);
      });
    },

    reveal(sb, search) {
      this.send('updateAvailableTags', search, '');
      sb.open();
    },

    addTag(tag, sb) {
      this.onTag(tag);
      sb.setInputValue('');
      sb.close();
    },

    removeTag(tag) {
      this.onDeTag(tag);
    }
  }
});
