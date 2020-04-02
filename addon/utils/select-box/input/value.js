export function setInputValue(selectBox, value) {
  if (!selectBox.input) {
    return;
  }

  selectBox.input.element.value = value;
}
