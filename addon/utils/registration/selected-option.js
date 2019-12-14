import { scheduleOnce } from '@ember/runloop';
import { A as emberA } from '@ember/array';
import { set } from '@ember/object';

export function initSelectedOptions(selectBox) {
  set(selectBox, '_selectedOptions', emberA());
  set(selectBox, 'selectedOptions', emberA());
}

export function registerSelectedOption(selectBox, selectedOption) {
  selectBox._selectedOptions.addObject(selectedOption);
  scheduleUpdateSelectedOptions(selectBox);
}

export function deregisterSelectedOption(selectBox, selectedOption) {
  selectBox._selectedOptions.removeObject(selectedOption);
  scheduleUpdateSelectedOptions(selectBox);
}

function scheduleUpdateSelectedOptions(selectBox) {
  scheduleOnce('afterRender', selectBox, updateSelectedOptions, selectBox);
}

function updateSelectedOptions(selectBox) {
  if (selectBox.isDestroyed || !selectBox.domElement) {
    return;
  }

  setSelectedOptions(selectBox, selectBox._selectedOptions);
}

function setSelectedOptions(selectBox, selectedOptions) {
  const elements = [
    ...selectBox.domElement.querySelectorAll(
      '[data-component="selected-option"]'
    )
  ];

  const sort = (a, b) => {
    return elements.indexOf(a.domElement) - elements.indexOf(b.domElement);
  };

  set(
    selectBox,
    'selectedOptions',
    emberA(selectedOptions.toArray().sort(sort))
  );
}
