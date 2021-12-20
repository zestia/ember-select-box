import Controller from '@ember/controller';
import { cakes, puddings } from '../utils/dummy-data';
import { tracked } from '@glimmer/tracking';

export default class NativeSingleSelectController extends Controller {
  @tracked selectedDessert;

  selectableCakes = cakes;
  selectablePuddings = puddings;

  selectDessert = (dessert) => {
    this.selectedDessert = dessert;
  };
}
