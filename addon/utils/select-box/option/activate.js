import { set } from '@ember/object';
import invokeAction from '../../shared/invoke-action';
import scrollIntoView from '../../dom/scroll-into-view';

export function _activateOption(option) {
  invokeAction(option, '_onActivate', option);
}

function activatedOption(option) {
  invokeAction(option, 'onActivate', option.resolvedValue, option.api());
}

export function activateOptionAtIndex(selectBox, options, index, scroll) {
  const under = index < 0;
  const over = index > options.length - 1;

  if (under || over) {
    return;
  }

  set(this, 'activeOptionIndex', index);

  const option = selectBox.activeOption;

  if (scroll) {
    scrollIntoView(option.domElement);
  }

  activatedOption(option);
}
