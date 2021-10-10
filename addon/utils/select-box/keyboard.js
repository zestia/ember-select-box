import { _selectOption } from '../../utils/select-box/option/select';
import { capitalize } from '@ember/string';
import { getKeyName } from '../../utils/general/keyboard';

export function keyPress(selectBox, e) {
  pressedKey(selectBox, e);
}

export function keyDown(selectBox, e) {
  const keyName = getKeyName(e);

  if (keyName) {
    keyedDown(selectBox, capitalize(keyName), e);
  }

  if (keyName === 'enter') {
    keyedDownEnter(selectBox, e);
  }

  if (keyName === 'space') {
    keyedDownSpace(selectBox, e);
  }
}

function pressedKey(selectBox, e) {
  selectBox.args.onPressKey?.(e, selectBox.api);
}

function keyedDown(selectBox, key, e) {
  selectBox.args[`onPress${key}`]?.(e, selectBox.api);
}

function keyedDownSpace(selectBox) {
  if (!selectBox.activeOption || !!selectBox.charState) {
    return;
  }

  if (selectBox.input) {
    return;
  }

  _selectOption(selectBox.activeOption);
}

function keyedDownEnter(selectBox, e) {
  if (!selectBox.activeOption) {
    return;
  }

  if (selectBox.input) {
    e.preventDefault();
  }

  _selectOption(selectBox.activeOption);
}
