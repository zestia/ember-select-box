import { set } from '@ember/object';

export function registerElement(component, element) {
  set(component, 'domElement', element);
}

export function deregisterElement(component) {
  set(component, 'domElement', null);
}
