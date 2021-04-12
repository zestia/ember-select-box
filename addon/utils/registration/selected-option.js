export function registerSelectedOption(selectBox, selectedOption) {
  selectBox.selectedOption = [...selectBox.selectedOption, selectedOption];
}

export function deregisterSelectedOption(selectBox, selectedOption) {
  selectBox.selectedOption.splice(
    selectBox.selectedOption.indexOf(selectedOption),
    1
  );
  selectBox.selectedOption = [...selectBox.selectedOption];
}
