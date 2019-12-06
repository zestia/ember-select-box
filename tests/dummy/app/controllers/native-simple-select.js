import Controller from '@ember/controller';
import { biscuits } from '../utils/dummy-data';
import { set, action } from '@ember/object';

export default class NativeSimpleSelectController extends Controller {
  init() {
    super.init(...arguments);
    set(this, 'selectableBiscuits', biscuits);
    set(this, 'selectedBiscuit', biscuits[2]);
  }

  @action
  selectBiscuit(biscuit) {
    set(this, 'selectedBiscuit', biscuit);
  }
}
