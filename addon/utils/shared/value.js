import afterRender from '../general/after-render';
import invokeAction from '../component/invoke-action';
import { resolveValue } from '../component/value';
import { getAPI } from '../component/api';
import { makeArray } from '@ember/array';
const { freeze } = Object;

export function receiveValue(selectBox) {
  updateValue(selectBox, selectBox.value);
}

export function updateValue(selectBox, unresolvedValue) {
  return resolveValue(selectBox, unresolvedValue, processValue)
    .then(afterRender)
    .then(() => updatedValue(selectBox));
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

export function updatedValue(selectBox) {
  if (
    selectBox.isDestroyed ||
    selectBox.isDestroying ||
    selectBox.resolvedValue === selectBox.previousResolvedValue
  ) {
    return;
  }

  invokeAction(selectBox, 'onUpdate', getAPI(selectBox));
}

export function selectedValue(selectBox) {
  invokeAction(
    selectBox,
    'onSelect',
    selectBox.resolvedValue,
    getAPI(selectBox)
  );
}
