import Component from '@ember/component';
import className from '../../../utils/native-select-box/group/class-name';

export default class NativeSelectBoxGroup extends Component {
  tagName = '';

  // Arguments

  classNamePrefix = '';
  selectBox = null;

  // Computed state

  @className() className;
}
