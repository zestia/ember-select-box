import Component from '@glimmer/component';
import { _activateOption } from '../../../utils/select-box/option/activate';
import {
  lifecycleHooks,
  _destroyComponent,
  _insertComponent
} from '../../../utils/component/lifecycle';
import { _selectOption } from '../../../utils/select-box/option/select';
import {
  deregisterElement,
  registerElement
} from '../../../utils/registration/element';
import { receiveValue } from '../../../utils/component/value';
import isSelected from '../../../utils/shared/selected';
import buildAPI from '../../../utils/shared/api';
import buildId from '../../../utils/shared/id';
import { tracked } from '@glimmer/tracking';

export default class SelectBoxOption extends Component {
  element = null;
  previousValue = null;
  stableAPI = {};
  valueId = 0;

  @tracked isFulfilled = false;
  @tracked isPending = true;
  @tracked isRejected = false;
  @tracked isSettled = false;
  @tracked value = null;

  lifecycleHooks = lifecycleHooks(this);

  get api() {
    return buildAPI(this, [
      'element',
      'index',
      'isActive',
      'isDisabled',
      'isFulfilled',
      'isPending',
      'isRejected',
      'isSelected',
      'isSettled',
      'value'
    ]);
  }

  get id() {
    return buildId(this);
  }

  get index() {
    return this.args.selectBox ? this.args.selectBox.option.indexOf(this) : -1;
  }

  get isActive() {
    return this.args.selectBox
      ? this.index === this.args.selectBox.activeOptionIndex
      : false;
  }

  get isDisabled() {
    return !!this.args.disabled;
  }

  get isSelected() {
    return isSelected(this);
  }

  constructor() {
    super(...arguments);
    receiveValue(this);
  }

  handleInsertElement = (element) => {
    registerElement(this, element);
    _insertComponent(this);
  };

  handleUpdatedValue = () => {
    receiveValue(this);
  };

  handleDestroyElement = () => {
    deregisterElement(this);
    _destroyComponent(this);
  };

  handleMouseEnter = () => {
    _activateOption(this);
  };

  handleFocus = () => {
    _activateOption(this);
  };

  handleClick = () => {
    _selectOption(this);
  };
}
