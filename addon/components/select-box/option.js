import Component from '@ember/component';
import { _activateOption } from '../../utils/select-box/option/activate';
import {
  _destroyComponent,
  _initComponent
} from '../../utils/component/lifecycle';
import { _selectOption } from '../../utils/select-box/option/select';
import { bool } from '@ember/object/computed';
import {
  deregisterElement,
  registerElement
} from '../../utils/registration/element';
import { receiveValue } from '../../utils/component/value';
import api from '../../utils/select-box/option/api';
import index from '../../utils/general/index';
import isEqual from '../../utils/general/is-equal';
import isSelected from '../../utils/shared/is-selected';
import layout from '../../templates/components/select-box/option';

export default Component.extend({
  layout,
  tagName: '',

  // Arguments

  classNamePrefix: '',
  disabled: false,
  selectBox: null,
  selected: undefined,
  value: undefined,

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
  index: index('selectBox.options'),
  isActive: isEqual('index', 'selectBox.activeOptionIndex'),
  isDisabled: bool('disabled'),
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
    },

    onMouseEnter() {
      _activateOption(this);
    },

    onClick() {
      _selectOption(this);
    }
  }
});
