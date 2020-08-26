import Controller from '@ember/controller';
import { breads } from '../utils/dummy-data';
import { Promise } from 'rsvp';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class BacktrackSelectController extends Controller {
  @tracked selectedBread;

  @action
  selectBread(bread) {
    this.selectedBread = bread;
  }

  @action
  findBread(query) {
    return Promise.resolve(
      breads.filter(
        (bread) => bread.name.toLowerCase().indexOf(query.toLowerCase()) >= 0
      )
    );
  }
}
