import Component from '@glimmer/component';
import NativeSelectBoxOption from './option/index';
import {
  deregisterElement,
  registerElement
} from '../../utils/registration/element';
import {
  deregisterOption,
  registerOption
} from '../../utils/registration/option';
import {
  receiveValue,
  selectValue,
  updateValue
} from '../../utils/shared/value';
import { selectValue as _selectValue } from '../../utils/native-select-box/value';
import buildAPI from '../../utils/shared/api';
import { ready } from '../../utils/shared/ready';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class NativeSelectBox extends Component {
  // Misc state
  element = null;
  pendingOption = [];
  previousValue = null;
  sealedAPI = {};
  valueId = 0;

  // Tracked state
  @tracked isFulfilled = false;
  @tracked isPending = true;
  @tracked isRejected = false;
  @tracked isSettled = false;
  @tracked option = [];
  @tracked value = null;

  // Component classes
  NativeSelectBoxOption = NativeSelectBoxOption;

  // Registered component declarations
  Option = null;

  get api() {
    return buildAPI(this, [
      // Components
      'Option',
      // Properties
      'element',
      'isFulfilled',
      'isMultiple',
      'isPending',
      'isRejected',
      'isSettled',
      'value',
      // Actions
      'select',
      'update'
    ]);
  }

  get isMultiple() {
    return this.args.multiple;
  }

  constructor() {
    super(...arguments);
    receiveValue(this);
  }

  @action
  handleInsertElement(element) {
    registerElement(this, element);
    ready(this);
  }

  @action
  handleDestroyElement() {
    deregisterElement(this);
  }

  @action
  handleUpdateValue() {
    receiveValue(this);
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

  @action
  select(value) {
    return selectValue(this, value);
  }

  @action
  update(value) {
    return updateValue(this, value);
  }
}
