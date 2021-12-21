import Controller from '@ember/controller';
import { biscuits } from '../utils/dummy-data';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class NativeSimpleSelectController extends Controller {
  @tracked selectedBiscuit = biscuits[2];

  selectableBiscuits = biscuits;

  @action
  selectBiscuit(biscuit) {
    this.selectedBiscuit = biscuit;
  }
}
