import { computed } from '@ember/object';

export default function objectAtIndex(arrayKey, indexKey) {
  return computed(arrayKey, indexKey, function() {
    return this[arrayKey][this[indexKey]];
  });
}
