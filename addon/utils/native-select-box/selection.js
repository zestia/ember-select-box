const { from } = Array;

export function getSelectedValue(selectBox) {
  const selectedValues = getSelectedValues(selectBox);

  if (selectBox.isMultiple) {
    return selectedValues;
  } else {
    return selectedValues[0];
  }
}

function getSelectedValues(selectBox) {
  const registered = getRegisteredSelectedValues(selectBox);
  const unregistered = getUnregisteredSelectedValues(selectBox);

  if (registered.length > 0) {
    return registered;
  } else {
    return unregistered;
  }
}

function getRegisteredSelectedValues(selectBox) {
  return selectBox.options
    .filter(option => option.element.selected)
    .map(option => option.value);
}

function getUnregisteredSelectedValues(selectBox) {
  return from(selectBox.element.querySelectorAll('option:checked')).map(
    element => element.value
  );
}
