import invokeAction from '../component/invoke-action';

export function focusIn(selectBox, e) {
  try {
    selectBox.isFocused = true;
  } catch (error) {
    // https://github.com/emberjs/ember.js/issues/18043
  }
}

export function focusOut(selectBox, e) {
  try {
    selectBox.isFocused = false;

    focusedOut(selectBox, e);
  } catch (error) {
    // https://github.com/emberjs/ember.js/issues/18043
  }
}

function focusedOut(selectBox, e) {
  const focusLeave = !selectBox.element.contains(e.relatedTarget);

  if (focusLeave) {
    invokeAction(selectBox, 'onFocusLeave', e, selectBox.api);
  }
}
