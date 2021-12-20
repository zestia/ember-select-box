import Component from '@glimmer/component';
import {
  lifecycleHooks,
  _destroyComponent,
  _insertComponent
} from '../../../utils/component/lifecycle';
import {
  deregisterElement,
  registerElement
} from '../../../utils/registration/element';
import { input, keyDown } from '../../../utils/select-box/input/keyboard';
import buildId from '../../../utils/shared/id';

export default class SelectBoxInput extends Component {
  element = null;

  lifecycleHooks = lifecycleHooks(this);

  get id() {
    return buildId(this);
  }

  handleInsertElement = (element) => {
    registerElement(this, element);
    _insertComponent(this);
  };

  handleDestroyElement = () => {
    deregisterElement(this);
    _destroyComponent(this);
  };

  handleInput = (e) => {
    input(this, e);
  };

  handleKeyDown = (e) => {
    keyDown(this, e);
  };
}
