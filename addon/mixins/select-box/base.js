import Mixin from '@ember/object/mixin';
import { makeArray } from '@ember/array';
import { bind, scheduleOnce } from '@ember/runloop';
import { all, resolve } from 'rsvp';
import invokeAction from '../../utils/invoke-action';
import { readOnly } from '@ember/object/computed';
const { freeze } = Object;

export default Mixin.create({
  isMultiple: readOnly('multiple'),

  init() {
    this._super(...arguments);
    invokeAction(this, 'on-init', this.api);
  },

  didReceiveAttrs() {
    this._super(...arguments);
    this._update(this.value);
  },

  _select(value) {
    this._update(value).then(() => {
      invokeAction(this, 'on-select', this.internalValue, this.api);
    });
  },

  _update(value) {
    if (value === this.internalValue && this.valueID > 0) {
      return resolve(value);
    }

    const id = this.incrementProperty('valueID');

    this.set('internalValue', value);

    return this._resolveValue(value)
      .then(bind(this, '_resolvedValue', id, false))
      .catch(bind(this, '_resolvedValue', id, true));
  },

  _updated() {
    invokeAction(this, 'on-update', this.internalValue, this.api);
  },

  _resolveValue(value) {
    this.set('isPending', true);
    this.set('isRejected', false);
    this.set('isFulfilled', false);
    this.set('isSettled', false);

    return resolve(value).then(value => {
      if (this.isMultiple) {
        return all(makeArray(value));
      }

      return value;
    });
  },

  _resolvedValue(id, failed, value) {
    if (id < this.valueID || this.isDestroyed) {
      return;
    }

    if (this.isMultiple) {
      value = freeze(value);
    }

    if (failed) {
      this.set('isRejected', true);
    } else {
      this.set('isFulfilled', true);
    }

    this.set('isPending', false);
    this.set('isSettled', true);
    this.set('internalValue', value);

    scheduleOnce('afterRender', this, '_rendered');
  },

  _rendered() {
    if (this.isDestroying) {
      return;
    }

    this.send('_updated');
  },

  actions: {
    update(value) {
      this._update(value);
    },

    select(value) {
      this._select(value);
    },

    _updated() {
      this._updated();
    },

    _select(value) {
      this._select(value);
    }
  }
});
