import { scheduleOnce } from '@ember/runloop';
import { A as emberA } from '@ember/array';
import { set } from '@ember/object';

export function initOptions(selectBox) {
  set(selectBox, '_options', emberA());
  set(selectBox, 'options', emberA());
}

export function registerOption(selectBox, option) {
  selectBox._options.addObject(option);
  scheduleUpdateOptions(selectBox);
}

export function deregisterOption(selectBox, option) {
  selectBox._options.removeObject(option);
  scheduleUpdateOptions(selectBox);
}

function scheduleUpdateOptions(selectBox) {
  scheduleOnce('afterRender', selectBox, updateOptions, selectBox);
}

function updateOptions(selectBox) {
  if (selectBox.isDestroyed || !selectBox.domElement) {
    return;
  }

  setOptions(selectBox, selectBox._options);
}

function setOptions(selectBox, options) {
  const elements = [
    ...selectBox.domElement.querySelectorAll('[data-component="option"]')
  ];

  const sort = (a, b) => {
    return elements.indexOf(a.domElement) - elements.indexOf(b.domElement);
  };

  set(selectBox, 'options', emberA(options.toArray().sort(sort)));
}
