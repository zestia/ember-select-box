import { set } from '@ember/object';

export function setInputValue(selectBox, value) {
  if (selectBox.isDestroyed || !selectBox.input) {
    return;
  }

  set(selectBox, 'input.domElement.value', value);
}
