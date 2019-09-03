import { scheduleOnce } from '@ember/runloop';
import { A as emberA } from '@ember/array';
import { set } from '@ember/object';

export function initOptions(selectBox) {
  set(selectBox, 'options', emberA());
}

export function registerOption(selectBox, option) {
  selectBox.options.addObject(option);
  scheduleUpdateOptions(selectBox);
}

export function deregisterOption(selectBox, option) {
  selectBox.options.removeObject(option);
  scheduleUpdateOptions(selectBox);
}

function scheduleUpdateOptions(selectBox) {
  scheduleOnce('afterRender', updateOptions, selectBox);
}

function updateOptions(selectBox) {
  set(selectBox, 'options', emberA(selectBox.options.toArray()));
}
