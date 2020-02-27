export function focusInput(selectBox) {
  if (selectBox.isDestroyed || !selectBox.input) {
    return;
  }

  selectBox.input.element.focus();
}

export function blurInput(selectBox) {
  if (selectBox.isDestroyed || !selectBox.input) {
    return;
  }

  selectBox.input.element.blur();
}
