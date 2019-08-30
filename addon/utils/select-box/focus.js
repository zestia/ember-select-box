import invokeAction from '../component/invoke-action';
import { getAPI } from '../component/api';
import { set } from '@ember/object';

export function focusIn(selectBox, e) {
  if (selectBox.isDestroyed) {
    return;
  }

  set(selectBox, 'isFocused', true);

  focusedIn(selectBox, e);
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

  focusedOut(selectBox, e);
}

function focusedIn(selectBox, e) {
  invokeAction(selectBox, 'onFocusIn', e, getAPI(selectBox));
}

function focusedOut(selectBox, e) {
  invokeAction(selectBox, 'onFocusOut', e, getAPI(selectBox));
}
