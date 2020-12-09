import { scheduleOnce } from '@ember/runloop';

export function registerOption(selectBox, option) {
  selectBox.pendingOptions.push(option);
  scheduleUpdateOptions(selectBox);
}

export function deregisterOption(selectBox, option) {
  selectBox.pendingOptions.splice(selectBox.pendingOptions.indexOf(option), 1);
  scheduleUpdateOptions(selectBox);
}

function scheduleUpdateOptions(selectBox) {
  scheduleOnce('afterRender', selectBox, updateOptions, selectBox);
}

function updateOptions(selectBox) {
  if (selectBox.isDestroying) {
    return;
  }

  setOptions(selectBox, selectBox.pendingOptions);
}

function setOptions(selectBox, options) {
  const elements = [
    ...selectBox.element.querySelectorAll('.select-box__option')
  ];

  const sort = (a, b) =>
    elements.indexOf(a.element) - elements.indexOf(b.element);

  selectBox.options = [...options].sort(sort);
}
