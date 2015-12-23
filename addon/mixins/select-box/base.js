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

  didInitAttrs() {
    this._super(...arguments);
    scheduleOnce('afterRender', this, '_runReadyAction');
  },

  didReceiveAttrs() {
    this._super(...arguments);
    this.set('isMultiple', this.getAttr('multiple'));
    this.send('update', this.getAttr('value'));
  },

  _runSelectAction() {
    this.sendAction('on-select', this.get('selectedValue'), this.get('api'));
  },

  _runAfterSelectAction() {
    this.sendAction(
      'on-after-select', this.get('selectedValue'), this.get('api')
    );
  },

  _runReadyAction() {
    this.sendAction('on-ready', this.get('api'));
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
    },

    select(value) {
      this.send('update', value);
      this._runSelectAction();
      scheduleOnce('afterRender', this, '_runAfterSelectAction');
    }
  }
});
