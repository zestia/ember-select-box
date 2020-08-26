import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class BacktrackSelectController extends Controller {
  @tracked value = null;

  @action
  handleFocusOut() {
    this.value = 2;
  }

  @action
  handleClick() {
    this.value = 1;
  }
}
