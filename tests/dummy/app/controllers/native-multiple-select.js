import Controller from '@ember/controller';
import { pastries, biscuits } from '../utils/dummy-data';

export default Controller.extend({
  init() {
    this._super(...arguments);
    this.set('selectablePastries', pastries);
    this.set('selectableBiscuits', biscuits);
  },

  actions: {
    selectedDesserts(desserts) {
      this.set('selectedDesserts', desserts);
    }
  }
});
