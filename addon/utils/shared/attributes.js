import { computed } from '@ember/object';
import { guidFor } from '@ember/object/internals';

export function className() {
  return computed('classNamePrefix', function() {
    return this.classNamePrefix || 'select-box';
  });
}

export function id() {
  return computed(function() {
    return guidFor(this).replace('ember', 'select-box-el-');
  });
}
