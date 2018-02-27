import Controller from '@ember/controller';
import { cakes, puddings } from '../utils/dummy-data';

export default Controller.extend({
  init() {
    this._super(...arguments);
    this.set('selectableCakes', cakes);
    this.set('selectablePuddings', puddings);
  },

  actions: {
    selectedDessert(dessert) {
      this.set('selectedDessert', dessert);
    }
  }
});
