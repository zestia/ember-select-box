import Component from '@ember/component';
import {
  _destroyComponent,
  _insertComponent
} from '../../utils/component/lifecycle';
import {
  deregisterElement,
  registerElement
} from '../../utils/registration/element';
import { input, keyDown } from '../../utils/select-box/input/keyboard';
import layout from '../../templates/components/select-box/input';
import className from '../../utils/select-box/input/class-name';
import { action } from '@ember/object';

export default class SelectBoxInput extends Component {
  layout = layout;
  tagName = '';

  // Arguments

  classNamePrefix = '';
  selectBox = null;

  // State

  domElement = null;

  // Actions

  onClear = null;
  onDelete = null;
  onInput = null;

  // Computed state

  @className() className;

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
  handleInput(e) {
    input(this, e);
  }

  @action
  handleKeyDown(e) {
    keyDown(this, e);
  }
}
