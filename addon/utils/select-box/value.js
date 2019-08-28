import { updateValue, selectedValue } from '../shared/value';
import buildSelection from './build-selection';

export async function selectValue(selectBox, value) {
  value = buildSelection(selectBox, value);

  await updateValue(selectBox, value);

  selectedValue(selectBox);
}
