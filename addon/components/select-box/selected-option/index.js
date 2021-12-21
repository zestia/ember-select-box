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
import buildId from '../../../utils/shared/id';
import { action } from '@ember/object';

export default class SelectBoxSelectedOption extends Component {
  element = null;

  lifecycleHooks = lifecycleHooks(this);

  get id() {
    return buildId(this);
  }

  @action
  handleInsertElement(element) {
    _insertComponent(this);
    registerElement(this, element);
  }

  @action
  handleDestroyElement() {
    deregisterElement(this);
    _destroyComponent(this);
  }
}
