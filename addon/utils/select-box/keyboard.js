import invokeAction from '../component/invoke-action';
import { _selectOption } from '../../utils/select-box/option/select';
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
  const func = selectBox[name];

  if (typeof func === 'function') {
    func(e);
  }
}

function keyedDown(selectBox, key, e) {
  invokeAction(selectBox, `onPress${key}`, e, getAPI(selectBox));
}

export function pressEnter(selectBox, e) {
  if (!selectBox.activeOption) {
    return;
  }

  if (shouldPreventDefault(selectBox, e)) {
    e.preventDefault();
  }

  _selectOption(selectBox.activeOption);
}

export function shouldPreventDefault(selectBox, e) {
  return (
    selectBox.activeOption &&
    selectBox.input &&
    e.target === selectBox.input.domElement
  );
}
