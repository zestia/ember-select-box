import Component from '@ember/component';
import layout from '../templates/components/native-simple-select';

export default Component.extend({
  layout,
  classNames: ['native-simple-select'],
  classNameBindings: ['isFocused'],

  didRender() {
    this._super(...arguments);
    this.set('displayLabel', this.$('option:selected').text().trim());
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
