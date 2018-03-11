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
    invokeAction(this, 'on-init', this.get('api'));
  },

  didReceiveAttrs() {
    this._super(...arguments);
    this._update(this.get('value'));
  },

  _select(value) {
    this._update(value).then(() => {
      invokeAction(this, 'on-select', this.get('internalValue'), this.get('api'));
    });
  },

  _update(value) {
    if (value === this.get('internalValue') && this.get('valueID') > 0) {
      return resolve(value);
    }

    const id = this.incrementProperty('valueID');

    this.set('internalValue', value);

    return this._resolveValue(value)
      .then(bind(this, '_resolvedValue', id, false))
      .catch(bind(this, '_resolvedValue', id, true));
  },

  _resolveValue(value) {
    this.set('isPending', true);
    this.set('isRejected', false);
    this.set('isFulfilled', false);
    this.set('isSettled', false);

    return resolve(value).then(value => {
      if (this.get('isMultiple')) {
        return all(makeArray(value));
      }
      return value;
    });
  },

  _resolvedValue(id, failed, value) {
    if (id < this.get('valueID') || this.get('isDestroyed')) {
      return;
    }

    if (this.get('isMultiple')) {
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
      invokeAction(this, 'on-update', this.get('internalValue'), this.get('api'));
    },

    _select(value) {
      this._select(value);
    }
  }
});
