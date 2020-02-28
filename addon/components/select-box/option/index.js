import Component from '@glimmer/component';
import { _activateOption } from '../../../utils/select-box/option/activate';
import {
  _destroyComponent,
  _insertComponent
} from '../../../utils/component/lifecycle';
import { _selectOption } from '../../../utils/select-box/option/select';
import {
  deregisterElement,
  registerElement
} from '../../../utils/registration/element';
import { receiveValue } from '../../../utils/component/value';
import isSelected from '../../../utils/shared/is-selected';
import buildAPI from '../../../utils/shared/api';
import buildID from '../../../utils/shared/id';
import buildClassName from '../../../utils/select-box/option/class-name';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class SelectBoxOption extends Component {
  _api = {};
  previousValue = null;
  valueID = 0;

  @tracked element = null;
  @tracked isFulfilled = false;
  @tracked isPending = true;
  @tracked isRejected = false;
  @tracked isSettled = false;
  @tracked value = null;

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

  get className() {
    return buildClassName(this);
  }

  get id() {
    return buildID(this);
  }

  get index() {
    return this.args.selectBox ? this.args.selectBox.options.indexOf(this) : -1;
  }

  get isActive() {
    return this.args.selectBox
      ? this.index === this.args.selectBox.activeOptionIndex
      : false;
  }

  get isDisabled() {
    return this.args.disabled;
  }

  get isSelected() {
    return isSelected(this);
  }

  constructor() {
    super(...arguments);
    receiveValue(this);
  }

  @action
  handleInsertElement(element) {
    registerElement(this, element);
    _insertComponent(this);
  }

  @action
  handleDestroyElement() {
    deregisterElement(this);
    _destroyComponent(this);
  }

  @action
  handleUpdateValue() {
    receiveValue(this);
  }

  @action
  handleMouseEnter() {
    _activateOption(this);
  }

  @action
  handleClick() {
    _selectOption(this);
  }
}
