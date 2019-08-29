import { computed, get } from '@ember/object';
const { from } = Array;
const { freeze } = Object;

export function apiValue() {
  return computed('resolvedValue', function() {
    let value = this.resolvedValue;

    if (this.resolvedValue === undefined && this.value !== undefined) {
      value = this.value;
    }

    if (get(this, 'isMultiple')) {
      return freeze(from(value).slice());
    }

    return value;
  })
}
