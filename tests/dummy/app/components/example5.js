import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class extends Component {
  @action
  buildSelection(newValue, oldValue) {
    const value = [...oldValue];

    if (!value.includes(newValue)) {
      value.push(newValue);
    }

    return value;
  }
}
