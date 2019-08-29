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
  pressedKey(selectBox, e);
}

export function keyDown(selectBox, e) {
  let key = keys[e.keyCode];

  if (key) {
    key = capitalize(key);

    _keyedDown(selectBox, key, e);
    keyedDown(selectBox, key, e);
  }
}

function pressedKey(selectBox, e) {
  invokeAction(selectBox, 'onPressKey', e, selectBox.api);
}

function _keyedDown(selectBox, key, e) {
  if (typeof selectBox.actions[key] === 'function') {
    selectBox.send(`onPress${key}`, e);
  }
}

function keyedDown(selectBox, key, e) {
  invokeAction(selectBox, `onPress${key}`, e, selectBox.api);
}
