import Component from '@glimmer/component';
import { buildClassName } from '../../../utils/shared/class-name';

export default class NativeSelectBoxGroup extends Component {
  get className() {
    return buildClassName(this.args.selectBox, 'group');
  }
}
