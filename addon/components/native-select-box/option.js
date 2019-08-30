import Component from '@ember/component';
import {
  _initComponent,
  _destroyComponent
} from '../../utils/component/lifecycle';
import index from '../../utils/general/index';
import isSelected from '../../utils/shared/is-selected';
import layout from '../../templates/components/native-select-box/option';
import {
  registerElement,
  deregisterElement
} from '../../utils/registration/element';
import { receiveValue } from '../../utils/component/value';
import api from '../../utils/native-select-box/option/api';

export default Component.extend({
  layout,
  tagName: '',

  // Arguments

  classNamePrefix: '',
  selectBox: null,
  value: undefined,

  // State

  resolvedValue: null,
  previousResolvedValue: null,
  isPending: true,
  isRejected: false,
  isFulfilled: false,
  isSettled: false,
  domElement: null,
  domElementId: null,

  // Computed state

  api: api(),
  index: index('selectBox.options'),
  isSelected: isSelected(),

  init() {
    this._super(...arguments);
    _initComponent(this);
  },

  didReceiveAttrs() {
    this._super(...arguments);
    receiveValue(this);
  },

  actions: {
    // Internal actions

    didInsertElement(element) {
      registerElement(this, element);
    },

    willDestroyElement(element) {
      deregisterElement(this, element);
      _destroyComponent(this);
    }

    // Public API Actions
  }
});
