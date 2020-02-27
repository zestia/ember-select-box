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
import buildClassName from '../../../utils/select-box/selected-option/class-name';
import { computed, action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class SelectBoxSelectedOption extends Component {
  memoisedAPI = null;
  valueID = 0;

  @tracked domElement = null;
  @tracked isFulfilled = false;
  @tracked isPending = true;
  @tracked isRejected = false;
  @tracked isSettled = false;

  // Computed state

  @api() api;
  @id() id;
  @isEqual('index', 'args.selectBox.activeSelectedOptionIndex') isActive;

  get className() {
    return buildClassName(this);
  }

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
