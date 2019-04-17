import { computed, get } from '@ember/object';

export default function boolString(key) {
  return computed(key, function() {
    return get(this, key) ? 'true' : 'false';
  });
}
