import { makeArray } from '@ember/array';
import { computed } from '@ember/object';

const isSelectedKeys = [
  'selected',
  'resolvedValue',
  'selectBox.isMultiple',
  'selectBox.resolvedValue'
];

export default function isSelected() {
  return computed(...isSelectedKeys, function() {
    if (this.selected !== undefined) {
      return this.selected;
    } else if (this.selectBox && this.selectBox.isMultiple) {
      return makeArray(this.selectBox.resolvedValue).includes(
        this.resolvedValue
      );
    } else if (this.selectBox) {
      return this.resolvedValue === this.selectBox.resolvedValue;
    } else {
      return false;
    }
  });
}
