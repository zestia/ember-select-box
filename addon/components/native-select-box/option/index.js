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
import className from '../../../utils/native-select-box/option/class-name';
import { computed, action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class NativeSelectBoxOption extends Component {
  domElement = null;
  memoisedAPI = null;
  previousResolvedValue = null;
  resolvedValue = null;

  @tracked isFulfilled = false;
  @tracked isPending = true;
  @tracked isRejected = false;
  @tracked isSettled = false;

  @api() api;
  @className() className;
  @isSelected() isSelected;

  @computed('args.selectBox.options')
  get index() {
    return this.args.selectBox ? this.args.selectBox.options.indexOf(this) : -1;
  }

  constructor() {
    super(...arguments);
    receiveValue(this);
  }

  // Internal actions

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
