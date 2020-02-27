export function registerElement(component, element) {
  component.domElement = element;
}

export function deregisterElement(component) {
  component.domElement = null;
}
