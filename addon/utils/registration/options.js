import { assert } from '@ember/debug';
import { scheduleOnce } from '@ember/runloop';

export function registerOptions(selectBox, options) {
  scheduleOnce('afterRender', selectBox, _registerOptions, selectBox, options);
}

export function deregisterOptions(selectBox) {
  selectBox.options = null;
}

function _registerOptions(selectBox, options) {
  assert('select-box can only have 1 options container', !selectBox.options);

  selectBox.options = options;
}
