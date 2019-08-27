import { resolve } from 'rsvp';
import { set } from '@ember/object';

export default function setOptionValue(option, value) {
  if (value === option.internalValue) {
    return;
  }

  const id = option.incrementProperty('valueID');

  set(option, 'internalValue', value);

  resolveValue(option, value)
    .then(value => resolvedValue(option, id, false, value))
    .catch(error => resolvedValue(option, id, true, error));
}

function resolveValue(option, value) {
  set(option, 'isPending', true);
  set(option, 'isRejected', false);
  set(option, 'isFulfilled', false);
  set(option, 'isSettled', false);

  return resolve(value);
}

function resolvedValue(option, id, failed, result) {
  if (option.isDestroyed || id < option.valueID) {
    return;
  }

  if (failed) {
    set(option, 'isRejected', true);
  } else {
    set(option, 'isFulfilled', true);
  }

  set(option, 'isPending', false);
  set(option, 'isSettled', true);
  set(option, 'internalValue', result);
}
