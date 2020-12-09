export function registerSelectedOption(selectBox, selectedOption) {
  selectBox.selectedOptions = [...selectBox.selectedOptions, selectedOption];
}

export function deregisterOptionsContainer(selectBox, selectedOption) {
  selectBox.selectedOptions = [
    ...selectBox.selectedOptions.splice(
      selectBox.selectedOptions.indexOf(selectedOption),
      1
    )
  ];
}
