import invokeAction from '../component/invoke-action';

function focusedOut(selectBox, e) {
  const focusInside =
    selectBox.element.contains(e.relatedTarget) ||
    selectBox.element.contains(document.activeElement);

  if (focusInside) {
    return;
  }

  invokeAction(selectBox, 'onFocusLeave', e, selectBox.api);
}
