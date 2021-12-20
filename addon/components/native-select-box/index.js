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
import { tracked } from '@glimmer/tracking';
import { lifecycleHooks } from '../../utils/component/lifecycle';

export default class NativeSelectBox extends Component {
  element = null;
  previousValue = null;
  sealedAPI = {};
  valueId = 0;

  @tracked isFulfilled = false;
  @tracked isPending = true;
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

  lifecycleHooks = lifecycleHooks(this);

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

  handleInsertElement = (element) => {
    registerElement(this, element);
    ready(this);
  };

  handleUpdatedValue = () => {
    receiveValue(this);
  };

  handleDestroyElement = () => {
    deregisterElement(this);
  };

  handleInsertOption = (option) => {
    registerOption(this, option);
  };

  handleDestroyOption = (option) => {
    deregisterOption(this, option);
  };

  handleChange = () => {
    _selectValue(this);
  };

  select = (value) => {
    return selectValue(this, value);
  };

  update = (value) => {
    return updateValue(this, value);
  };
}
