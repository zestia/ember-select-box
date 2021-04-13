export function registerOptions(selectBox, options) {
  selectBox.options = options;
}

export function deregisterOptions(selectBox) {
  selectBox.options = null;
}
