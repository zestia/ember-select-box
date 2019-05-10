import Mixin from '@ember/object/mixin';
import { makeArray } from '@ember/array';
import { bind, scheduleOnce } from '@ember/runloop';
import { all, resolve } from 'rsvp';
import invokeAction from '../../utils/invoke-action';
import { readOnly } from '@ember/object/computed';
import { set, get } from '@ember/object';
const { freeze } = Object;

export default Mixin.create({
  isMultiple: readOnly('multiple'),

  init() {
    this._super(...arguments);
    invokeAction(this, 'onInit', this.api);
  },

  didReceiveAttrs() {
    this._super(...arguments);
    this._update(this.value);
  },

  _select(value) {
    this._update(value).then(() => {
      invokeAction(this, 'onSelect', this.internalValue, this.api);
    });
  },

  _update(value) {
    if (value === this.internalValue && this.valueID > 0) {
      return resolve(value);
    }

    const id = this.incrementProperty('valueID');

    set(this, 'internalValue', value);

    return this._resolveValue(value)
      .then(bind(this, '_resolvedValue', id, false))
      .catch(bind(this, '_resolvedValue', id, true));
  },

  _updated() {
    invokeAction(this, 'onUpdate', this.internalValue, this.api);
  },

  _resolveValue(value) {
    set(this, 'isPending', true);
    set(this, 'isRejected', false);
    set(this, 'isFulfilled', false);
    set(this, 'isSettled', false);

    return resolve(value).then(value => {
      if (get(this, 'isMultiple')) {
        return all(makeArray(value));
      }

      return value;
    });
  },

  _resolvedValue(id, failed, value) {
    if (this.isDestroyed || id < this.valueID) {
      return;
    }

    if (get(this, 'isMultiple')) {
      value = freeze(value);
    }

    if (failed) {
      set(this, 'isRejected', true);
    } else {
      set(this, 'isFulfilled', true);
    }

    set(this, 'isPending', false);
    set(this, 'isSettled', true);
    set(this, 'internalValue', value);

    scheduleOnce('afterRender', this, '_rendered');
  },

  _rendered() {
    if (this.isDestroyed) {
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
