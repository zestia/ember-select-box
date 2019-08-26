import { get } from '@ember/object';
const { from } = Array;

export default function getSelectedValue(component) {
  const selectedValues = getSelectedValues(component);

  if (get(component, 'isMultiple')) {
    return selectedValues;
  } else {
    return selectedValues[0];
  }
}

function getSelectedValues(component) {
  const registered = getRegisteredSelectedValues(component);
  const unregistered = getUnregisteredSelectedValues(component);

  if (registered.length > 0) {
    return registered;
  } else {
    return unregistered;
  }
}

function getRegisteredSelectedValues(component) {
  return component.options
    .filter(option => option.domElement.selected)
    .map(option => option.internalValue);
}

function getUnregisteredSelectedValues(component) {
  return from(component.domElement.querySelectorAll('option:checked')).map(
    element => element.value
  );
}
