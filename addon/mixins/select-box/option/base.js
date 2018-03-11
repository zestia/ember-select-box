import Mixin from '@ember/object/mixin';
import { resolve } from 'rsvp';
import { bind } from '@ember/runloop';

export default Mixin.create({
  didReceiveAttrs() {
    this._super(...arguments);
    this._update(this.get('value'));
  },

  _update(value) {
    if (value === this.get('internalValue')) {
      return;
    }

    const id = this.incrementProperty('valueID');

    this.set('internalValue', value);

    this._resolveValue(value)
      .then(bind(this, '_resolvedValue', id, false))
      .catch(bind(this, '_resolvedValue', id, true));
  },

  _resolveValue(value) {
    this.set('isPending', true);
    this.set('isRejected', false);
    this.set('isFulfilled', false);
    this.set('isSettled', false);

    return resolve(value);
  },

  _resolvedValue(id, failed, value) {
    if (id < this.get('valueID') || this.get('isDestroyed')) {
      return;
    }

    if (failed) {
      this.set('isRejected', true);
    } else {
      this.set('isFulfilled', true);
    }

    this.set('isPending', false);
    this.set('isSettled', true);
    this.set('internalValue', value);
  }
});
