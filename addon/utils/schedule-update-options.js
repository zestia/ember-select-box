import { schedule } from '@ember/runloop';
import { A as emberA } from '@ember/array';
import { set } from '@ember/object';

export default function scheduleUpdateOptions(component) {
  schedule('afterRender', updateOptions, component);
}

function updateOptions(component) {
  set(component, 'options', emberA(component._options.toArray()));
}
