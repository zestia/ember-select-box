import Component from '@ember/component';
import layout from '../templates/components/native-select-box';
import { set, get } from '@ember/object';
import { scheduleOnce } from '@ember/runloop';
import invokeAction from '../utils/invoke-action';
import { readOnly } from '@ember/object/computed';
import updateSelectBoxValue from '../utils/update-select-box-value';
import registerElement from '../utils/register-element';
import deregisterElement from '../utils/deregister-element';
import initOptions from '../utils/init-options';
import registerOption from '../utils/register-option';
import deregisterOption from '../utils/deregister-option';
const { from } = Array;

export default Component.extend({
  layout,
  tagName: '',

  isMultiple: readOnly('multiple'),

  init() {
    this._super(...arguments);
    set(this, 'api', this._buildApi());
    initOptions(this);
  },

  didReceiveAttrs() {
    this._super(...arguments);
    this._update(this.value);
  },

  actions: {
    insertElement(element) {
      registerElement(this, element);
    },

    destroyElement(element) {
      deregisterElement(this, element);
    },

    initOption(option) {
      registerOption(this, option);
    },

    destroyOption(option) {
      deregisterOption(this, option);
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
