export function registerSelectedOption(selectBox, selectedOption) {
  selectBox.selectedOptions = [...selectBox.selectedOptions, selectedOption];
}

export function deregisterSelectedOption(selectBox, selectedOption) {
  selectBox.selectedOptions.splice(
    selectBox.selectedOptions.indexOf(selectedOption),
    1
  );
  selectBox.selectedOptions = [...selectBox.selectedOptions];
}
