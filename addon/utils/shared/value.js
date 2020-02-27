import invokeAction from '../component/invoke-action';
import { resolveValue } from '../component/value';
import { makeArray } from '@ember/array';
import { run } from '@ember/runloop';
const { freeze } = Object;

export function receiveValue(selectBox) {
  updateValue(selectBox, selectBox.args.value);
}

export function updateValue(selectBox, value) {
  return resolveValue(selectBox, value, processValue).then(() =>
    updatedValue(selectBox)
  );
}

export function selectValue(selectBox, value) {
  return updateValue(selectBox, value).then(() => {
    selectedValue(selectBox);
  });
}

function processValue(selectBox, value) {
  if (selectBox.isMultiple) {
    return freeze(makeArray(value).slice());
  }

  return value;
}

function updatedValue(selectBox) {
  if (selectBox.value === selectBox.previousValue) {
    return;
  }

  invokeAction(selectBox, 'onUpdate', selectBox.api);
}

export function selectedValue(selectBox) {
  invokeAction(selectBox, 'onSelect', selectBox.value, selectBox.api);
}
