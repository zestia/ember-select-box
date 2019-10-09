import Component from '@ember/component';
import { bool } from '@ember/object/computed';
import {
  deregisterElement,
  registerElement
} from '../utils/registration/element';
import {
  deregisterOption,
  initOptions,
  registerOption
} from '../utils/registration/option';
import { destroyComponent, initComponent } from '../utils/component/lifecycle';
import {
  destroyElement,
  insertElement
} from '../utils/native-select-box/element';
import { receiveValue, selectValue, updateValue } from '../utils/shared/value';
import { selectValue as _selectValue } from '../utils/native-select-box/value';
import api from '../utils/native-select-box/api';
import layout from '../templates/components/native-select-box';
import { className } from '../utils/shared/attributes';

export default Component.extend({
  layout,
  tagName: '',

  // Arguments

  classNamePrefix: '',
  disabled: false,
  multiple: false,
  value: undefined,

  // Actions

  onInsertElement: null,
  onSelect: null,
  onUpdate: null,

  // State

  domElement: null,
  id: null,
  isFulfilled: false,
  isPending: true,
  isRejected: false,
  isSettled: false,
  memoisedAPI: null,
  previousResolvedValue: null,
  resolvedValue: null,
  valueID: 0,

  // Computed state

  api: api(),
  className: className(),
  isMultiple: bool('multiple'),

  init() {
    this._super(...arguments);
    initOptions(this);
    initComponent(this);
  },

  didReceiveAttrs() {
    this._super(...arguments);
    receiveValue(this);
  },

  actions: {
    // Internal actions

    handleInsertElement(element) {
      registerElement(this, element);
      insertElement(this);
    },

    handleDestroyElement(element) {
      deregisterElement(this, element);
      destroyElement(this);
      destroyComponent(this);
    },

    handleInitOption(option) {
      registerOption(this, option);
    },

    handleDestroyOption(option) {
      deregisterOption(this, option);
    },

    handleChange() {
      _selectValue(this);
    },

    // Public API Actions

    select(value) {
      return selectValue(this, value);
    },

    update(value) {
      return updateValue(this, value);
    }
  }
});
