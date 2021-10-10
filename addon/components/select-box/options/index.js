import Component from '@glimmer/component';
import lifecycleActions from '../../../utils/component/lifecycle';
import { guidFor } from '@ember/object/internals';

export default class SelectBoxOptions extends Component {
  id = guidFor(this);
  lifecycleActions = lifecycleActions(this);

  get isMultiSelectable() {
    return (
      this.args.selectBox &&
      this.args.selectBox.isMultiple &&
      this.args.selectBox.isCombobox
    );
  }
}
