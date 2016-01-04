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

  didReceiveAttrs() {
    this._super(...arguments);
    this.set('isMultiple', this.getAttr('multiple'));
    this.send('update', this.getAttr('value'));
  },

  _select() {
    this.sendAction('on-select', this.get('selectedValue'), this.get('api'));
  },

  _update() {
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
      scheduleOnce('afterRender', this, '_update');
    },

    select(value) {
      this.send('update', value);
      this._select();
    }
  }
});
