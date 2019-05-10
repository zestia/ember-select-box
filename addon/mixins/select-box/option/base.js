import Mixin from '@ember/object/mixin';
import { resolve } from 'rsvp';
import { set } from '@ember/object';
import { bind } from '@ember/runloop';

export default Mixin.create({
  didReceiveAttrs() {
    this._super(...arguments);
    this._update(this.value);
  },

  _update(value) {
    if (value === this.internalValue) {
      return;
    }

    const id = this.incrementProperty('valueID');

    set(this, 'internalValue', value);

    this._resolveValue(value)
      .then(bind(this, '_resolvedValue', id, false))
      .catch(bind(this, '_resolvedValue', id, true));
  },

  _resolveValue(value) {
    set(this, 'isPending', true);
    set(this, 'isRejected', false);
    set(this, 'isFulfilled', false);
    set(this, 'isSettled', false);

    return resolve(value);
  },

  _resolvedValue(id, failed, value) {
    if (this.isDestroyed || id < this.valueID) {
      return;
    }

    if (failed) {
      set(this, 'isRejected', true);
    } else {
      set(this, 'isFulfilled', true);
    }

    set(this, 'isPending', false);
    set(this, 'isSettled', true);
    set(this, 'internalValue', value);
  }
});
