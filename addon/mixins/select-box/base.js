import Mixin from 'ember-metal/mixin';
import Nameable from  './general/nameable';
import HasOptions from './registration/has-options';
import Focusable from  './select-box/focusable';
import { trySet } from 'ember-metal/set';
import { wrap as makeArray } from 'ember-array/utils';
import run, { scheduleOnce } from 'ember-runloop';
import RSVP from 'rsvp';

export default Mixin.create(
  Nameable,
  HasOptions,
  Focusable, {

  api: null,

  didReceiveAttrs() {
    this._super(...arguments);
    this.set('isMultiple', this.getAttr('multiple'));

    if (
      this.getAttr('value') !== this.get('selectedValue') ||
      !this.get('doneInitialUpdate')
    ) {
      this._update(this.getAttr('value'));
      this.set('doneInitialUpdate', true);
    }
  },

  _select(value) {
    return this._update(value).then(() => {
      this._selected();
    });
  },

  _selected() {
    this.sendAction('on-select', this.get('selectedValue'), this.get('api'));
  },

  _update(value) {
    value = this._normaliseValue(value);
    value = this._resolveValue(value);
    return value.then(resolvedValue => {
      run(() => trySet(this, 'selectedValue', resolvedValue));
      scheduleOnce('afterRender', this, '_updated');
    });
  },

  _updated() {
    this.sendAction('on-update', this.get('selectedValue'), this.get('api'));
  },

  _normaliseValue(value) {
    if (this.get('isMultiple')) {
      value = makeArray(value);
    }
    return value;
  },

  _resolveValue(value) {
    if (this.get('isMultiple')) {
      return RSVP.all(value);
    }
    return RSVP.resolve(value);
  },

  actions: {
    update(value) {
      return this._update(value);
    },

    select(value) {
      return this._select(value);
    }
  }
});
