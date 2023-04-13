import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class extends Component {
  @action
  preventDefault(event) {
    event.preventDefault();
  }
}
