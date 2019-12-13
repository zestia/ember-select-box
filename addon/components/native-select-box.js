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
import { receiveValue, selectValue, updateValue } from '../utils/shared/value';
import { selectValue as _selectValue } from '../utils/native-select-box/value';
import api from '../utils/native-select-box/api';
import layout from '../templates/components/native-select-box';
import { className } from '../utils/shared/attributes';
import { ready } from '../utils/shared/ready';
import { insertElement } from '../utils/shared/element';
import { action } from '@ember/object';

export default class NativeSelectBox extends Component {
  layout = layout;
  tagName = '';

  // Arguments

  classNamePrefix = '';
  disabled = false;
  multiple = false;
  value = undefined;

  // Actions

  onInsertElement = null;
  onReady = null;
  onSelect = null;
  onUpdate = null;

  // State

  domElement = null;
  id = null;
  isFulfilled = false;
  isPending = true;
  isRejected = false;
  isSettled = false;
  memoisedAPI = null;
  previousResolvedValue = null;
  resolvedValue = null;
  valueID = 0;

  // Computed state

  @api() api;
  @className() className;
  @bool('multiple') isMultiple;

  init() {
    super.init(...arguments);
    initOptions(this);
    ready(this);
  }

  didReceiveAttrs() {
    super.init(...arguments);
    receiveValue(this);
  }

  // Internal actions

  @action
  handleInsertElement(element) {
    registerElement(this, element);
    insertElement(this);
  }

  @action
  handleDestroyElement(element) {
    deregisterElement(this, element);
  }

  @action
  handleInsertOption(option) {
    registerOption(this, option);
  }

  @action
  handleDestroyOption(option) {
    deregisterOption(this, option);
  }

  @action
  handleChange() {
    _selectValue(this);
  }

  // Public API Actions

  @action
  select(value) {
    return selectValue(this, value);
  }

  @action
  update(value) {
    return updateValue(this, value);
  }
}
