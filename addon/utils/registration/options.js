import { assert } from '@ember/debug';

export function registerOptionsContainer(selectBox, optionsContainer) {
  assert(
    'A select box can only have 1 options container',
    !selectBox.optionsContainer
  );

  selectBox.optionsContainer = optionsContainer;
}

export function deregisterOptionsContainer(selectBox, optionsContainer) {
  selectBox.optionsContainer = null;
}
