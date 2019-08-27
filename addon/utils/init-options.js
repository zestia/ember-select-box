import { A as emberA } from '@ember/array';
import { set } from '@ember/object';

export default function initOptions(selectBox) {
  set(selectBox, '_options', emberA());
  set(selectBox, 'options', emberA());
}
