import { scheduleOnce } from '@ember/runloop';

export function registerOption(selectBox, option) {
  selectBox.pendingOptions.addObject(option);
  scheduleUpdateOptions(selectBox);
}

export function deregisterOption(selectBox, option) {
  selectBox.pendingOptions.removeObject(option);
  scheduleUpdateOptions(selectBox);
}

function scheduleUpdateOptions(selectBox) {
  scheduleOnce('afterRender', selectBox, updateOptions, selectBox);
}

function updateOptions(selectBox) {
  if (selectBox.isDestroyed || !selectBox.element) {
    return;
  }

  setOptions(selectBox, selectBox.pendingOptions);
}

function setOptions(selectBox, options) {
  const elements = [
    ...selectBox.element.querySelectorAll('[data-component="option"]')
  ];

  const sort = (a, b) =>
    elements.indexOf(a.element) - elements.indexOf(b.element);

  selectBox.options = options.toArray().sort(sort);
}
