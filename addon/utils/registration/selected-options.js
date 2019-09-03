import { assert } from '@ember/debug';
import { set } from '@ember/object';

export function registerSelectedOptionsContainer(
  selectBox,
  selectedOptionsContainer
) {
  assert(
    'A select box can only have 1 selected options container',
    !selectBox.optionsContainer
  );

  set(selectBox, 'selectedOptionsContainer', selectedOptionsContainer);
}

export function deregisterSelectedOptionsContainer(
  selectBox,
  selectedOptionsContainer
) {
  set(selectBox, 'selectedOptionsContainer', null);
}
