import { set } from '@ember/object';

export default function deregisterElement(component) {
  set(component, 'domElement', null);
  set(component, 'domElementId', null);
}
