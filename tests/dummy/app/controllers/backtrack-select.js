import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class BacktrackSelectController extends Controller {
  @action
  handleFocusLeave(e, sb) {
    console.log('focus left');
    sb.deactivateOptions();
  }

  @action
  handleSelect(value, sb) {
    console.log('seleted value', value);
    sb.deactivateOptions();
  }
}
