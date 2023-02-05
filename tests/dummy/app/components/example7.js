import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class extends Component {
  @tracked inputValue = '';

  @action
  handleOpen(sb) {
    sb.search(sb.query);
  }

  @action
  handleSelect(sb) {
    this.inputValue = '';
    sb.search('');
  }
}
