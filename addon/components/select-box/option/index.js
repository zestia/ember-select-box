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
import api from '../../../utils/select-box/option/api';
import isEqual from '../../../utils/general/is-equal';
import isSelected from '../../../utils/shared/is-selected';
import id from '../../../utils/shared/id';
import buildClassName from '../../../utils/select-box/option/class-name';
import { computed, action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class SelectBoxOption extends Component {
  memoisedAPI = null;
  previousResolvedValue = null;
  valueID = 0;

  @tracked resolvedValue = null;
  @tracked domElement = null;
  @tracked isFulfilled = false;
  @tracked isPending = true;
  @tracked isRejected = false;
  @tracked isSettled = false;

  @api() api;
  @id() id;
  @isEqual('index', 'args.selectBox.activeOptionIndex') isActive;
  @isSelected() isSelected;

  get className() {
    return buildClassName(this);
  }

  @computed('args.selectBox.options')
  get index() {
    return this.args.selectBox ? this.args.selectBox.options.indexOf(this) : -1;
  }

  get isDisabled() {
    return this.args.disabled;
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

  @action
  handleMouseEnter() {
    _activateOption(this);
  }

  @action
  handleClick() {
    _selectOption(this);
  }
}
