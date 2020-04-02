import Component from '@glimmer/component';
import {
  _destroyComponent,
  _insertComponent,
} from '../../../utils/component/lifecycle';
import {
  deregisterElement,
  registerElement,
} from '../../../utils/registration/element';
import buildAPI from '../../../utils/shared/api';
import { receiveValue } from '../../../utils/component/value';
import isSelected from '../../../utils/shared/selected';
import { buildClassName } from '../../../utils/shared/class-name';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class NativeSelectBoxOption extends Component {
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
      'isDisabled',
      'isFulfilled',
      'isPending',
      'isRejected',
      'isSelected',
      'isSettled',
      'value',
    ]);
  }

  get className() {
    return buildClassName(this.args.selectBox, 'option');
  }

  get index() {
    return this.args.selectBox ? this.args.selectBox.options.indexOf(this) : -1;
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
}
