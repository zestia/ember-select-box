import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class NativeSimpleSelect extends Component {
  @tracked displayLabel;

  @action
  updateDisplay(sb) {
    const label = sb.element.querySelector('option:checked').textContent.trim();

    this.displayLabel = label;
  }
}
