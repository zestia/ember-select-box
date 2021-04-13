import Component from '@glimmer/component';
import {
  _destroyComponent,
  _insertComponent
} from '../../../utils/component/lifecycle';
import registerElement from '../../../utils/registration/element';
import buildAPI from '../../../utils/shared/api';
import { receiveValue } from '../../../utils/component/value';
import isSelected from '../../../utils/shared/selected';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class NativeSelectBoxOption extends Component {
  element = null;
  previousValue = null;
  sealedAPI = {};
  valueId = 0;

  @tracked isFulfilled = false;
  @tracked isPending = true;
  @tracked isRejected = false;
  @tracked isSettled = false;
  @tracked value = null;

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

    this.registerElement = registerElement(this);

    receiveValue(this);
  }

  @action
  handleInsertElement(element) {
    _insertComponent(this);
  }

  @action
  handleDestroyElement() {
    _destroyComponent(this);
  }

  @action
  handleUpdateValue() {
    receiveValue(this);
  }
}
