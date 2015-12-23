import Controller from 'ember-controller';
import { biscuits } from '../utils/dummy-data';

export default Controller.extend({
  init() {
    this.set('selectableBiscuits', biscuits);
  },
  actions: {
    selectedBiscuit(biscuit) {
      this.set('selectedBiscuit', biscuit);
    }
  }
});
