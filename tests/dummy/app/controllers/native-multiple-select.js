import Controller from '@ember/controller';
import { biscuits, pastries } from '../utils/dummy-data';
import { tracked } from '@glimmer/tracking';

export default class NativeMultipleSelectController extends Controller {
  @tracked selectedDesserts;

  selectablePastries = pastries;
  selectableBiscuits = biscuits;

  selectDesserts = (desserts) => {
    this.selectedDesserts = desserts;
  };
}
