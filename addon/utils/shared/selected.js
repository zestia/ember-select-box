import { makeArray } from '@ember/array';

export default function isSelected(option) {
  if (option.args.selected !== undefined) {
    return option.args.selected;
  } else if (option.args.selectBox && option.args.selectBox.isMultiple) {
    return makeArray(option.args.selectBox.value).includes(option.value);
  } else if (option.args.selectBox) {
    return option.value === option.args.selectBox.value;
  } else {
    return false;
  }
}
