import Component from '@glimmer/component';
import {
  _destroyComponent,
  _insertComponent
} from '../../../utils/component/lifecycle';
import {
  deregisterElement,
  registerElement
} from '../../../utils/registration/element';
import { action } from '@ember/object';
import buildID from '../../../utils/shared/id';

export default class SelectBoxOptions extends Component {
  element = null;

  get id() {
    return buildID(this);
  }

  get isMultiSelectable() {
    return (
      this.args.selectBox &&
      this.args.selectBox.isMultiple &&
      this.args.selectBox.isCombobox
    );
  }

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
}
