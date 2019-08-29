import { computed, get } from '@ember/object';
import { makeArray } from '@ember/array';
const { freeze } = Object;

export function apiValue() {
  return computed('resolvedValue', 'isPending', function() {
    let value = this.resolvedValue;

    if (this.isPending) {
      value = this.value;
    }

    if (get(this, 'isMultiple')) {
      return freeze(makeArray(value).slice());
    }

    return value;
  })
}
