import Component from '@glimmer/component';
import {
  lifecycleHooks,
  _destroyComponent,
  _insertComponent
} from '../../../utils/component/lifecycle';
import buildId from '../../../utils/shared/id';

export default class SelectBoxOptions extends Component {
  lifecycleHooks = lifecycleHooks(this);

  get id() {
    return buildId(this);
  }

  get isMultiSelectable() {
    return (
      this.args.selectBox &&
      this.args.selectBox.isMultiple &&
      this.args.selectBox.isCombobox
    );
  }

  handleInsertElement() {
    _insertComponent(this);
  }

  handleDestroyElement() {
    _destroyComponent(this);
  }
}
