import Controller from '@ember/controller';
import { biscuits, pastries } from '../utils/dummy-data';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class NativeMultipleSelectController extends Controller {
  @tracked selectedDesserts;

  selectablePastries = pastries;
  selectableBiscuits = biscuits;

  @action
  selectDesserts(desserts) {
    this.selectedDesserts = desserts;
  }
}
