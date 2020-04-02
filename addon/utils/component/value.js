import { resolve } from 'rsvp';

export function receiveValue(component) {
  resolveValue(component, component.args.value);
}

export function resolveValue(component, value, postProcess) {
  const valueID = ++component.valueID;

  startedResolvingValue(component, value);

  return resolve(value)
    .then((result) =>
      finishedResolvingValue(component, valueID, false, result, postProcess)
    )
    .catch((error) =>
      finishedResolvingValue(component, valueID, true, error, postProcess)
    );
}

export function startedResolvingValue(component, value) {
  component.previousValue = component.value;
  component.value = value;
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
  if (valueID < component.valueID) {
    return;
  }

  let value = result;

  if (typeof postProcess === 'function') {
    value = postProcess(component, value);
  }

  component.value = value;
  component.isPending = false;
  component.isRejected = failed;
  component.isFulfilled = !failed;
  component.isSettled = true;
}
