import { get, set } from '@ember/object';
import invokeAction from '../../component/invoke-action';
import { getAPI } from '../../component/api';
import scrollIntoView from '../../general/scroll-into-view';
import escapeRegExp from '../../general/escape-regexp';
import collapseWhitespace from '../../general/collapse-whitespace';
const { fromCharCode } = String;

export function _activateOption(option) {
  invokeAction(option, '_onActivate', option);
}

function activatedOption(option) {
  invokeAction(option, 'onActivate', option.resolvedValue, getAPI(option));
}

export function activateOption(selectBox, option) {
  activateOptionAtIndex(selectBox, option.index);
}

export function activateOptionAtIndex(selectBox, index, scroll) {
  const under = index < 0;
  const over = index > selectBox.options.length - 1;

  if (under || over) {
    return;
  }

  set(selectBox, 'activeOptionIndex', index);

  const option = selectBox.activeOption;

  if (scroll) {
    scrollIntoView(option.domElement);
  }

  activatedOption(option);
}

export function activateOptionForKeyCode(selectBox, keyCode, scroll = true) {
  const char = fromCharCode(keyCode);

  if (char) {
    activateOptionForChar(selectBox, char, scroll);
  }
}

function activateOptionForChar(selectBox, char, scroll) {
  const lastChars = selectBox._activateOptionChars || '';
  const lastMs = selectBox._activateOptionMs || 0;
  const lastIndex = selectBox._activateOptionIndex || 0;
  const lastChar = lastChars.substring(lastChars.length - 1);
  const ms = Date.now();
  const duration = ms - lastMs;
  const repeatedChar = char === lastChar;
  const reset = duration > 1000;
  const chars = reset ? char : `${lastChars}${char}`;
  let options = findOptionsMatchingChars(selectBox, chars);
  let index = 0;
  let option;

  if (repeatedChar) {
    index = lastIndex + 1;
    options = findOptionsMatchingChars(selectBox, lastChar);
    option = options[index];
  }

  if (!option) {
    index = 0;
    option = options[index];
  }

  if (option) {
    activateOptionAtIndex(selectBox, get(option, 'index'), scroll);
  }

  set(selectBox, '_activateOptionChars', chars);
  set(selectBox, '_activateOptionMs', ms);
  set(selectBox, '_activateOptionIndex', index);
}

function findOptionsMatchingChars(selectBox, chars) {
  chars = escapeRegExp(chars);

  const pattern = new RegExp(`^${chars}`, 'i');

  return selectBox.options.filter(option => {
    return pattern.test(collapseWhitespace(option.domElement.textContent));
  });
}
