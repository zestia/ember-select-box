import { resolve } from 'rsvp';

export function receiveValue(component) {
  resolveValue(component, component.args.value);
}

export function resolveValue(component, unresolvedValue, postProcess) {
  const valueID = ++component.valueID;

  startedResolvingValue(component, unresolvedValue);

  return resolve(unresolvedValue)
    .then(result =>
      finishedResolvingValue(component, valueID, false, result, postProcess)
    )
    .catch(error =>
      finishedResolvingValue(component, valueID, true, error, postProcess)
    );
}

export function startedResolvingValue(component, unresolvedValue) {
  component.previousResolvedValue = component.resolvedValue;
  component.resolvedValue = unresolvedValue;
  component.isPending = true;
  component.isRejected = false;
  component.isFulfilled = false;
  component.isSettled = false;
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

  component.resolvedValue = value;
  component.isPending = false;
  component.isRejected = failed;
  component.isFulfilled = !failed;
  component.isSettled = true;
}
