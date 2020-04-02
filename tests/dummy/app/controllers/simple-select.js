import Controller from '@ember/controller';
import { puddings } from '../utils/dummy-data';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class SimpleSelectController extends Controller {
  @tracked selectedPudding;

  selectablePuddings = puddings;

  @action
  selectPudding(pudding) {
    this.selectedPudding = pudding;
  }
}
