import { set } from '@ember/object';

export function deactivateOptions(selectBox) {
  set(selectBox, 'activeOptionIndex', -1);
}
