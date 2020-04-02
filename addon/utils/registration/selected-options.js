import { assert } from '@ember/debug';

export function registerSelectedOptionsContainer(
  selectBox,
  selectedOptionsContainer
) {
  assert(
    'A select box can only have 1 selected options container',
    !selectBox.optionsContainer
  );

  selectBox.selectedOptionsContainer = selectedOptionsContainer;
}

export function deregisterSelectedOptionsContainer(
  selectBox,
  selectedOptionsContainer
) {
  selectBox.selectedOptionsContainer = null;
}
