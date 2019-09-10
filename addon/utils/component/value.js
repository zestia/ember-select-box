import { set } from '@ember/object';
import { resolve } from 'rsvp';
import { run } from '@ember/runloop';

export function receiveValue(component) {
  resolveValue(component, component.value);
}

export function resolveValue(component, unresolvedValue, process) {
  const valueID = component.incrementProperty('valueID');

  startedResolvingValue(component, unresolvedValue);

  return resolve(unresolvedValue)
    .then(result => {
      run(() => {
        finishedResolvingValue(component, valueID, false, result, process);
      });
    })
    .catch(error => {
      run(() => {
        finishedResolvingValue(component, valueID, true, error, process);
      });
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
  process
) {
  if (component.isDestroyed || valueID < component.valueID) {
    return;
  }

  let value = result;

  if (typeof process === 'function') {
    value = process(component, value);
  }

  set(component, 'resolvedValue', value);
  set(component, 'isPending', false);
  set(component, 'isRejected', failed);
  set(component, 'isFulfilled', !failed);
  set(component, 'isSettled', true);
}
