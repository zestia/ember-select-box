import Component from '@glimmer/component';

export default class SimpleSelect extends Component {
  handlePressKey = (e, sb) => {
    sb.activateOptionForKeyCode(e.keyCode);

    if (!sb.isOpen) {
      sb.selectActiveOption();
    }
  };

  handlePressUp = (e, sb) => {
    e.preventDefault();
    sb.activatePreviousOption();
  };

  handlePressDown = (e, sb) => {
    e.preventDefault();
    sb.activateNextOption();
    sb.open();
  };

  close = (e, sb) => {
    sb.close();
  };

  select = (value, sb) => {
    this.args.onSelect(value);
    sb.close();
  };
}
