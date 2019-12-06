import Controller from '@ember/controller';
import { puddings } from '../utils/dummy-data';
import { set, action } from '@ember/object';

export default class SimpleSelectController extends Controller {
  init() {
    super.init(...arguments);
    set(this, 'selectablePuddings', puddings);
  }

  @action
  selectPudding(pudding) {
    set(this, 'selectedPudding', pudding);
  }
}
