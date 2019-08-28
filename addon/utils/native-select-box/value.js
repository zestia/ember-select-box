import { updateValue, selectedValue } from '../shared/value';
import getSelectedValue from './get-selected-value';

export async function selectValue(selectBox) {
  const value = getSelectedValue(selectBox);

  await updateValue(selectBox, value);

  selectedValue(selectBox);
}
