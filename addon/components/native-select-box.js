import Component from '@ember/component';
import layout from '../templates/components/native-select-box';
import { readOnly } from '@ember/object/computed';
import { updateValue } from '../utils/shared/value';
import { selectValue } from '../utils/native-select-box/value';
import { apiValue } from '../utils/shared/api-value';
import api from '../utils/native-select-box/api';
import {
  initOptions,
  registerOption,
  deregisterOption
} from '../utils/registration/options';
import {
  registerElement,
  deregisterElement
} from '../utils/registration/element';

export default Component.extend({
  layout,
  tagName: '',

  // Arguments

  classNamePrefix: '',
  disabled: false,
  multiple: false,
  value: undefined,

  // Actions

  onSelect: null,
  onUpdate: null,

  // State

  isPending: true,
  isRejected: false,
  isFulfilled: false,
  isSettled: false,
  isSelectBox: true,
  domElement: null,
  domElementId: null,

  // Computed state

  api: api(),
  apiValue: apiValue(),
  isMultiple: readOnly('multiple'),

  init() {
    this._super(...arguments);
    initOptions(this, 'options');
  },

  didReceiveAttrs() {
    this._super(...arguments);
    updateValue(this, this.value);
  },

  actions: {
    // Internal actions

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

    onChange() {
      selectValue(this);
    }
  }
});
