import Component from '@glimmer/component';

import {
  deregisterElement,
  registerElement
} from '../../../utils/registration/element';
import {
  lifecycleHooks,
  _destroyComponent,
  _insertComponent
} from '../../../utils/component/lifecycle';
import buildAPI from '../../../utils/shared/api';
import { receiveValue } from '../../../utils/component/value';
import isSelected from '../../../utils/shared/selected';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class NativeSelectBoxOption extends Component {
  element = null;
  previousValue = null;
  stableAPI = {};
  valueId = 0;

  @tracked isFulfilled = false;
  @tracked isPending = true;
  @tracked isRejected = false;
  @tracked isSettled = false;
  @tracked value = null;

  lifecycleHooks = lifecycleHooks(this);

  get api() {
    return buildAPI(this, [
      'element',
      'index',
      'isFulfilled',
      'isPending',
      'isRejected',
      'isSelected',
      'isSettled',
      'value'
    ]);
  }

  get index() {
    return this.args.selectBox ? this.args.selectBox.option.indexOf(this) : -1;
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
  handleUpdatedValue() {
    receiveValue(this);
  }

  @action
  handleDestroyElement() {
    deregisterElement(this);
    _destroyComponent(this);
  }
}
