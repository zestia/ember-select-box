import Component from '@ember/component';
import layout from '../../templates/components/native-select-box/group';
import className from '../../utils/native-select-box/group/class-name';

export default class NativeSelectBoxGroup extends Component {
  layout = layout;
  tagName = '';

  // Arguments

  classNamePrefix = '';
  selectBox = null;

  // Computed state

  @className() className;
}
