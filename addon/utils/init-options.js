import { A as emberA } from '@ember/array';
import { set } from '@ember/object';

export default function initOptions(component) {
  set(component, '_options', emberA());
  set(component, 'options', emberA());
}
