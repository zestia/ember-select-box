import Component from '@glimmer/component';
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
import api from '../../utils/native-select-box/api';
import { buildClassName } from '../../utils/shared/class-name';
import { ready } from '../../utils/shared/ready';
import { insertElement } from '../../utils/shared/element';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { A as emberA } from '@ember/array';

export default class NativeSelectBox extends Component {
  pendingOptions = emberA();
  previousValue = null;
  valueID = 0;

  @tracked element = null;
  @tracked isFulfilled = false;
  @tracked isPending = true;
  @tracked isRejected = false;
  @tracked isSettled = false;
  @tracked options = [];
  @tracked value = null;

  @api() api;

  constructor() {
    super(...arguments);
    receiveValue(this);
  }

  get className() {
    return buildClassName(this);
  }

  get isMultiple() {
    return this.args.multiple;
  }

  @action
  handleInsertElement(element) {
    registerElement(this, element);
    insertElement(this);
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
