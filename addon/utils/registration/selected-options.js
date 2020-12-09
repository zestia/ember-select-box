import { assert } from '@ember/debug';

export function registerSelectedOptionsContainer(
  selectBox,
  selectedOptionsContainer
) {
  assert(
    'select-box can only have 1 selected options container',
    !selectBox.selectedOptionsContainer
  );

  selectBox.selectedOptionsContainer = selectedOptionsContainer;
}

export function deregisterSelectedOptionsContainer(selectBox) {
  selectBox.selectedOptionsContainer = null;
}
