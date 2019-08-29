import { assert } from '@ember/debug';
import { set } from '@ember/object';

export function registerOptionsContainer(selectBox, optionsContainer) {
  assert(
    'A select box can only have 1 options container',
    !selectBox.optionsContainer
  );

  set(selectBox, 'optionsContainer', optionsContainer);
}

export function deregisterOptionsContainer(selectBox, optionsContainer) {
  set(selectBox, 'optionsContainer', null);
}
