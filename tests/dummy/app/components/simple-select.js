import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class SimpleSelect extends Component {
  @action
  handlePressKey(e, sb) {
    sb.activateOptionForKeyCode(e.keyCode);

    if (!sb.isOpen) {
      sb.selectActiveOption();
    }
  }

  @action
  handlePressUp(e, sb) {
    e.preventDefault();
    sb.activatePreviousOption();
  }

  @action
  handlePressDown(e, sb) {
    e.preventDefault();
    sb.activateNextOption();
    sb.open();
  }

  @action
  close(e, sb) {
    sb.close();
  }

  @action
  select(value, sb) {
    this.args.onSelect(value);
    sb.close();
  }
}
