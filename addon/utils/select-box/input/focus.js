export function focusInput(selectBox) {
  if (!selectBox.input) {
    return;
  }

  selectBox.input.element.focus();
}

export function blurInput(selectBox) {
  if (!selectBox.input) {
    return;
  }

  selectBox.input.element.blur();
}
