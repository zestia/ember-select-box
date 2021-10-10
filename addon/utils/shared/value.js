import { resolveValue } from '../component/value';
import { makeArray } from '@ember/array';
import Modifier from 'ember-modifier';
const { freeze } = Object;

export function receiveValue(selectBox) {
  return class extends Modifier {
    didReceiveArguments() {
      updateValue(selectBox, selectBox.args.value);
    }
  };
}

export function updateValue(selectBox, value) {
  return resolveValue(selectBox, value, processValue).then(() =>
    updatedValue(selectBox)
  );
}

export function selectValue(selectBox, value) {
  return updateValue(selectBox, value).then(() => selectedValue(selectBox));
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

  selectBox.args.onUpdate?.(selectBox.api);
}

export function selectedValue(selectBox) {
  selectBox.args.onSelect?.(selectBox.value, selectBox.api);
}
