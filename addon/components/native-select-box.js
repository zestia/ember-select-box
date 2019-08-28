import Component from '@ember/component';
import layout from '../templates/components/native-select-box';
import { readOnly } from '@ember/object/computed';
import getSelectedValue from '../utils/selection/get';
import update from '../utils/value/update';
import selectAction from '../utils/actions/select';
import api from '../utils/native-select-box/api';
import { initOptions, registerOption, deregisterOption } from '../utils/registration/options';
import { registerElement, deregisterElement } from '../utils/registration/element';

export default Component.extend({
  layout,
  tagName: '',

  isMultiple: readOnly('multiple'),

  init() {
    this._super(...arguments);
    initOptions(this, 'options');
  },

  didReceiveAttrs() {
    this._super(...arguments);
    update(this, this.value);
  },

  actions: {
    didInsertElement(element) {
      registerElement(this, element);
    },

    willDestroyElement(element) {
      deregisterElement(this, element);
    },

    onInitOption(option) {
      registerOption(this, 'options', option);
    },

    onDestroyOption(option) {
      deregisterOption(this, 'options', option);
    },

    async onChange() {
      const value = getSelectedValue(this);
      await update(this, value);
      selectAction(this);
    }
  },

  api() {
    return api(this);
  }
});
