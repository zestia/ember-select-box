import Controller from '@ember/controller';
import { puddings } from '../utils/dummy-data';
import { tracked } from '@glimmer/tracking';

export default class SimpleSelectController extends Controller {
  @tracked selectedPudding;

  selectablePuddings = puddings;

  selectPudding = (pudding) => {
    this.selectedPudding = pudding;
  };
}
