import { scheduleOnce } from '@ember/runloop';
import { A as emberA } from '@ember/array';
import { set } from '@ember/object';

export function initSelectedOptions(selectBox) {
  set(selectBox, 'selectedOptions', emberA());
}

export function registerSelectedOption(selectBox, selectedOption) {
  selectBox.selectedOptions.addObject(selectedOption);
  scheduleUpdateSelectedOptions(selectBox);
}

export function deregisterSelectedOption(selectBox, selectedOption) {
  selectBox.selectedOptions.removeObject(selectedOption);
  scheduleUpdateSelectedOptions(selectBox);
}

function scheduleUpdateSelectedOptions(selectBox) {
  // TODO once
  scheduleOnce('afterRender', updateSelectedOptions, selectBox);
}

function updateSelectedOptions(selectBox) {
  set(selectBox, 'selectedOption', emberA(selectBox.selectedOptions.toArray()));
}
