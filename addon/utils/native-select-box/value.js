import { updateValue, selectedValue } from '../shared/value';
import getSelectedValue from './get-selected-value';

export function selectValue(selectBox) {
  const value = getSelectedValue(selectBox);

  return updateValue(selectBox, value).then(() => {
    selectedValue(selectBox);
  });
}
