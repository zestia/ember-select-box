import { set } from '@ember/object';
import invokeAction from '../../component/invoke-action';
import { maybeScrollIntoView } from '../../general/scroll-into-view';
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

export function activateSelectedOption(selectBox, selectedOption) {
  activateSelectedOptionAtIndex(selectBox, selectedOption.index);
}

export function activateSelectedOptionAtIndex(selectBox, index, config = {}) {
  const under = index < 0;
  const over = index > selectBox.selectedOptions.length - 1;

  if (under || over) {
    return;
  }

  set(selectBox, 'activeSelectedOptionIndex', index);

  const selectedOption = selectBox.activeSelectedOption;

  maybeScrollIntoView(selectedOption.domElement, config);
  activatedSelectedOption(selectedOption);
}

export function activateSelectedOptionForKeyCode() {
  throw new Error('Not implemented');
}
