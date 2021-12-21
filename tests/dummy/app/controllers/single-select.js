import Controller from '@ember/controller';
import { breads } from '../utils/dummy-data';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class SingleSelectController extends Controller {
  @tracked selectedBread;

  selectableBreads = breads;

  @action
  selectBread(bread) {
    this.selectedBread = bread;
  }
}
