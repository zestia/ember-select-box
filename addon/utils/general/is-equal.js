import { computed, get } from '@ember/object';

export default function isEqual(a, b) {
  return computed(a, b, function() {
    return get(this, a) === get(this, b);
  });
}
