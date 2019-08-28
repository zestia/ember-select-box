import { computed, getWithDefault } from '@ember/object';

export default function index(key) {
  return computed(...arguments, function() {
    return getWithDefault(this, key, []).indexOf(this);
  });
}
