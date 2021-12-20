import { scheduleOnce } from '@ember/runloop';

export function registerSelectedOption(selectBox, option) {
  selectBox.pendingSelectedOption.push(option);
  scheduleUpdateSelectedOptions(selectBox);
}

export function deregisterSelectedOption(selectBox, option) {
  selectBox.pendingSelectedOption.splice(
    selectBox.pendingSelectedOption.indexOf(option),
    1
  );
  scheduleUpdateSelectedOptions(selectBox);
}

function scheduleUpdateSelectedOptions(selectBox) {
  scheduleOnce('afterRender', selectBox, updateSelectedOptions, selectBox);
}

function updateSelectedOptions(selectBox) {
  if (selectBox.isDestroying) {
    return;
  }

  setSelectedOptions(selectBox, selectBox.pendingSelectedOption);
}

function setSelectedOptions(selectBox, selectedOptions) {
  const elements = [
    ...selectBox.element.querySelectorAll('.select-box__selected-option')
  ];

  const sort = (a, b) =>
    elements.indexOf(a.element) - elements.indexOf(b.element);

  selectBox.selectedOption = [...selectedOptions].sort(sort);
}
