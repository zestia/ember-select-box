import invokeAction from '../shared/invoke-action';
import { set } from '@ember/object';

export function open(selectBox) {
  if (selectBox.isDestroyed) {
    return;
  }

  set(selectBox, 'isOpen', true);

  invokeAction(selectBox, 'onOpen', selectBox.api);
}

export function close(selectBox) {
  if (selectBox.isDestroyed) {
    return;
  }

  set(selectBox, 'isOpen', false);

  invokeAction(selectBox, 'onClose', selectBox.api);
}

export function toggle(selectBox) {
  if (selectBox.isOpen) {
    open(selectBox);
  } else {
    close(selectBox);
  }
}
