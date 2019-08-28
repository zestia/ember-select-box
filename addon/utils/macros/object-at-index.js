import { get, computed } from '@ember/object';

export default function objectAtIndex(arrayKey, indexKey) {
  return computed(...arguments, function() {
    return this[arrayKey].objectAt(get(this, indexKey));
  })
}
