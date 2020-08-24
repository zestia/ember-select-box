import invokeAction from '../component/invoke-action';

export function focusOut(selectBox, e) {
  const focusInside =
    selectBox.element.contains(e.relatedTarget) ||
    selectBox.element.contains(document.activeElement);

  if (focusInside) {
    return;
  }

  focusedOut(selectBox, e);
}

function focusedOut(selectBox, e) {
  invokeAction(selectBox, 'onFocusLeave', e, selectBox.api);
}
