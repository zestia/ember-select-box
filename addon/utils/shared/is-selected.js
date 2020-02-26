import { computed } from '@ember/object';
import { makeArray } from '@ember/array';

const isSelectedKeys = [
  'selected',
  'resolvedValue',
  'args.selectBox.isMultiple',
  'args.selectBox.resolvedValue'
];

export default function isSelected() {
  return computed(...isSelectedKeys, function() {
    if (this.args.selected !== undefined) {
      return this.args.selected;
    } else if (this.args.selectBox && this.args.selectBox.isMultiple) {
      return makeArray(this.args.selectBox.resolvedValue).includes(
        this.resolvedValue
      );
    } else if (this.args.selectBox) {
      return this.resolvedValue === this.args.selectBox.resolvedValue;
    } else {
      return false;
    }
  });
}
