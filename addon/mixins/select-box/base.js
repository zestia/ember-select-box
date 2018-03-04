import Mixin from '@ember/object/mixin';
import Nameable from  '../general/nameable';
import HasOptions from './registration/has-options';
import Focusable from  './focusable';
import { makeArray } from '@ember/array';
import { bind, next, scheduleOnce } from '@ember/runloop';
import { all, resolve } from 'rsvp';
const { freeze } = Object;

const mixins = [
  Nameable,
  HasOptions,
  Focusable
];

export default Mixin.create(...mixins, {
  api: null,
  valueID: 0,

  init() {
    this._super(...arguments);
    this.getWithDefault('on-init', () => {})(this.get('api'));
  },

  didReceiveAttrs() {
    this._super(...arguments);
    this.set('isMultiple', this.get('multiple'));
    this.set('changedValue', this.get('value') !== this.get('internalValue'));

    if (this.get('changedValue') || !this.get('doneInitialUpdate')) {
      this._update(this.get('value'));
      this.set('doneInitialUpdate', true);
    }
  },

  _select(value) {
    this._update(value).then(() => {
      this.getWithDefault('on-select', () => {})(this.get('internalValue'), this.get('api'));
    });
  },

  _update(value) {
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
    next(this, () => {
      this.send('_updated');
    });
  },

  actions: {
    update(value) {
      this._update(value);
    },

    select(value) {
      this._select(value);
    },

    _updated() {
      this.getWithDefault('on-update', () => {})(this.get('internalValue'), this.get('api'));
    },

    _select(value) {
      this._select(value);
    }
  }
});
