import Component from '@ember/component';
import layout from '../../templates/components/select-box/group';
import { className } from '../../utils/shared/attributes';

export default class SelectBoxGroup extends Component {
  layout = layout;
  tagName = '';

  // Arguments

  classNamePrefix = '';
  selectBox = null;
  label = '';

  // Computed state

  @className className;
}
