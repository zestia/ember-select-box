import Component from '@glimmer/component';
import lifecycleActions from '../../../utils/component/lifecycle';
import { guidFor } from '@ember/object/internals';

export default class SelectBoxSelectedOption extends Component {
  id = guidFor(this);
  lifecycleActions = lifecycleActions(this);
}
