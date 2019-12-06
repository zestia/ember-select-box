import Controller from '@ember/controller';
import { cakes, puddings } from '../utils/dummy-data';
import { set, action } from '@ember/object';

export default class NativeSingleSelectController extends Controller {
  init() {
    super.init(...arguments);
    set(this, 'selectableCakes', cakes);
    set(this, 'selectablePuddings', puddings);
  }

  @action
  selectDessert(dessert) {
    set(this, 'selectedDessert', dessert);
  }
}
