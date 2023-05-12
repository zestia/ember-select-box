import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class extends Controller {
  @action
  handleSubmit(event) {
    event.preventDefault();

    console.log('Form submitted', event); // eslint-disable-line no-console
  }
}
