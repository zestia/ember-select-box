import invokeAction from '../shared/invoke-action';
import { capitalize } from '@ember/string';

export const keys = {
  8: 'backspace',
  9: 'tab',
  13: 'enter',
  27: 'escape',
  37: 'left',
  38: 'up',
  39: 'right',
  40: 'down'
};

export function keyPress(selectBox, e) {
  invokeAction(selectBox, 'onPressKey', e, selectBox.api());
}

export function keyDown(selectBox, e) {
  let key = keys[e.keyCode];

  if (key) {
    key = capitalize(key);

    invokeAction(selectBox, `_onPress${key}`, e);
    invokeAction(selectBox, `onPress${key}`, e, selectBox.api());
  }
}
