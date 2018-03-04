import Mixin from '@ember/object/mixin';
import Nameable from  '../../general/nameable';
import Registerable from  '../../general/registerable';
import { resolve } from 'rsvp';
import { bind } from '@ember/runloop';

const mixins = [
  Nameable,
  Registerable
];

export default Mixin.create(...mixins, {
  valueID: 0,

  didReceiveAttrs() {
    this._super(...arguments);
    this._update(this.get('value'));
  },

  _update(value) {
    const val = this._resolveValue(value);
    const id = this.incrementProperty('valueID');

    const success = bind(this, '_resolvedValue', id, false);
    const failure = bind(this, '_resolvedValue', id, true);

    this.set('internalValue', value);

    val.then(success, failure);
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
