import { computed } from '@ember/object';
import { guidFor } from '@ember/object/internals';

export default function id() {
  return computed(function() {
    return guidFor(this).replace('ember', 'select-box-el-');
  });
}
