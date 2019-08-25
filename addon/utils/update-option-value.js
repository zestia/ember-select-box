import { resolve } from 'rsvp';
import { set } from '@ember/object';

export default function updateOptionValue(component, value) {
  if (value === component.internalValue) {
    return;
  }

  const id = component.incrementProperty('valueID');

  set(component, 'internalValue', value);

  resolveValue(component, value)
    .then(value => resolvedValue(component, id, false, value))
    .catch(error => resolvedValue(component, id, true, error));
}

function resolveValue(component, value) {
  set(component, 'isPending', true);
  set(component, 'isRejected', false);
  set(component, 'isFulfilled', false);
  set(component, 'isSettled', false);

  return resolve(value);
}

function resolvedValue(component, id, failed, result) {
  if (component.isDestroyed || id < component.valueID) {
    return;
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
