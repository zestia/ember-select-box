import { assert } from '@ember/debug';

export function registerOptionsContainer(selectBox, optionsContainer) {
  assert(
    'select-box can only have 1 options container',
    !selectBox.optionsContainer
  );

  selectBox.optionsContainer = optionsContainer;
}

export function deregisterOptionsContainer(selectBox) {
  selectBox.optionsContainer = null;
}
