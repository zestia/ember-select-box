import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class NativeSimpleSelect extends Component {
  @tracked isFocused;
  @tracked displayLabel;

  @action
  handleFocus() {
    this.isFocused = true;
  }

  @action
  handleBlur() {
    this.isFocused = false;
  }

  @action
  updateDisplay(sb) {
    const label = sb.element.querySelector('option:checked').textContent.trim();

    this.displayLabel = label;
  }
}
