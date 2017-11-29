import Mixin from '@ember/object/mixin';
import Nameable from  './general/nameable';
import HasOptions from './registration/has-options';
import Focusable from  './select-box/focusable';
import trySet from '../../utils/try-set';
import { makeArray } from '@ember/array';
import { bind, scheduleOnce } from '@ember/runloop';
import invokeAction from '../../utils/invoke-action';
import RSVP from 'rsvp';
const { all, resolve } = RSVP;

export default Mixin.create(
  Nameable,
  HasOptions,
  Focusable, {

  api: null,
  promiseID: 0,

  init() {
    this._super(...arguments);
    this._init();
  },

  didReceiveAttrs() {
    this._super(...arguments);
    this.set('isMultiple', this.get('multiple'));

    if (
      this.get('value') !== this.get('selectedValue') ||
      !this.get('doneInitialUpdate')
    ) {
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
    value = this._normaliseValue(value);
    value = this._resolveValue(value);

    const id = this.get('promiseID') + 1;

    trySet(this, 'promiseID', id);

    const success = bind(this, '_resolvedValue', id, false);
    const failure = bind(this, '_resolvedValue', id, true);

    return value.then(success, failure);
  },

  _init() {
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

    scheduleOnce('afterRender', this, '_updated', resolve);

    this.rerender();

    resolve();
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
