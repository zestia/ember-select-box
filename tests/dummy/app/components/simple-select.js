import Component from '@ember/component';
import layout from '../templates/components/simple-select';
import { action } from '@ember/object';

export default class SimpleSelect extends Component {
  layout = layout;
  tagName = '';

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
  select(select, value, sb) {
    select(value);
    sb.close();
  }
}
