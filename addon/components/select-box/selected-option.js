import Component from '@ember/component';
import {
  _destroyComponent,
  _initComponent
} from '../../utils/component/lifecycle';
import {
  deregisterElement,
  registerElement
} from '../../utils/registration/element';
import { receiveValue } from '../../utils/component/value';
import api from '../../utils/select-box/selected-option/api';
import index from '../../utils/general/index';
import isEqual from '../../utils/general/is-equal';
import layout from '../../templates/components/select-box/selected-option';
import { id, className } from '../../utils/shared/attributes';
import { action } from '@ember/object';

export default class SelectBoxSelectedOption extends Component {
  layout = layout;
  tagName = '';

  // Arguments

  classNamePrefix = '';
  selectBox = null;
  value = undefined;

  // State

  domElement = null;
  isFulfilled = false;
  isPending = true;
  isRejected = false;
  isSettled = false;
  memoisedAPI = null;
  valueID = 0;

  // Computed state

  @api api;
  @className className;
  @id id;
  @index('selectBox.selectedOptions') index;
  @isEqual('index', 'selectBox.activeSelectedOptionIndex') isActive;

  init() {
    super.init(...arguments);
    _initComponent(this);
  }

  didReceiveAttrs() {
    super.init(...arguments);
    receiveValue(this);
  }

  // Internal actions

  @action
  handleInsertElement(element) {
    registerElement(this, element);
  }

  @action
  handleDestroyElement(element) {
    deregisterElement(this, element);
    _destroyComponent(this);
  }
}
