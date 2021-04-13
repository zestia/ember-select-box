export function registerSelectedOptions(selectBox, selectedOptions) {
  selectBox.selectedOptions = selectedOptions;
}

export function deregisterSelectedOptions(selectBox) {
  selectBox.selectedOptions = null;
}
