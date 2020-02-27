import invokeAction from '../../component/invoke-action';
import { getAPI } from '../../component/api';
import { filterComponentsByTextContent } from '../../component/filter';
import { maybeScrollIntoView } from '../../component/scroll-into-view';
const { fromCharCode } = String;

export function _activateOption(option) {
  invokeAction(option, '_onActivate', option);
}

function activatedOption(option) {
  invokeAction(option, 'onActivate', option.value, getAPI(option));
}

export function activateOption(selectBox, option, config) {
  activateOptionAtIndex(selectBox, option.index, config);
}

function setActiveOptionIndex(selectBox, index) {
  const under = index < 0;
  const over = index > selectBox.options.length - 1;

  if (under || over) {
    return;
  }

  selectBox.activeOptionIndex = index;
}

export function activateOptionAtIndex(selectBox, index, config) {
  setActiveOptionIndex(selectBox, index);

  const option = selectBox.activeOption;

  if (!option) {
    return;
  }

  maybeScrollIntoView(option, config);
  activatedOption(option);
}

export function activateNextOption(selectBox, config) {
  activateOptionAtIndex(selectBox, selectBox.activeOptionIndex + 1, {
    scrollIntoView: true,
    ...config
  });
}

export function activatePreviousOption(selectBox, config) {
  activateOptionAtIndex(selectBox, selectBox.activeOptionIndex - 1, {
    scrollIntoView: true,
    ...config
  });
}

export function activateOptionForValue(selectBox, value, config) {
  const option = selectBox.options.find(
    option => option.value === value
  );

  if (!option) {
    return;
  }

  activateOption(selectBox, option, {
    scrollIntoView: true,
    ...config
  });
}

export function activateOptionForKeyCode(selectBox, keyCode, config) {
  const char = fromCharCode(keyCode);

  if (!char) {
    return;
  }

  const option = optionForChar(selectBox, char);

  if (!option) {
    return;
  }

  activateOption(selectBox, option, {
    scrollIntoView: true,
    ...config
  });
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

  selectBox.optionCharState = { chars, ms, index };

  return option;
}
