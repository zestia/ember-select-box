import Component from '@ember/component';
import layout from '../templates/components/native-select-box';
import { set, get } from '@ember/object';
import { scheduleOnce } from '@ember/runloop';
import { A as emberA } from '@ember/array';
import invokeAction from '../utils/invoke-action';
import { readOnly } from '@ember/object/computed';
import updateSelectBoxValue from '../utils/update-select-box-value';
import registerElement from '../utils/register-element';
import deregisterElement from '../utils/deregister-element';
const { from } = Array;

export default Component.extend({
  layout,
  tagName: '',

  isMultiple: readOnly('multiple'),

  init() {
    this._super(...arguments);
    set(this, 'api', this._buildApi());
    set(this, '_options', emberA());
    set(this, 'options', emberA());
  },

  didReceiveAttrs() {
    this._super(...arguments);
    this._update(this.value);
  },

  actions: {
    insert() {
      registerElement(...arguments);
    },

    destroy() {
      deregisterElement(...arguments);
    },

    _onChange() {
      const registeredSelected = this._getRegisteredSelectedValues();
      const unregisteredSelected = this._getUnregisteredSelectedValues();

      let selectedValues;

      if (registeredSelected.length > 0) {
        selectedValues = registeredSelected;
      } else {
        selectedValues = unregisteredSelected;
      }

      if (get(this, 'isMultiple')) {
        this.send('select', selectedValues);
      } else {
        this.send('select', selectedValues[0]);
      }
    },

    _registerOption(option) {
      this._options.addObject(option);
      this._scheduleUpdateOptions();
    },

    _deregisterOption(option) {
      this._options.removeObject(option);
      this._scheduleUpdateOptions();
    },

    update(value) {
      this._update(value);
    },

    select(value) {
      this._select(value);
    },

    _select(value) {
      this._select(value);
    }
  },

  _getRegisteredSelectedValues() {
    return this.options
      .filter(option => option.domElement.selected)
      .map(option => option.internalValue);
  },

  _getUnregisteredSelectedValues() {
    return from(this.domElement.querySelectorAll('option:checked')).map(
      option => option.value
    );
  },

  _scheduleUpdateOptions() {
    scheduleOnce('afterRender', this, '_updateOptions');
  },

  _updateOptions() {
    set(this, 'options', emberA(this._options.toArray()));
  },

  async _select(value) {
    await updateSelectBoxValue(this, value);
    invokeAction(this, 'onSelect', this.internalValue, this.api);
  },

  async _update(value) {
    await updateSelectBoxValue(this, value);
    scheduleOnce('afterRender', this, '_rendered');
  },

  _rendered() {
    if (this.isDestroyed || this.isDestroying) {
      return;
    }

    invokeAction(this, 'onUpdate', this.internalValue, this.api);
  },
});
