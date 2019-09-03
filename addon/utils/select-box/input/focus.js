export function focusInput(selectBox) {
  if (selectBox.isDestroyed || !selectBox.input) {
    return;
  }

  selectBox.input.domElement.focus();
}

export function blurInput(selectBox) {
  if (selectBox.isDestroyed || !selectBox.input) {
    return;
  }

  selectBox.input.domElement.blur();
}
