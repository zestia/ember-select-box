export function configureAsCombobox(selectBox) {
  if (selectBox.isDestroyed) {
    return;
  }

  selectBox.tabIndex = '-1';
  selectBox.role = 'combobox';
}

export function configureAsListbox(selectBox) {
  if (selectBox.isDestroyed) {
    return;
  }

  selectBox.tabIndex = '0';
  selectBox.role = 'listbox';
}
