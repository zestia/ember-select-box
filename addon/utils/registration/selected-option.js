import { scheduleOnce } from '@ember/runloop';

export function registerSelectedOption(selectBox, selectedOption) {
  selectBox.pendingSelectedOptions.addObject(selectedOption);
  scheduleUpdateSelectedOptions(selectBox);
}

export function deregisterSelectedOption(selectBox, selectedOption) {
  selectBox.pendingSelectedOptions.removeObject(selectedOption);
  scheduleUpdateSelectedOptions(selectBox);
}

function scheduleUpdateSelectedOptions(selectBox) {
  scheduleOnce('afterRender', selectBox, updateSelectedOptions, selectBox);
}

function updateSelectedOptions(selectBox) {
  if (selectBox.isDestroyed || !selectBox.element) {
    return;
  }

  setSelectedOptions(selectBox, selectBox.pendingSelectedOptions);
}

function setSelectedOptions(selectBox, selectedOptions) {
  const elements = [
    ...selectBox.element.querySelectorAll('[data-component="selected-option"]')
  ];

  const sort = (a, b) =>
    elements.indexOf(a.element) - elements.indexOf(b.element);

  selectBox.selectedOptions = selectedOptions.toArray().sort(sort);
}
