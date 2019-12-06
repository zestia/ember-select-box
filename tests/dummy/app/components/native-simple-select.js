import Component from '@ember/component';
import layout from '../templates/components/native-simple-select';
import { action, set } from '@ember/object';

export default class NativeSimpleSelect extends Component {
  layout = layout;
  tagName = '';

  @action
  handleFocus() {
    set(this, 'isFocused', true);
  }

  @action
  handleBlur() {
    set(this, 'isFocused', false);
  }

  @action
  updateDisplay(sb) {
    const label = sb.element.querySelector('option:checked').textContent.trim();

    set(this, 'displayLabel', label);
  }
}
