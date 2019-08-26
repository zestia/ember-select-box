import { set } from '@ember/object';
import domElementId from './dom-element-id';

export default function registerElement(component, element) {
  set(component, 'domElement', element);
  set(component, 'domElementId', domElementId(element));
}
