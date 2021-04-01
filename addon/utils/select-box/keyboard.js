import invokeAction from '../component/invoke-action';
import { _selectOption } from '../../utils/select-box/option/select';
import { capitalize } from '@ember/string';
import { getKeyName } from '../../utils/general/keyboard';

export function keyPress(selectBox, e) {
  pressedKey(selectBox, e);
}

export function keyUp(selectBox, e) {
  const keyName = getKeyName(e);

  if (keyName === 'enter') {
    keyedUpEnter(selectBox, e);
  }
}

export function keyDown(selectBox, e) {
  const keyName = getKeyName(e);

  if (keyName) {
    keyedDown(selectBox, capitalize(keyName), e);
  }

  if (keyName === 'enter') {
    keyedDownEnter(selectBox, e);
  }
}

function pressedKey(selectBox, e) {
  invokeAction(selectBox, 'onPressKey', e, selectBox.api);
}

function keyedDown(selectBox, key, e) {
  invokeAction(selectBox, `onPress${key}`, e, selectBox.api);
}

function keyedDownEnter(selectBox, e) {
  if (shouldPreventDefault(selectBox, e)) {
    e.preventDefault();
  }
}

function keyedUpEnter(selectBox, e) {
  if (selectBox.activeOption) {
    _selectOption(selectBox.activeOption);
  }
}

export function shouldPreventDefault(selectBox, e) {
  return (
    selectBox.activeOption &&
    selectBox.input &&
    e.target === selectBox.input.element
  );
}
