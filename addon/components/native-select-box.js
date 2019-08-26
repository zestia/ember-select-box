import Component from '@ember/component';
import layout from '../templates/components/native-select-box';
import { scheduleOnce } from '@ember/runloop';
import invokeAction from '../utils/invoke-action';
import { readOnly } from '@ember/object/computed';
import updateSelectBoxValue from '../utils/update-select-box-value';
import registerElement from '../utils/register-element';
import deregisterElement from '../utils/deregister-element';
import initOptions from '../utils/init-options';
import registerOption from '../utils/register-option';
import deregisterOption from '../utils/deregister-option';
import getSelectedValue from '../utils/get-selected-value';

export default Component.extend({
  layout,
  tagName: '',

  isMultiple: readOnly('multiple'),

  init() {
    this._super(...arguments);
    // set(this, 'api', this._buildApi());
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

    async change() {
      const value = getSelectedValue(this);
      await updateSelectBoxValue(this, value);
      invokeAction(this, 'onSelect', this.internalValue, this.api);
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
