import { assert } from '@ember/debug';
import { scheduleOnce } from '@ember/runloop';

export function registerInput(selectBox, input) {
  scheduleOnce('afterRender', selectBox, _registerInput, selectBox, input);
}

export function deregisterInput(selectBox) {
  selectBox.input = null;
}

function _registerInput(selectBox, input) {
  assert('select-box can only have 1 input', !selectBox.input);

  selectBox.input = input;
}
