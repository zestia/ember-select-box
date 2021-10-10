export function registerInput(selectBox, input) {
  selectBox.input = input;
}

export function deregisterInput(selectBox) {
  selectBox.input = null;
}
