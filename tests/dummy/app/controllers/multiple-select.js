import Controller from 'ember-controller';
import { biscuits, pastries } from '../utils/dummy-data';

export default Controller.extend({
  init() {
    this.set('selectableBiscuits', biscuits);
    this.set('selectablePastries', pastries);
  },
  actions: {
    selectedSnacks(snacks) {
      this.set('selectedSnacks', snacks);
    }
  }
});
