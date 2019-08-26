import { set } from '@ember/object';

export default function keydown(component) {
  set(component, 'domElement', null);
  set(component, 'domElementId', null);
}
