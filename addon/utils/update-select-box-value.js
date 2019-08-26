import { all, resolve } from 'rsvp';
import { makeArray } from '@ember/array';
import { get, set } from '@ember/object';
const { freeze } = Object;

export default function updateSelectBoxValue(component, value) {
  if (value === component.internalValue && component.valueID > 0) {
    return resolve(value);
  }

  const id = component.incrementProperty('valueID');

  set(component, 'internalValue', value);

  return resolveValue(component, value)
    .then(value => resolvedValue(component, id, false, value))
    .catch(error => resolvedValue(component, id, true, error));
}

function resolveValue(component, value) {
  set(component, 'isPending', true);
  set(component, 'isRejected', false);
  set(component, 'isFulfilled', false);
  set(component, 'isSettled', false);

  return resolve(value).then(value => {
    if (get(component, 'isMultiple')) {
      return all(makeArray(value));
    }

    return value;
  });
}

function resolvedValue(component, id, failed, result) {
  if (component.isDestroyed || id < component.valueID) {
    return;
  }

  if (get(component, 'isMultiple')) {
    result = freeze(result);
  }

  if (failed) {
    set(component, 'isRejected', true);
  } else {
    set(component, 'isFulfilled', true);
  }

  set(component, 'isPending', false);
  set(component, 'isSettled', true);
  set(component, 'internalValue', result);
}
