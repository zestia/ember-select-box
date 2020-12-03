import Controller from '@ember/controller';
import { breads } from '../utils/dummy-data';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class SingleSelectController extends Controller {
  @tracked selectedBread;

  selectableBreads = breads;

  @action
  selectBread(bread) {
    this.selectedBread = bread;
  }
}
