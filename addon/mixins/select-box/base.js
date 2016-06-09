import Mixin from 'ember-metal/mixin';
import Nameable from  './general/nameable';
import HasOptions from './registration/has-options';
import Focusable from  './select-box/focusable';
import { wrap as makeArray } from 'ember-array/utils';
import { scheduleOnce } from 'ember-runloop';

export default Mixin.create(
  Nameable,
  HasOptions,
  Focusable, {

  init() {
    this._super(...arguments);
    this.send('update', this.getAttr('value'));
  },

  didUpdateAttrs() {
    this._super(...arguments);
    if (this.getAttr('value') !== this.get('selectedValue')) {
      this.send('update', this.getAttr('value'));
    }
  },

  didReceiveAttrs() {
    this._super(...arguments);
    this.set('isMultiple', this.getAttr('multiple'));
  },

  _selected() {
    this.sendAction('on-select', this.get('selectedValue'), this.get('api'));
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

  actions: {
    update(value) {
      value = this._normaliseValue(value);
      this.set('selectedValue', value);
      scheduleOnce('afterRender', this, '_updated');
    },

    select(value) {
      this.send('update', value);
      this._selected();
    }
  }
});
