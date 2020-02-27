import { set } from '@ember/object';
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

  selectBox.activeSelectedOptionIndex = index;
}

export function activateSelectedOptionAtIndex(selectBox, index, config) {
  setActiveSelectedOptionIndex(selectBox, index);

  const selectedOption = selectBox.activeSelectedOption;

  if (!selectedOption) {
    return;
  }

  maybeScrollIntoView(selectedOption, config);
  activatedSelectedOption(selectedOption);
}

export function activateNextSelectedOption(selectBox, config) {
  activateSelectedOptionAtIndex(
    selectBox,
    selectBox.activeSelectedOptionIndex + 1,
    {
      scrollIntoView: false,
      ...config
    }
  );
}

export function activatePreviousSelectedOption(selectBox, config) {
  activateSelectedOptionAtIndex(
    selectBox,
    selectBox.activeSelectedOptionIndex - 1,
    {
      scrollIntoView: false,
      ...config
    }
  );
}
