import Component from '@ember/component';
import layout from '../templates/components/native-simple-select';

export default Component.extend({
  layout,
  classNames: ['native-simple-select'],
  classNameBindings: ['isFocused'],

  actions: {
    focusIn() {
      this.set('isFocused', true);
    },

    focusOut() {
      this.set('isFocused', false);
    },

    updateDisplayLabel() {
      this.set('displayLabel', this.$('option:selected').text());
    }
  }
});
