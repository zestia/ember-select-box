import { set } from '@ember/object';
import { resolve } from 'rsvp';

export function receiveValue(component) {
  resolveValue(component, component.value);
}

export function resolveValue(component, unresolvedValue, postProcess) {
  const valueID = component.incrementProperty('valueID');

  startedResolvingValue(component, unresolvedValue);

  return resolve(unresolvedValue)
    .then(result => {
      finishedResolvingValue(component, valueID, false, result, postProcess);
    })
    .catch(error => {
      finishedResolvingValue(component, valueID, true, error, postProcess);
    });
}

export function startedResolvingValue(component, unresolvedValue) {
  set(component, 'previousResolvedValue', component.resolvedValue);
  set(component, 'resolvedValue', unresolvedValue);
  set(component, 'isPending', true);
  set(component, 'isRejected', false);
  set(component, 'isFulfilled', false);
  set(component, 'isSettled', false);
}

export function finishedResolvingValue(
  component,
  valueID,
  failed,
  result,
  postProcess
) {
  if (component.isDestroyed || valueID < component.valueID) {
    return;
  }

  let value = result;

  if (typeof postProcess === 'function') {
    value = postProcess(component, value);
  }

  set(component, 'resolvedValue', value);
  set(component, 'isPending', false);
  set(component, 'isRejected', failed);
  set(component, 'isFulfilled', !failed);
  set(component, 'isSettled', true);
}
