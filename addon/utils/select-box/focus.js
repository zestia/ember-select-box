import invokeAction from '../component/invoke-action';

export function focusIn(selectBox, e) {
  try {
    selectBox.isFocused = true;
  } catch (error) {
    // https://github.com/emberjs/ember.js/issues/18043
  } finally {
    focusedIn(selectBox, e);
  }
}

export function focusOut(selectBox, e) {
  try {
    selectBox.isFocused = false;
  } catch (error) {
    // https://github.com/emberjs/ember.js/issues/18043
  } finally {
    focusedOut(selectBox, e);
  }
}

function focusedIn(selectBox, e) {
  invokeAction(selectBox, 'onFocusIn', e, selectBox.api);
}

function focusedOut(selectBox, e) {
  invokeAction(selectBox, 'onFocusOut', e, selectBox.api);
}
