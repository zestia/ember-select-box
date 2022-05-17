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
import { registerComponents } from '../../utils/registration/components';
import {
  receiveValue,
  selectValue,
  updateValue
} from '../../utils/shared/value';
import { selectValue as _selectValue } from '../../utils/native-select-box/value';
import buildAPI from '../../utils/shared/api';
import { ready } from '../../utils/shared/ready';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class NativeSelectBox extends Component {
  element = null;
  previousValue = null;
  stableAPI = {};
  valueId = 0;

  @tracked isFulfilled = false;
  @tracked isPending = true;
  @tracked isReady = false;
  @tracked isRejected = false;
  @tracked isSettled = false;
  @tracked value = null;

  // Component classes
  NativeSelectBoxOption = NativeSelectBoxOption;

  // Component declarations
  Option = null;

  // Component instances
  @tracked option = [];
  pendingOption = [];

  registerComponents = registerComponents(this);

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
    ready(this);
  }

  @action
  handleInsertElement(element) {
    registerElement(this, element);
  }

  @action
  handleUpdatedValue() {
    receiveValue(this);
  }

  @action
  handleDestroyElement() {
    deregisterElement(this);
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
