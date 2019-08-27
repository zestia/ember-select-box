import Component from '@ember/component';
import layout from '../templates/components/native-select-box';
import { readOnly } from '@ember/object/computed';
import getSelectedValue from '../utils/selection/get';
import update from '../utils/value/update';
import selectAction from '../utils/actions/select';
import { initOptions, registerOption, deregisterOption } from '../utils/registration/options';
import { registerElement, deregisterElement } from '../utils/registration/element';

export default Component.extend({
  layout,
  tagName: '',

  isMultiple: readOnly('multiple'),

  init() {
    this._super(...arguments);
    // set(this, 'api', this._buildApi());
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

    initOption(option) {
      registerOption(this, 'options', option);
    },

    destroyOption(option) {
      deregisterOption(this, 'options', option);
    },

    async change() {
      const value = getSelectedValue(this);
      await update(this, value);
      selectAction(this);
    }
  }
});
