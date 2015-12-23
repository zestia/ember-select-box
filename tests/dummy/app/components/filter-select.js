import Component from 'ember-component';
import layout from '../templates/components/filter-select';
import get from 'ember-metal/get';

export default Component.extend({
  layout: layout,
  classNames: ['filter-select'],

  actions: {
    pressedUp() {
      // sb.navigateOptionsUp();
    },
    pressedDown() {
      // sb.navigateOptionsDown();
    },
    close(e, sb) {
      sb.close();
    },
    selected(value, sb) {
      sb.setInputValue(get(value, this.getAttr('label-key')));
      sb.close();
    }
  }
});
