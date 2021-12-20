import Component from '@glimmer/component';
import {
  lifecycleHooks,
  _destroyComponent,
  _insertComponent
} from '../../../utils/component/lifecycle';
import buildId from '../../../utils/shared/id';

export default class SelectBoxSelectedOptions extends Component {
  lifecycleHooks = lifecycleHooks(this);

  get id() {
    return buildId(this);
  }

  handleInsertElement = () => {
    _insertComponent(this);
  };

  handleDestroyElement = () => {
    _destroyComponent(this);
  };
}
