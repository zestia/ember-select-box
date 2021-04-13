import { selectValue } from '../value';

export function _selectOption(option) {
  if (option.isDisabled) {
    return;
  }

  return option.args._onSelect?.(option);
}

export function selectOption(selectBox, option) {
  selectedOption(option);

  return selectValue(selectBox, option.value);
}

export function selectedOption(option) {
  option.args.onSelect?.(option.value, option.args.selectBox.api);
}
