import Component from '@ember/component';
import { set } from '@ember/object';
import layout from '../templates/components/simple-select';

export default Component.extend({
  layout,
  tagName: '',

  actions: {
    pressedAlphaNum(e, sb) {
      sb.activateOptionForKeyCode(e.keyCode);

      if (!sb.isOpen) {
        sb.selectActiveOption();
      }
    },

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

    selected(select, value, sb) {
      select(value);
      sb.close();
    },

    updateDisplayLabel(value = {}) {
      set(this, 'displayLabel', value[this['label-key']]);
    }
  }
});
