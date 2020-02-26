import Component from '@ember/component';
import {
  className,
  groupLabelClassName,
  groupOptionsClassName
} from '../../../utils/select-box/group/class-name';

export default class SelectBoxGroup extends Component {
  tagName = '';

  // Arguments

  classNamePrefix = '';
  selectBox = null;
  label = '';

  // Computed state

  @className() className;
  @groupLabelClassName() groupLabelClassName;
  @groupOptionsClassName() groupOptionsClassName;
}
