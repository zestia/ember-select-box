import Controller from '@ember/controller';
import { later } from '@ember/runloop';
import { breads } from '../utils/dummy-data';
import { Promise } from 'rsvp';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class SearchSelectController extends Controller {
  @tracked selectedBread;
  @tracked newBread;

  @action
  selectBread(bread) {
    this.selectedBread = bread;
  }

  @action
  addNewBread(name) {
    this.newBread = name;
  }

  @action
  findBread(query) {
    const bread = breads.filter(
      (bread) => bread.name.toLowerCase().indexOf(query.toLowerCase()) >= 0
    );

    return new Promise((resolve) => {
      later(() => {
        resolve(bread);
      }, 1000);
    });
  }
}
