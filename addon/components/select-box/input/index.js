import Component from '@glimmer/component';
import lifecycleActions from '../../../utils/component/lifecycle';
import registerElement from '../../../utils/registration/element';
import { input, keyDown } from '../../../utils/select-box/input/keyboard';
import { action } from '@ember/object';
import { guidFor } from '@ember/object/internals';

export default class SelectBoxInput extends Component {
  element = null;

  id = guidFor(this);
  registerElement = registerElement(this);
  lifecycleActions = lifecycleActions(this);

  @action
  handleInput(e) {
    input(this, e);
  }

  @action
  handleKeyDown(e) {
    keyDown(this, e);
  }
}
