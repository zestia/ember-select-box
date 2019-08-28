import invokeAction from '../shared/invoke-action';
import { set } from '@ember/object';

export function focusIn(selectBox, e) {
  if (selectBox.isDestroyed) {
    return;
  }

  set(selectBox, 'isFocused', true);

  invokeAction(selectBox, 'onFocusIn', e, selectBox.api());
}

export function focusOut(selectBox, e) {
  if (selectBox.isDestroyed) {
    return;
  }

  try {
    set(selectBox, 'isFocused', false);
  } catch (error) {
    // https://github.com/emberjs/ember.js/issues/18043
  }

  invokeAction(selectBox, 'onFocusOut', e, selectBox.api());
}
