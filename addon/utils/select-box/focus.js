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
    focusedOut(selectBox, e);
  } catch (error) {
    // https://github.com/emberjs/ember.js/issues/18043
  }
}

function focusedOut(selectBox, e) {
  const focusInside =
    selectBox.element.contains(e.relatedTarget) ||
    selectBox.element.contains(document.activeElement);

  if (focusInside) {
    return;
  }

  selectBox.isFocused = false;

  invokeAction(selectBox, 'onFocusLeave', e, selectBox.api);
}
