import Component from '@glimmer/component';
import {
  className,
  groupLabelClassName,
  groupOptionsClassName
} from '../../../utils/select-box/group/class-name';

export default class SelectBoxGroup extends Component {
  @className() className;
  @groupLabelClassName() groupLabelClassName;
  @groupOptionsClassName() groupOptionsClassName;
}
