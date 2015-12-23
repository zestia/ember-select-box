import Component from 'ember-component';
import layout from '../templates/components/tag-select';

export default Component.extend({
  layout: layout,
  classNames: ['tag-select'],

  actions: {
    pressedUp(e, sb) {
      sb.activatePreviousOption(true);
    },
    pressedDown(e, sb) {
      sb.activateNextOption(true);
      sb.open();
    },
    close(e, sb) {
      sb.close();
    },
    updateAvailableTags(search, query) {
      return search(query).then((tags) => {
        this.set('availableTags', tags);
        this.set('newTag', query);
      });
    },
    reveal(sb, search) {
      this.send('updateAvailableTags', search, '');
      sb.open();
    },
    addTag(tag, sb) {
      this.sendAction('on-tag', tag);
      sb.setInputValue('');
      sb.close();
    },
    removeTag(tag) {
      this.sendAction('on-detag', tag);
    }
  }
});
