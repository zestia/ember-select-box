import invokeAction from '../component/invoke-action';
import { resolveValue } from '../component/value';
import { getAPI } from '../component/api';
import { makeArray } from '@ember/array';
import { run } from '@ember/runloop';
const { freeze } = Object;

export function receiveValue(selectBox) {
  updateValue(selectBox, selectBox.args.value);
}

export function updateValue(selectBox, unresolvedValue) {
  if (selectBox.isDestroyed) {
    return;
  }

  return resolveValue(selectBox, unresolvedValue, processValue).then(() =>
    updatedValue(selectBox)
  );
}

export function selectValue(selectBox, value) {
  if (selectBox.isDestroyed) {
    return;
  }

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
  if (
    selectBox.isDestroyed ||
    selectBox.isDestroying ||
    selectBox.resolvedValue === selectBox.previousResolvedValue
  ) {
    return;
  }

  invokeAction(selectBox, 'onUpdate', run(getAPI, selectBox));
}

export function selectedValue(selectBox) {
  invokeAction(
    selectBox,
    'onSelect',
    selectBox.resolvedValue,
    getAPI(selectBox)
  );
}
