import { all } from 'rsvp';
import { makeArray } from '@ember/array';
import { get, set } from '@ember/object';
const { freeze } = Object;

export default async function resolveValue(component, value) {
  if (value === component.resolvedValue && component.valueID > 0) {
    return value;
  }

  const valueID = component.incrementProperty('valueID');

  set(component, 'resolvedValue', value);

  let result;

  try {
    result = await beginResolvingValue(component, value);
    finishResolvingValue(component, valueID, false, result);
  } catch (error) {
    finishResolvingValue(component, valueID, false, error);
  }
}

async function beginResolvingValue(component, value) {
  set(component, 'isPending', true);
  set(component, 'isRejected', false);
  set(component, 'isFulfilled', false);
  set(component, 'isSettled', false);

  value = await value;

  // todo await

  if (get(component, 'isMultiple')) {
    return all(makeArray(value));
  }

  return value;
}

function finishResolvingValue(component, valueID, failed, result) {
  if (component.isDestroyed || valueID < component.valueID) {
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
  set(component, 'resolvedValue', result);
}
