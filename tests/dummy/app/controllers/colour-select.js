import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class ColourSelectController extends Controller {
  @action
  selectColour(colour) {
    this.selectedColour = colour;
  }
}
