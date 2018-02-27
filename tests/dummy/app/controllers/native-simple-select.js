import Controller from '@ember/controller';
import { biscuits } from '../utils/dummy-data';

export default Controller.extend({
  init() {
    this._super(...arguments);
    this.set('selectableBiscuits', biscuits);
    this.set('selectedBiscuit', biscuits[2]);
  },

  actions: {
    selectedBiscuit(biscuit) {
      this.set('selectedBiscuit', biscuit);
    }
  }
});
