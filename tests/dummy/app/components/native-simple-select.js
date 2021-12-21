import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class NativeSimpleSelect extends Component {
  @tracked displayLabel;

  @action
  updateDisplay(sb) {
    const label = sb.element.querySelector('option:checked').textContent.trim();

    this.displayLabel = label;
  }
}
