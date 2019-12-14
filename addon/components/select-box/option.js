import Component from '@ember/component';
import { _activateOption } from '../../utils/select-box/option/activate';
import {
  _destroyComponent,
  _insertComponent
} from '../../utils/component/lifecycle';
import { _selectOption } from '../../utils/select-box/option/select';
import { bool } from '@ember/object/computed';
import {
  deregisterElement,
  registerElement
} from '../../utils/registration/element';
import { receiveValue } from '../../utils/component/value';
import api from '../../utils/select-box/option/api';
import index from '../../utils/general/index';
import isEqual from '../../utils/general/is-equal';
import isSelected from '../../utils/shared/is-selected';
import layout from '../../templates/components/select-box/option';
import id from '../../utils/shared/id';
import className from '../../utils/select-box/option/class-name';
import { action } from '@ember/object';

export default class SelectBoxOption extends Component {
  layout = layout;
  tagName = '';

  // Arguments

  classNamePrefix = '';
  disabled = false;
  selectBox = null;
  selected = undefined;
  value = undefined;

  // Actions

  onActivate = null;
  onSelect = null;

  // State

  domElement = null;
  isFulfilled = false;
  isPending = true;
  isRejected = false;
  isSettled = false;
  memoisedAPI = null;
  previousResolvedValue = null;
  resolvedValue = null;
  valueID = 0;

  // Computed state

  @api() api;
  @className() className;
  @id() id;
  @index('selectBox.options') index;
  @isEqual('index', 'selectBox.activeOptionIndex') isActive;
  @bool('disabled') isDisabled;
  @isSelected() isSelected;

  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);
    receiveValue(this);
  }

  // Internal actions

  @action
  handleInsertElement(element) {
    registerElement(this, element);
    _insertComponent(this);
  }

  @action
  handleDestroyElement(element) {
    deregisterElement(this, element);
    _destroyComponent(this);
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
