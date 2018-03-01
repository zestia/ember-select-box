import Mixin from '@ember/object/mixin';
import Nameable from  '../general/nameable';
import HasOptions from './registration/has-options';
import Focusable from  './focusable';
import { makeArray } from '@ember/array';
import { bind, next, scheduleOnce } from '@ember/runloop';
import invokeAction from '../../utils/invoke-action';
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
    this._inited();
  },

  didReceiveAttrs() {
    this._super(...arguments);
    this.set('isMultiple', this.get('multiple'));
    this.set('changedValue', this.get('value') !== this.get('selectedValue'));

    if (this.get('changedValue') || !this.get('doneInitialUpdate')) {
      this._update(this.get('value'));
      this.set('doneInitialUpdate', true);
    }
  },

  _select(value) {
    this._update(value).then(() => {
      this._selected();
    });
  },

  _update(value) {
    const val = this._resolveValue(value);
    const id = this.incrementProperty('valueID');

    const success = bind(this, '_resolvedValue', id, false);
    const failure = bind(this, '_resolvedValue', id, true);

    return val.then(success, failure);
  },

  _inited() {
    invokeAction(this, 'on-init', this.get('api'));
  },

  _updated() {
    invokeAction(this, 'on-update', this.get('selectedValue'), this.get('api'));
  },

  _selected() {
    invokeAction(this, 'on-select', this.get('selectedValue'), this.get('api'));
  },

  _resolveValue(value) {
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

    this.set('selectedValue', value);

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

    _updated() {
      this._updated();
    },

    _select(value) {
      this._select(value);
    },

    select(value) {
      this._select(value);
    }
  }
});
