import Controller from '@ember/controller';
import { later } from '@ember/runloop';
import { breads } from '../utils/dummy-data';
import { Promise } from 'rsvp';
import { tracked } from '@glimmer/tracking';

export default class SearchSelectController extends Controller {
  @tracked selectedBread;
  @tracked newBread;

  selectBread = (bread) => {
    this.selectedBread = bread;
  };

  addNewBread = (name) => {
    this.newBread = name;
  };

  findBread = (query) => {
    const bread = breads.filter(
      (bread) => bread.name.toLowerCase().indexOf(query.toLowerCase()) >= 0
    );

    return new Promise((resolve) => {
      later(() => {
        resolve(bread);
      }, 1000);
    });
  };
}
