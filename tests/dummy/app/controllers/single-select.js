import Controller from '@ember/controller';
import { breads } from '../utils/dummy-data';
import { tracked } from '@glimmer/tracking';

export default class SingleSelectController extends Controller {
  @tracked selectedBread;

  selectableBreads = breads;

  selectBread = (bread) => {
    this.selectedBread = bread;
  };
}
