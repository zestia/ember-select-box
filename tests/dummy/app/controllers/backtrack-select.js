import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

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
