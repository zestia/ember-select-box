import { set } from '@ember/object';
import { assign } from '@ember/polyfills';
import invokeAction from '../../component/invoke-action';
import { maybeScrollIntoView } from '../../component/scroll-into-view';
import { getAPI } from '../../component/api';

export function _activateSelectedOption(selectedOption) {
  invokeAction(selectedOption, '_onActivate', selectedOption);
}

function activatedSelectedOption(selectedOption) {
  invokeAction(
    selectedOption,
    'onActivate',
    selectedOption.resolvedValue,
    getAPI(selectedOption)
  );
}

export function activateSelectedOption(selectBox, selectedOption, config) {
  activateSelectedOptionAtIndex(selectBox, selectedOption.index, config);
}

function setActiveSelectedOptionIndex(selectBox, index) {
  const under = index < 0;
  const over = index > selectBox.selectedOptions.length - 1;

  if (under || over) {
    return;
  }

  set(selectBox, 'activeSelectedOptionIndex', index);
}

export function activateSelectedOptionAtIndex(selectBox, index, config) {
  setActiveSelectedOptionIndex(selectBox, index);

  const selectedOption = selectBox.activeSelectedOption;

  maybeScrollIntoView(selectedOption, config);
  activatedSelectedOption(selectedOption);
}

export function activateNextSelectedOption(selectBox, config) {
  config = assign({ scrollIntoView: false }, config);

  activateSelectedOptionAtIndex(
    selectBox,
    selectBox.activeSelectedOptionIndex + 1,
    config
  );
}

export function activatePreviousSelectedOption(selectBox, config) {
  config = assign({ scrollIntoView: false }, config);

  activateSelectedOptionAtIndex(
    selectBox,
    selectBox.activeSelectedOptionIndex - 1,
    config
  );
}
