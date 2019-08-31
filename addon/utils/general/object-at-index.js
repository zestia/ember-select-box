import { computed, get } from '@ember/object';

export default function objectAtIndex(arrayKey, indexKey) {
  return computed(arrayKey, indexKey, function() {
    return this[arrayKey].objectAt(get(this, indexKey));
  });
}
