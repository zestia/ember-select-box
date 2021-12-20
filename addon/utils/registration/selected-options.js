import { assert } from '@ember/debug';
import { scheduleOnce } from '@ember/runloop';

export function registerSelectedOptions(selectBox, selectedOptions) {
  scheduleOnce(
    'afterRender',
    selectBox,
    _registerSelectedOptions,
    selectBox,
    selectedOptions
  );
}

export function deregisterSelectedOptions(selectBox) {
  selectBox.selectedOptions = null;
}

function _registerSelectedOptions(selectBox, selectedOptions) {
  assert(
    'select-box can only have 1 selected options container',
    !selectBox.selectedOptions
  );

  selectBox.selectedOptions = selectedOptions;
}
