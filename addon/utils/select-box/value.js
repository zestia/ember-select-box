import { updateValue, selectedValue } from '../shared/value';
import buildSelection from './build-selection';

export function selectValue(selectBox, value) {
  value = buildSelection(selectBox, value);

  return updateValue(selectBox, value).then(() => {
    selectedValue(selectBox);
  });
}
