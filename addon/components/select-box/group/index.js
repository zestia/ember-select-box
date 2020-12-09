import Component from '@glimmer/component';
import buildID from '../../../utils/shared/id';

export default class SelectBoxGroup extends Component {
  get labelId() {
    return buildID(this);
  }
}
