import { set } from '@ember/object';

export function receiveArgs(selectBox) {
  set(selectBox, 'tabIndex', selectBox.disabled ? '-1' : '0');
  set(selectBox, 'isOpen', !!selectBox.open);
}
