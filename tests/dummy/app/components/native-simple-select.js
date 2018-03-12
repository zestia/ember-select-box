import Component from '@ember/component';
import layout from '../templates/components/native-simple-select';

export default Component.extend({
  layout,
  classNames: ['native-simple-select'],
  classNameBindings: ['isFocused'],

  didRender() {
    this._super(...arguments);

    const label = this.get('element')
      .querySelector('option:selected')
      .textContent
      .trim();

    this.set('displayLabel', label);
  },

  actions: {
    focusIn() {
      this.set('isFocused', true);
    },

    focusOut() {
      this.set('isFocused', false);
    }
  }
});
