import Component from '@glimmer/component';
import { buildClassName } from '../../../utils/shared/class-name';

export default class SelectBoxGroup extends Component {
  get className() {
    return buildClassName(this.args.selectBox, 'group');
  }

  get groupLabelClassName() {
    return buildClassName(this.args.selectBox, 'group-label');
  }

  get groupOptionsClassName() {
    return buildClassName(this.args.selectBox, 'group-options');
  }
}
