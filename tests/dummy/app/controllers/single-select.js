import Controller from '@ember/controller';
import { breads } from '../utils/dummy-data';
import { set, action } from '@ember/object';

export default class SingleSelectController extends Controller {
  init() {
    super.init(...arguments);
    set(this, 'selectableBreads', breads);
    set(this, 'bloomer', { id: 13, name: 'Bloomer' });
    set(this, 'brioche', { id: 14, name: 'Brioche' });
  }

  @action
  selectBread(bread) {
    set(this, 'selectedBread', bread);
  }

  @action
  action1() {
    set(this, 'performedAction1', true);
  }

  @action
  action2() {
    set(this, 'performedAction2', true);
  }
}
