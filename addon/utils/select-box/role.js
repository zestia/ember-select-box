import { set } from '@ember/object';

export function configureAsCombobox(selectBox) {
  if (selectBox.isDestroyed) {
    return;
  }

  set(selectBox, 'tabIndex', '-1');
  set(selectBox, 'role', 'combobox');
}

export function configureAsListbox(selectBox) {
  if (selectBox.isDestroyed) {
    return;
  }

  // todo if has options

  set(selectBox, 'tabIndex', '0');
  set(selectBox, 'role', 'listbox');
}
