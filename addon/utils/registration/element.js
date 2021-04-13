import { modifier } from 'ember-modifier';

export function registerElement(component, element) {
  component.element = element;
}

export function deregisterElement(component) {
  component.element = null;
}

export default function registerElementModifier(selectBox) {
  return modifier((element) => {
    selectBox.element = element;

    return () => (selectBox.element = null);
  });
}
