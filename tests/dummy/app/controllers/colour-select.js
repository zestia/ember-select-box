import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';

export default class ColourSelectController extends Controller {
  @tracked selectedColour;

  selectColour = (colour) => {
    this.selectedColour = colour;
  };
}
