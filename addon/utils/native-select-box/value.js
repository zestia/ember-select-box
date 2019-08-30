import { selectValue as _selectValue } from '../shared/value';
import getSelectedValue from './get-selected-value';

export function selectValue(selectBox) {
  const value = getSelectedValue(selectBox);

  return _selectValue(selectBox, value);
}
