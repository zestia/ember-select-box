import Component from '@ember/component';
import layout from '../../templates/components/select-box/selected-option';
import { receiveValue } from '../../utils/component/value';
import {
  _initComponent,
  _destroyComponent
} from '../../utils/component/lifecycle';
import api from '../../utils/select-box/selected-option/api';
import index from '../../utils/general/index';
import isEqual from '../../utils/general/is-equal';
import {
  registerElement,
  deregisterElement
} from '../../utils/registration/element';

export default Component.extend({
  layout,
  tagName: '',

  // Arguments

  classNamePrefix: '',
  selectBox: null,
  value: undefined,

  // State

  isPending: true,
  isRejected: false,
  isFulfilled: false,
  isSettled: false,
  domElement: null,
  domElementId: null,
  valueID: 0,

  // Computed state

  api: api(),
  index: index('selectBox.selectedOptions'),
  isActive: isEqual('index', 'selectBox.activeSelectedOptionIndex'),

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
  }
});
