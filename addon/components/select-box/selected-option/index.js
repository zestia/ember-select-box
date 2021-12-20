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

export default class SelectBoxSelectedOption extends Component {
  element = null;

  lifecycleHooks = lifecycleHooks(this);

  get id() {
    return buildId(this);
  }

  handleInsertElement = (element) => {
    _insertComponent(this);
    registerElement(this, element);
  };

  handleDestroyElement = () => {
    deregisterElement(this);
    _destroyComponent(this);
  };
}
