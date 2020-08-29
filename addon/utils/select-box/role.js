import { setTabIndex } from './focus';

export function configureAsCombobox(selectBox) {
  setTabIndex(selectBox, '-1');
  selectBox.role = 'combobox';
}

export function configureAsListbox(selectBox) {
  setTabIndex(selectBox, '0');
  selectBox.role = 'listbox';
}
