import { makeArray } from '@ember/array';
import { computed } from '@ember/object';

const isSelectedKeys = [
  'selected',
  'internalValue',
  '_parentIsMultiple',
  '_parentInternalValue'
];

export default function isSelected() {
  return computed(...isSelectedKeys, function() {
    if (this.selected !== undefined) {
      return this.selected;
    } else if (this._parentIsMultiple) {
      return makeArray(this._parentInternalValue).includes(this.internalValue);
    } else {
      return this.internalValue === this._parentInternalValue;
    }
  })
}
