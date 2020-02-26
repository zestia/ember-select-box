import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class ColourSelectController extends Controller {
  @tracked selectedColour;

  @action
  selectColour(colour) {
    this.selectedColour = colour;
  }
}
