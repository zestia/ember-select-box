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
import isEqual from '../../../utils/general/is-equal';
import id from '../../../utils/shared/id';
import className from '../../../utils/select-box/selected-option/class-name';
import { computed, action } from '@ember/object';

export default class SelectBoxSelectedOption extends Component {
  domElement = null;
  isFulfilled = false;
  isPending = true;
  isRejected = false;
  isSettled = false;
  memoisedAPI = null;
  valueID = 0;

  // Computed state

  @api() api;
  @className() className;
  @id() id;
  @isEqual('index', 'selectBox.activeSelectedOptionIndex') isActive;

  @computed('args.selectBox.selectedOptions')
  get index() {
    return this.args.selectBox
      ? this.args.selectBox.selectedOptions.indexOf(this)
      : -1;
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
