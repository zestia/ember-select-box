import { set } from '@ember/object';
import invokeAction from '../../shared/invoke-action';
import { getAPI } from '../../shared/api';
import scrollIntoView from '../../dom/scroll-into-view';

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
