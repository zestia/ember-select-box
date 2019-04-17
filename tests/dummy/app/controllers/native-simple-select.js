import Controller from '@ember/controller';
import { biscuits } from '../utils/dummy-data';
import { set } from '@ember/object';

export default Controller.extend({
  init() {
    this._super(...arguments);
    set(this, 'selectableBiscuits', biscuits);
    set(this, 'selectedBiscuit', biscuits[2]);
  },

  actions: {
    selectedBiscuit(biscuit) {
      set(this, 'selectedBiscuit', biscuit);
    }
  }
});
