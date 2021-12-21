import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class BacktrackSelectController extends Controller {
  @tracked value = null;

  @action
  reproHandleFocusOut() {
    this.value = 2;
  }

  @action
  reproHandleClick() {
    this.value = 1;
  }

  @action
  handleFocusLeave(e, sb) {
    sb.deactivateOptions();
  }

  @action
  handleSelect(value, sb) {
    sb.deactivateOptions();
  }
}
