import { set } from '@ember/object';

export function deactivateSelectedOptions(selectBox) {
  set(selectBox, 'activeSelectedOptionIndex', -1);
}
