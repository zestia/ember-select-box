import Mixin from '@ember/object/mixin';
import { computed } from '@ember/object';
import { makeArray } from '@ember/array';
import invokeAction from '../../../utils/invoke-action';

const isSelectedKeys = [
  'selected',
  'internalValue',
  '-parent-is-multiple',
  '-parent-internal-value',
];

export default Mixin.create({
  isSelected: computed(...isSelectedKeys, function() {
    if (this.selected !== undefined) {
      return this.selected;
    } else if (this['-parent-is-multiple']) {
      return makeArray(this['-parent-internal-value']).includes(this.internalValue);
    } else {
      return this.internalValue === this['-parent-internal-value'];
    }
  }),

  actions: {
    select() {
      this._super(...arguments);

      if (this.isDisabled) {
        return;
      }

      invokeAction(this, '-on-select', this.internalValue);
      invokeAction(this, 'on-select', this.internalValue, this['-parent-api']);
    }
  }
});
