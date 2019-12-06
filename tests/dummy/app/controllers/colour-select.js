import Controller from '@ember/controller';
import { action, set } from '@ember/object';

export default class ColourSelectController extends Controller {
  @action
  selectColour(colour) {
    set(this, 'selectedColour', colour);
  }
}
