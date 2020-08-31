import invokeAction from '../component/invoke-action';
import { resolveValue } from '../component/value';
import { makeArray } from '@ember/array';
const { freeze } = Object;

export function receiveValue(selectBox) {
  updateValue(selectBox, selectBox.args.value);
}

export async function updateValue(selectBox, value) {
  await resolveValue(selectBox, value, processValue);
  updatedValue(selectBox);
}

export async function selectValue(selectBox, value) {
  await updateValue(selectBox, value);
  selectedValue(selectBox);
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

  selectBox.previousValue = selectBox.value;

  invokeAction(selectBox, 'onUpdate', selectBox.api);
}

export function selectedValue(selectBox) {
  invokeAction(selectBox, 'onSelect', selectBox.value, selectBox.api);
}
