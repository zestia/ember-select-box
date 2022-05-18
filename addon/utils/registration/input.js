import { assert } from '@ember/debug';

export function registerInput(selectBox, input) {
  assert('select-box can only have 1 input', !selectBox.input);

  selectBox.input = input;
}

export function deregisterInput(selectBox) {
  selectBox.input = null;
}
