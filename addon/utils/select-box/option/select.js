import invokeAction from '../../shared/invoke-action';
import { selectValue } from '../value';

export function _selectOption(option) {
  if (!option || option.isDisabled) {
    return;
  }

  invokeAction(option, '_onSelect', option);
}

export function selectOption(selectBox, option) {
  // todo test action order

  selectedOption(option);
  selectValue(selectBox, option.resolvedValue);
}

export function selectedOption(option) {
  invokeAction(option, 'onSelect', option.resolvedValue, option.api);
}
