import { filterComponentsByTextContent } from '../../component/filter';
import { maybeScrollIntoView } from '../../component/scroll-into-view';
const { fromCharCode } = String;

export function _activateOption(option) {
  if (option.args.selectBox.activeOption === option) {
    return;
  }

  option.args._onActivate?.(option);
}

function activatedOption(option) {
  option.args.onActivate?.(option.value, option.args.selectBox.api);
}

export function activateOption(selectBox, option, config) {
  activateOptionAtIndex(selectBox, option.index, config);
}

export function deactivateOptions(selectBox) {
  _setActiveOptionIndex(selectBox, -1);
}

function focusOption(option) {
  option.element.focus();
}

function _setActiveOptionIndex(selectBox, index) {
  selectBox.activeOptionIndex = index;
}

function setActiveOptionIndex(selectBox, index) {
  const under = index < 0;
  const over = index > selectBox.option.length - 1;

  if (under || over) {
    return;
  }

  _setActiveOptionIndex(selectBox, index);
}

export function activateOptionAtIndex(selectBox, index, config) {
  setActiveOptionIndex(selectBox, index);

  const option = selectBox.activeOption;

  if (!option) {
    return;
  }

  maybeScrollIntoView(option, config);
  focusOption(option);
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
  const option = selectBox.option.find((option) => option.value === value);

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
  const prev = selectBox.charState ?? { chars: '', index: 0 };
  const prevChar = prev.chars.substring(prev.chars.length - 1);
  const repeatedChar = char === prevChar;
  const chars = `${prev.chars}${char}`;
  const registeredOptions = selectBox.option;

  let options = filterComponentsByTextContent(registeredOptions, chars);
  let index = 0;
  let option = null;

  if (repeatedChar) {
    index = prev.index + 1;
    options = filterComponentsByTextContent(registeredOptions, prevChar);
    option = options[index];
  }

  if (!option) {
    index = 0;
    option = options[index];
  }

  if (prev.timer) {
    clearTimeout(prev.timer);
  }

  const timer = setTimeout(() => (selectBox.charState = null), 1000);
  const next = { chars, index, timer };

  selectBox.charState = next;

  return option;
}
