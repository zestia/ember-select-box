import { schedule } from '@ember/runloop';
import { A as emberA } from '@ember/array';
import { set } from '@ember/object';

export function initOptions(selectBox, key) {
  set(selectBox, key, emberA());
}

export function registerOption(selectBox, key, option) {
  selectBox[key].addObject(option);
  scheduleUpdateOptions(selectBox, key);
}

export function deregisterOption(selectBox, key, option) {
  selectBox[key].removeObject(option);
  scheduleUpdateOptions(selectBox, key);
}

function scheduleUpdateOptions(selectBox, key) {
  // TODO once
  schedule('afterRender', updateOptions, selectBox, key);
}

function updateOptions(selectBox, key) {
  set(selectBox, key, emberA(selectBox[key].toArray()));
}
