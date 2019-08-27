import { schedule } from '@ember/runloop';
import { A as emberA } from '@ember/array';
import { set } from '@ember/object';

export default function scheduleUpdateOptions(selectBox) {
  schedule('afterRender', updateOptions, selectBox);
}

function updateOptions(selectBox) {
  set(selectBox, 'options', emberA(selectBox._options.toArray()));
}
