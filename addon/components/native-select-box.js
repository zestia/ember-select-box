import Component from '@ember/component';
import layout from '../templates/components/native-select-box';
import { readOnly } from '@ember/object/computed';
import registerElement from '../utils/register-element';
import deregisterElement from '../utils/deregister-element';
import initOptions from '../utils/init-options';
import registerOption from '../utils/register-option';
import deregisterOption from '../utils/deregister-option';
import getSelectedValue from '../utils/get-selected-value';
import update from '../utils/update';
import select from '../utils/select';

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
    update(this, this.value);
  },

  actions: {
    insertedElement(element) {
      registerElement(this, element);
    },

    willDestroyElement(element) {
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
      await update(this, value);
      select(this);
    }
  }
});
