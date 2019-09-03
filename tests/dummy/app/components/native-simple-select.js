import Component from '@ember/component';
import { set } from '@ember/object';
import layout from '../templates/components/native-simple-select';

export default Component.extend({
  layout,
  tagName: '',

  actions: {
    focused() {
      set(this, 'isFocused', true);
    },

    blurred() {
      set(this, 'isFocused', false);
    },

    updateDisplay(sb) {
      const label = sb.element
        .querySelector('option:checked')
        .textContent.trim();

      set(this, 'displayLabel', label);
    }
  }
});
