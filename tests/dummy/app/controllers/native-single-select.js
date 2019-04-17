import Controller from '@ember/controller';
import { cakes, puddings } from '../utils/dummy-data';
import { set } from '@ember/object';

export default Controller.extend({
  init() {
    this._super(...arguments);
    set(this, 'selectableCakes', cakes);
    set(this, 'selectablePuddings', puddings);
  },

  actions: {
    selectedDessert(dessert) {
      set(this, 'selectedDessert', dessert);
    }
  }
});
