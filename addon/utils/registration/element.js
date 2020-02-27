export function registerElement(component, element) {
  component.element = element;
}

export function deregisterElement(component) {
  component.element = null;
}
