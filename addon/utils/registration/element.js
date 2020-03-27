export function registerElement(component, element) {
  component.element = element;
}

export function deregisterElement(component) {
  console.log('de reg', component.element);
  component.element = null;
}
