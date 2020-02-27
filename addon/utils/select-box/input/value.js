export function setInputValue(selectBox, value) {
  if (selectBox.isDestroyed || !selectBox.input) {
    return;
  }

  selectBox.input.domElement.value = value;
}
