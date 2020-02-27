import Component from '@glimmer/component';
import {
  deregisterElement,
  registerElement
} from '../../utils/registration/element';
import {
  deregisterOption,
  initOptions,
  registerOption
} from '../../utils/registration/option';
import {
  receiveValue,
  selectValue,
  updateValue
} from '../../utils/shared/value';
import { selectValue as _selectValue } from '../../utils/native-select-box/value';
import api from '../../utils/native-select-box/api';
import className from '../../utils/native-select-box/class-name';
import { ready } from '../../utils/shared/ready';
import { insertElement } from '../../utils/shared/element';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { dependentKeyCompat } from '@ember/object/compat';

export default class NativeSelectBox extends Component {
  domElement = null;
  memoisedAPI = null;
  previousResolvedValue = null;
  resolvedValue = null;
  valueID = 0;

  @tracked isFulfilled = false;
  @tracked isPending = true;
  @tracked isRejected = false;
  @tracked isSettled = false;

  @api() api;
  @className() className;

  constructor() {
    super(...arguments);
    initOptions(this);
    receiveValue(this);
  }

  @dependentKeyCompat
  get isMultiple() {
    return this.args.multiple;
  }

  // Internal actions

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

  // Public API Actions

  @action
  select(value) {
    return selectValue(this, value);
  }

  @action
  update(value) {
    return updateValue(this, value);
  }
}
