import Component from '@glimmer/component';
import buildId from '../../../utils/shared/id';

export default class SelectBoxGroup extends Component {
  get labelId() {
    return buildId(this);
  }
}
