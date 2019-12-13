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
  scheduleOnce('afterRender', selectBox, updateSelectedOptions, selectBox);
}

function updateSelectedOptions(selectBox) {
  set(
    selectBox,
    'selectedOptions',
    emberA(selectBox.selectedOptions.toArray())
  );
}
