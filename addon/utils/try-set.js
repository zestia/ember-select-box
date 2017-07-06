import get from 'ember-metal/get';
import set from 'ember-metal/set';

/**
 * Attempts to set a value on an object.
 * Silently fails if the object has been destroyed.
 * Waiting for this issue to be resolved:
 * https://github.com/emberjs/ember.js/issues/12356
 */
export default function trySet(object, key, value) {
  if (!get(object, 'isDestroyed')) {
    set(object, key, value);
  }
}
