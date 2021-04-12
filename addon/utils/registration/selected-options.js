import { assert } from '@ember/debug';

export function registerSelectedOptions(selectBox, selectedOptions) {
  assert(
    'select-box can only have 1 selected options container',
    !selectBox.selectedOptions
  );

  selectBox.selectedOptions = selectedOptions;
}

export function deregisterSelectedOptions(selectBox) {
  selectBox.selectedOptions = null;
}
