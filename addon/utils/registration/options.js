import { assert } from '@ember/debug';

export function registerOptions(selectBox, options) {
  assert('select-box can only have 1 options container', !selectBox.options);

  selectBox.options = options;
}

export function deregisterOptions(selectBox) {
  selectBox.options = null;
}
