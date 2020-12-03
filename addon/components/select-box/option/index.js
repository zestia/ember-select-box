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
import isSelected from '../../../utils/shared/selected';
import buildAPI from '../../../utils/shared/api';
import buildID from '../../../utils/shared/id';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class SelectBoxOption extends Component {
  _api = {};
  element = null;
  previousValue = null;
  valueID = 0;

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

  get tag() {
    return this.args.tag ? this.args.tag : 'div';
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
  handleFocus() {
    _activateOption(this);
  }

  @action
  handleClick() {
    _selectOption(this);
  }
}
