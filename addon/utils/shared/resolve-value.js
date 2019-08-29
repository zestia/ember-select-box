import { set } from '@ember/object';
import { resolve } from 'rsvp';

export default function resolveValue(component, value) {
  const valueID = component.incrementProperty('valueID');

  startedResolvingValue(component, value);

  return resolve(value).then(result => {
    finishedResolvingValue(component, valueID, false, result);
  }).catch(error => {
    finishedResolvingValue(component, valueID, false, error);
  });
}

export function startedResolvingValue(component, value) {
  set(component, 'isPending', true);
  set(component, 'isRejected', false);
  set(component, 'isFulfilled', false);
  set(component, 'isSettled', false);
}

export function finishedResolvingValue(component, valueID, failed, result) {
  if (component.isDestroyed || valueID < component.valueID) {
    return;
  }

  set(component, 'resolvedValue', result);
  set(component, 'isPending', false);
  set(component, 'isRejected', failed);
  set(component, 'isFulfilled', !failed);
  set(component, 'isSettled', true);
}
