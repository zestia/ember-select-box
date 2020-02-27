export function setInputValue(selectBox, value) {
  if (selectBox.isDestroyed || !selectBox.input) {
    return;
  }

  selectBox.input.element.value = value;
}
