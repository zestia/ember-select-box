import { set } from '@ember/object';

export function receiveArgs(selectBox) {
  if (selectBox.disabled !== undefined) {
    set(selectBox, 'tabIndex', selectBox.disabled ? '-1' : '0');
  }
}
