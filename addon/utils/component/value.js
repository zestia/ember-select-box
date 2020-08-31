export function receiveValue(component) {
  resolveValue(component, component.args.value);
}

export async function resolveValue(component, _value, postProcess) {
  const valueID = startResolvingValue(component, _value);

  try {
    const value = processValue(component, postProcess, await _value);

    handleValue(component, valueID, value, false);
  } catch (error) {
    handleValue(component, valueID, error, true);
  }
}

function startResolvingValue(component, value) {
  component.value = value;
  component.isPending = true;
  component.isRejected = false;
  component.isFulfilled = false;
  component.isSettled = false;

  return ++component.valueID;
}

function handleValue(component, valueID, value, erred) {
  if (valueID < component.valueID) {
    return;
  }

  finishResolvingValue(component, value, erred);
}

function finishResolvingValue(component, value, erred) {
  component.value = value;
  component.isPending = false;
  component.isRejected = erred;
  component.isFulfilled = !erred;
  component.isSettled = true;
}

function processValue(component, fn, value) {
  if (typeof fn === 'function') {
    return fn(component, value);
  }

  return value;
}
