import { all, resolve } from 'rsvp';
import { makeArray } from '@ember/array';
import { get, set } from '@ember/object';
const { freeze } = Object;

export default function setSelectBoxValue(selectBox, value) {
  if (value === selectBox.internalValue && selectBox.valueID > 0) {
    return resolve(value);
  }

  const id = selectBox.incrementProperty('valueID');

  set(selectBox, 'internalValue', value);

  return resolveValue(selectBox, value)
    .then(value => resolvedValue(selectBox, id, false, value))
    .catch(error => resolvedValue(selectBox, id, true, error));
}

function resolveValue(selectBox, value) {
  set(selectBox, 'isPending', true);
  set(selectBox, 'isRejected', false);
  set(selectBox, 'isFulfilled', false);
  set(selectBox, 'isSettled', false);

  return resolve(value).then(value => {
    if (get(selectBox, 'isMultiple')) {
      return all(makeArray(value));
    }

    return value;
  });
}

function resolvedValue(selectBox, id, failed, result) {
  if (selectBox.isDestroyed || id < selectBox.valueID) {
    return;
  }

  if (get(selectBox, 'isMultiple')) {
    result = freeze(result);
  }

  if (failed) {
    set(selectBox, 'isRejected', true);
  } else {
    set(selectBox, 'isFulfilled', true);
  }

  set(selectBox, 'isPending', false);
  set(selectBox, 'isSettled', true);
  set(selectBox, 'internalValue', result);
}
