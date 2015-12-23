import Controller from 'ember-controller';
import { breads } from '../utils/dummy-data';

export default Controller.extend({
  init() {
    this.set('selectableBreads', breads);
  },
  actions: {
    selectedBread(bread) {
      this.set('selectedBread', bread);
    }
  }
});
