import Mixin from '@ember/object/mixin';
import Nameable from  '../general/nameable';
import HasOptions from './registration/has-options';
import Focusable from  './focusable';
import { computed } from '@ember/object';
import { A as emberA, makeArray } from '@ember/array';
import { bind, next, scheduleOnce } from '@ember/runloop';
import invokeAction from '../../utils/invoke-action';
import { all, resolve } from 'rsvp';
const { freeze } = Object;
const { isArray, from } = Array;

const mixins = [
  Nameable,
  HasOptions,
  Focusable
];

export default Mixin.create(...mixins, {
  api: null,
  promiseID: 0,

  pristineValue: computed('selectedValue', function() {
    let value = this.get('selectedValue');
    if (this.get('isMultiple')) {
      value = freeze(value);
    }
    return value;
  }).readOnly(),

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
    value = this._buildSelectedValue(value, this.get('pristineValue'));

    this._update(value).then(() => {
      this._selected();
    });
  },

  _update(value) {
    value = this._normaliseValue(value);
    value = this._resolveValue(value);

    const id = this.incrementProperty('promiseID');

    const success = bind(this, '_resolvedValue', id, false);
    const failure = bind(this, '_resolvedValue', id, true);

    return value.then(success, failure);
  },

  _buildSelectedValue(value1, value2) {
    let build = this.get('on-build-selection');

    if (typeof build !== 'function') {
      build = bind(this, '_buildSelectedValueDefault');
    }

    return build(value1, value2);
  },

  _buildSelectedValueDefault(value1, value2) {
    let value = value1;

    if (this.get('isMultiple') && !isArray(value1)) {
      const temp = emberA(from(value2));
      if (temp.includes(value1)) {
        temp.removeObject(value1);
      } else {
        temp.addObject(value1);
      }
      value = temp.toArray();
    }

    return value;
  },

  _inited() {
    invokeAction(this, 'on-init', this.get('api'));
  },

  _updated() {
    invokeAction(this, 'on-update', this.get('pristineValue'), this.get('api'));
  },

  _selected() {
    invokeAction(this, 'on-select', this.get('pristineValue'), this.get('api'));
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
    if (id < this.get('promiseID') || this.get('isDestroyed')) {
      return;
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

    select(value) {
      this._select(value);
    }
  }
});
