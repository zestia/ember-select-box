import Component from '@ember/component';
import layout from '../../templates/components/select-box/selected-option';
import { receiveValue } from '../../utils/component/value';
import {
  _destroyComponent,
  _initComponent
} from '../../utils/component/lifecycle';
import api from '../../utils/select-box/selected-option/api';
import index from '../../utils/general/index';
import isEqual from '../../utils/general/is-equal';
import {
  deregisterElement,
  registerElement
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
  id: null,
  valueID: 0,
  memoisedAPI: null,

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
