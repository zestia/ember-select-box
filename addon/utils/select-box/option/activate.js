import { set } from '@ember/object';
import invokeAction from '../../shared/invoke-action';
import scrollIntoView from '../../dom/scroll-into-view';

export function _activateOption(option) {
  invokeAction(option, '_onActivate', option);
}

function activatedOption(option) {
  invokeAction(option, 'onActivate', option.resolvedValue, option.api());
}


export function activateOption(selectBox, option) {
  activateOptionAtIndex(selectBox, option.index);
}

export function activateOptionAtIndex(selectBox, index, scroll) {
  console.log(selectBox, index);

  const under = index < 0;
  const over = index > selectBox.options.length - 1;

  if (under || over) {
    return;
  }

  console.log('before', selectBox.activeOption);

  set(this, 'activeOptionIndex', index);

  const option = selectBox.activeOption;

  console.log('after', option);

  if (scroll) {
    scrollIntoView(option.domElement);
  }

  activatedOption(option);
}
