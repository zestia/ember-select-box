import { computed } from '@ember/object';

export default function boolString(key) {
  return computed(key, function() {
    return this[key] ? 'true' : 'false';
  });
}
