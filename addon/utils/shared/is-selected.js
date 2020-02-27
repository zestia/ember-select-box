import { makeArray } from '@ember/array';

export default function isSelected(option) {
  if (option.args.selected !== undefined) {
    return option.args.selected;
  } else if (option.args.selectBox && option.args.selectBox.isMultiple) {
    return makeArray(option.args.selectBox.resolvedValue).includes(
      option.resolvedValue
    );
  } else if (option.args.selectBox) {
    return option.resolvedValue === option.args.selectBox.resolvedValue;
  } else {
    return false;
  }
}
