import Component from '@glimmer/component';
import {
  _destroyComponent,
  _insertComponent
} from '../../../utils/component/lifecycle';
import {
  deregisterElement,
  registerElement
} from '../../../utils/registration/element';
import { receiveValue } from '../../../utils/component/value';
import api from '../../../utils/select-box/selected-option/api';
import buildID from '../../../utils/shared/id';
import buildClassName from '../../../utils/select-box/selected-option/class-name';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class SelectBoxSelectedOption extends Component {
  previousValue = null;
  valueID = 0;

  @tracked value = null;
  @tracked element = null;
  @tracked isFulfilled = false;
  @tracked isPending = true;
  @tracked isRejected = false;
  @tracked isSettled = false;

  @api() api;

  get className() {
    return buildClassName(this);
  }

  get id() {
    return buildID(this);
  }

  get index() {
    return this.args.selectBox
      ? this.args.selectBox.selectedOptions.indexOf(this)
      : -1;
  }

  get isActive() {
    return this.args.selectBox
      ? this.index === this.args.selectBox.activeSelectedOptionIndex
      : false;
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
}
