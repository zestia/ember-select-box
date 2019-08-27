import { computed, get } from '@ember/object';

export default function isActive() {
  return computed('index', '_parentActiveIndex', function() {
    return get(this, 'index') === this._parentActiveIndex;
  });
}
