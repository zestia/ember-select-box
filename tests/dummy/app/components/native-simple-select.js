import Component from '@ember/component';
import { set } from '@ember/object';
import layout from '../templates/components/native-simple-select';

export default Component.extend({
  layout,
  classNames: ['native-simple-select'],
  classNameBindings: ['isFocused'],

  didRender() {
    this._super(...arguments);

    const label = this.element
      .querySelector('option:checked')
      .textContent.trim();

    set(this, 'displayLabel', label);
  },

  actions: {
    focused() {
      set(this, 'isFocused', true);
    },

    blurred() {
      set(this, 'isFocused', false);
    }
  }
});
