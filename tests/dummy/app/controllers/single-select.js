import Controller from '@ember/controller';
import { breads, bloomer, brioche } from '../utils/dummy-data';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class SingleSelectController extends Controller {
  @tracked selectedBread;
  @tracked performedAction1;
  @tracked performedAction2;

  selectableBreads = breads;
  bloomer = bloomer;
  brioche = brioche;

  @action
  selectBread(bread) {
    this.selectedBread = bread;
  }

  @action
  action1() {
    this.performedAction1 = true;
  }

  @action
  action2() {
    this.performedAction2 = true;
  }
}
