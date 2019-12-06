import Controller from '@ember/controller';
import { biscuits, pastries } from '../utils/dummy-data';
import { set, action } from '@ember/object';

export default class NativeMultipleSelectController extends Controller {
  init() {
    super.init(...arguments);
    set(this, 'selectablePastries', pastries);
    set(this, 'selectableBiscuits', biscuits);
  }

  @action
  selectDesserts(desserts) {
    set(this, 'selectedDesserts', desserts);
  }
}
