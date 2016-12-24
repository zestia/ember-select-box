import Mixin from 'ember-metal/mixin';
import Nameable from  './general/nameable';
import HasOptions from './registration/has-options';
import Focusable from  './select-box/focusable';
import { trySet } from 'ember-metal/set';
import { wrap as makeArray } from 'ember-array/utils';
import { scheduleOnce } from 'ember-runloop';
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
    this._update(value).then(() => {
      this._selected();
    });
  },

  _selected() {
    this.sendAction('on-select', this.get('selectedValue'), this.get('api'));
  },

  _update(value) {
    return new RSVP.Promise(resolve => {
      const id = this.incrementProperty('promiseID');

      value = this._normaliseValue(value);
      value = this._resolveValue(value);

      value.then(resolvedValue => {
        const superseded = id < this.get('promiseID');
        if (superseded) {
          return;
        }

        trySet(this, 'selectedValue', resolvedValue);
        scheduleOnce('afterRender', this, '_updated', resolve);

        this.rerender();
      }, () => {
        // Treat as if no value
      });
    });
  },

  _updated(resolve) {
    this.sendAction('on-update', this.get('selectedValue'), this.get('api'));
    resolve();
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
      this._update(value);
    },

    select(value) {
      this._select(value);
    }
  }
});
