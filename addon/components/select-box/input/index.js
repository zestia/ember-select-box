import Component from '@glimmer/component';
import {
  _destroyComponent,
  _insertComponent
} from '../../../utils/component/lifecycle';
import {
  deregisterElement,
  registerElement
} from '../../../utils/registration/element';
import { input, keyDown } from '../../../utils/select-box/input/keyboard';
import { buildClassName } from '../../../utils/shared/class-name';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class SelectBoxInput extends Component {
  @tracked domElement = null;

  get className() {
    return buildClassName(this.args.selectBox, 'input');
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

  @action
  handleInput(e) {
    input(this, e);
  }

  @action
  handleKeyDown(e) {
    keyDown(this, e);
  }
}
