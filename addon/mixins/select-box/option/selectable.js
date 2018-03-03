import Mixin from '@ember/object/mixin';
import { computed } from '@ember/object';
import { makeArray } from '@ember/array';

const isSelectedKeys = [
  'internalValue',
  'parentInternalValue',
  'isMultiple',
  'manualSelection'
];

export default Mixin.create({
  didReceiveAttrs() {
    this._super(...arguments);
    this.set('manualSelection', this.get('selected'));
    this.set('parentInternalValue', this.get('-parent-value'));
    this.set('isMultiple', this.get('-is-multiple'));
  },

  isSelected: computed(...isSelectedKeys, function() {
    if (this.get('manualSelection') !== undefined) {
      return this.get('manualSelection');
    } else if (this.get('isMultiple')) {
      return makeArray(this.get('parentInternalValue')).includes(this.get('internalValue'));
    } else {
      return this.get('internalValue') === this.get('parentInternalValue');
    }
  }),

  actions: {
    select() {
      this._super(...arguments);

      if (this.get('isDisabled')) {
        return;
      }

      this.get('-on-select')(this.get('internalValue'));
      this.getWithDefault('on-select', () => {})(this.get('internalValue'), this.get('-api'));
    }
  }
});
