import { set } from '@ember/object';
import domElementId from '../dom/element-id';

export function registerElement(component, element) {
  set(component, 'domElement', element);
  set(component, 'domElementId', domElementId(element));
}

export function deregisterElement(component) {
  set(component, 'domElement', null);
  set(component, 'domElementId', null);
}
