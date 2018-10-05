import Mixin from '@ember/object/mixin';
import { computed } from '@ember/object';
import { makeArray } from '@ember/array';
import invokeAction from '../../../utils/invoke-action';

const isSelectedKeys = [
  'selected',
  'internalValue',
  '_parentIsMultiple',
  '_parentInternalValue',
];

export default Mixin.create({
  isSelected: computed(...isSelectedKeys, function() {
    if (this.selected !== undefined) {
      return this.selected;
    } else if (this._parentIsMultiple) {
      return makeArray(this._parentInternalValue).includes(this.internalValue);
    } else {
      return this.internalValue === this._parentInternalValue;
    }
  }),

  actions: {
    select() {
      this._super(...arguments);

      if (this.isDisabled) {
        return;
      }

      invokeAction(this, '_onSelect', this.internalValue);
      invokeAction(this, 'on-select', this.internalValue, this._parentApi);
    }
  }
});
