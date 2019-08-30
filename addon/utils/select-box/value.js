import { selectValue as _selectValue } from '../shared/value';
import buildSelection from './build-selection';

export function selectValue(selectBox, value) {
  value = buildSelection(selectBox, value);

  return _selectValue(selectBox, value);
}
