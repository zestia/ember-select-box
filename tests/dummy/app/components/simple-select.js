import Component from '@ember/component';
import layout from '../templates/components/simple-select';
import { get } from '@ember/object';

export default Component.extend({
  layout,
  tagName: '',

  actions: {
    pressedUp(e, sb) {
      e.preventDefault();
      sb.activatePreviousOption(true);
    },

    pressedDown(e, sb) {
      e.preventDefault();
      sb.activateNextOption(true);
      sb.open();
    },

    close(e, sb) {
      sb.close();
    },

    selected(select, value, sb) {
      select(value);
      sb.close();
    },

    updateDisplayLabel(value = {}) {
      this.set('displayLabel', get(value, this.get('label-key')));
    }
  }
});
