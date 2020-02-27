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
import api from '../../../utils/native-select-box/option/api';
import isSelected from '../../../utils/shared/is-selected';
import { buildClassName } from '../../../utils/shared/class-name';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class NativeSelectBoxOption extends Component {
  memoisedAPI = null;
  previousValue = null;

  @tracked value = null;
  @tracked domElement = null;
  @tracked isFulfilled = false;
  @tracked isPending = true;
  @tracked isRejected = false;
  @tracked isSettled = false;

  @api() api;

  get className() {
    return buildClassName(this.args.selectBox, 'option');
  }

  get isSelected() {
    return isSelected(this);
  }

  get index() {
    return this.args.selectBox ? this.args.selectBox.options.indexOf(this) : -1;
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
