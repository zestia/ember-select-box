import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ColourSelectController extends Controller {
  @tracked selectedColour;

  @action
  selectColour(colour) {
    this.selectedColour = colour;
  }
}
