import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';

export default class BacktrackSelectController extends Controller {
  @tracked value = null;

  reproHandleFocusOut = () => {
    this.value = 2;
  };

  reproHandleClick = () => {
    this.value = 1;
  };

  handleFocusLeave = (e, sb) => {
    sb.deactivateOptions();
  };

  handleSelect = (value, sb) => {
    sb.deactivateOptions();
  };
}
