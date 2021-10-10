import Component from '@glimmer/component';
import { _activateOption } from '../../../utils/select-box/option/activate';
import lifecycleActions from '../../../utils/component/lifecycle';
import { _selectOption } from '../../../utils/select-box/option/select';
import registerElement from '../../../utils/registration/element';
import { receiveValue } from '../../../utils/component/value';
import isSelected from '../../../utils/shared/selected';
import buildAPI from '../../../utils/shared/api';
import { guidFor } from '@ember/object/internals';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class SelectBoxOption extends Component {
  element = null;
  previousValue = null;
  sealedAPI = {};
  valueId = 0;
  id = guidFor(this);
  lifecycleActions = lifecycleActions(this);
  receiveValue = receiveValue(this);
  registerElement = registerElement(this);

  @tracked isFulfilled = false;
  @tracked isPending = true;
  @tracked isRejected = false;
  @tracked isSettled = false;
  @tracked value = null;

  get api() {
    return buildAPI(this, [
      'element',
      'index',
      'isActive',
      'isDisabled',
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

  get isActive() {
    return this.args.selectBox
      ? this.index === this.args.selectBox.activeOptionIndex
      : false;
  }

  get isDisabled() {
    return !!this.args.disabled;
  }

  get isSelected() {
    return isSelected(this);
  }

  @action
  handleMouseEnter() {
    _activateOption(this);
  }

  @action
  handleFocus() {
    _activateOption(this);
  }

  @action
  handleClick() {
    _selectOption(this);
  }
}
