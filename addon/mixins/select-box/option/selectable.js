import Mixin from '@ember/object/mixin';
import { computed } from '@ember/object';
import { makeArray } from '@ember/array';

export default Mixin.create({
  didReceiveAttrs() {
    this._super(...arguments);
    this.set('manualSelection', this.get('selected'));
    this.set('selectedValue', this.get('-selected-value'));
    this.set('isMultiple', this.get('-is-multiple'));
  },

  '-on-select'() {},

  isSelected: computed(
    'value',
    'selectedValue',
    'isMultiple',
    'manualSelection',
    function() {
      if (this.get('manualSelection') !== undefined) {
        return this.get('manualSelection');
      } else if (this.get('isMultiple')) {
        return makeArray(this.get('selectedValue')).includes(this.get('value'));
      } else {
        return this.get('value') === this.get('selectedValue');
      }
    }
  ),

  actions: {
    select() {
      this._super(...arguments);

      if (this.get('isDisabled')) {
        return;
      }

      this.get('-on-select')(this.get('value'));
    }
  }
});
