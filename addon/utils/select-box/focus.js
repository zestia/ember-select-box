import { scheduleOnce } from '@ember/runloop';

export function focusOut(selectBox, e) {
  scheduleOnce('afterRender', selectBox, focusOutSettled, selectBox, e);
}

function focusOutSettled(selectBox, e) {
  if (selectBox.isDestroying) {
    return;
  }

  const focusInside =
    selectBox.element.contains(e.relatedTarget) ||
    selectBox.element.contains(document.activeElement);

  if (focusInside) {
    return;
  }

  focusedOut(selectBox, e);
}

function focusedOut(selectBox, e) {
  selectBox.args.onFocusLeave?.(e, selectBox.api);
}
