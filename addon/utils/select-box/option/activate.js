import { set } from '@ember/object';
import invokeAction from '../../component/invoke-action';
import { getAPI } from '../../component/api';
import scrollIntoView from '../../general/scroll-into-view';
import { filterComponentsByTextContent } from '../../component/filter';
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

  if (!char) {
    return;
  }

  const option = optionForChar(selectBox, char);

  if (option) {
    activateOptionAtIndex(selectBox, option.index, scroll);
  }
}

function optionForChar(selectBox, char) {
  const prev = selectBox.optionCharState || { chars: '', ms: 0, index: 0 };
  const prevChar = prev.chars.substring(prev.chars.length - 1);
  const ms = Date.now();
  const duration = ms - prev.ms;
  const repeatedChar = char === prevChar;
  const reset = duration > 1000;
  const chars = reset ? char : `${prev.chars}${char}`;

  let options = filterComponentsByTextContent(selectBox.options, chars);
  let index = 0;
  let option = null;

  if (repeatedChar) {
    index = prev.index + 1;
    options = filterComponentsByTextContent(selectBox.options, prevChar);
    option = options[index];
  }

  if (!option) {
    index = 0;
    option = options[index];
  }

  set(selectBox, 'optionCharState', { chars, ms, index });

  return option;
}
