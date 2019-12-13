import invokeAction from '../component/invoke-action';
import { capitalize } from '@ember/string';
import { getAPI } from '../component/api';

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
  invokeAction(selectBox, 'onPressKey', e, getAPI(selectBox));
}

function _keyedDown(selectBox, key, e) {
  const name = `handlePress${key}`;

  if (typeof selectBox.actions[name] === 'function') {
    selectBox.send(name, e);
  }
}

function keyedDown(selectBox, key, e) {
  invokeAction(selectBox, `onPress${key}`, e, getAPI(selectBox));
}

export function shouldPreventDefault(selectBox, e) {
  return (
    e.target === selectBox.domElement ||
    e.target === selectBox.activeOption.domElement ||
    (selectBox.input && e.target === selectBox.input.domElement)
  );
}
