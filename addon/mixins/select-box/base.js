import Mixin from '@ember/object/mixin';
import Nameable from  '../general/nameable';
import HasOptions from './registration/has-options';
import Focusable from  './focusable';
import trySet from '../../utils/try-set';
import { A as emberA, makeArray } from '@ember/array';
import { bind, next, scheduleOnce } from '@ember/runloop';
import invokeAction from '../../utils/invoke-action';
import { all, resolve } from 'rsvp';
const { isArray } = Array;

const mixins = [
  Nameable,
  HasOptions,
  Focusable
];

export default Mixin.create(...mixins, {
  api: null,
  promiseID: 0,

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
    if (this.get('isMultiple') && !isArray(value)) {
      const values = emberA(this.get('selectedValue').slice());
      if (values.includes(value)) {
        values.removeObject(value);
      } else {
        values.addObject(value);
      }
      value = values;
    }

    this._update(value).then(() => {
      this._selected();
    });
  },

  _update(value) {
    value = this._normaliseValue(value);
    value = this._resolveValue(value);

    const id = this.get('promiseID') + 1;

    trySet(this, 'promiseID', id);

    const success = bind(this, '_resolvedValue', id, false);
    const failure = bind(this, '_resolvedValue', id, true);

    return value.then(success, failure);
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

  _normaliseValue(value) {
    if (this.get('isMultiple')) {
      value = makeArray(value);
    }
    return value;
  },

  _resolveValue(value) {
    if (this.get('isMultiple')) {
      return all(value);
    }
    return resolve(value);
  },

  _resolvedValue(id, failed, value) {
    const superseded = id < this.get('promiseID');

    if (superseded || this.get('isDestroyed')) {
      return;
    }

    this.set('selectedValue', value);

    scheduleOnce('afterRender', this, '_rendered');
  },

  _rendered() {
    next(this, '_updated');
  },

  actions: {
    update(value) {
      this._update(value);
    },

    select(value) {
      this._select(value);
    }
  }
});
