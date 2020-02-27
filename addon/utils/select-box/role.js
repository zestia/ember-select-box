export function configureAsCombobox(selectBox) {
  selectBox.tabIndex = '-1';
  selectBox.role = 'combobox';
}

export function configureAsListbox(selectBox) {
  selectBox.tabIndex = '0';
  selectBox.role = 'listbox';
}
