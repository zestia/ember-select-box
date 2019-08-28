import { get } from '@ember/object';
const { from } = Array;

export default function getSelectedValue(selectBox) {
  const selectedValues = getSelectedValues(selectBox);

  if (get(selectBox, 'isMultiple')) {
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
    .filter(option => option.domElement.selected)
    .map(option => option.resolvedValue);
}

function getUnregisteredSelectedValues(selectBox) {
  return from(selectBox.domElement.querySelectorAll('option:checked')).map(
    element => element.value
  );
}
