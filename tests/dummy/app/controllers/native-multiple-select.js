import Controller from '@ember/controller';
import { pastries, biscuits } from '../utils/dummy-data';
import { set } from '@ember/object';

export default Controller.extend({
  init() {
    this._super(...arguments);
    set(this, 'selectablePastries', pastries);
    set(this, 'selectableBiscuits', biscuits);
  },

  actions: {
    selectedDesserts(desserts) {
      set(this, 'selectedDesserts', desserts);
    }
  }
});
