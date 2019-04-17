import Controller from '@ember/controller';
import { puddings } from '../utils/dummy-data';
import { set } from '@ember/object';

export default Controller.extend({
  init() {
    this._super(...arguments);
    set(this, 'selectablePuddings', puddings);
  },

  actions: {
    selectedPudding(pudding) {
      set(this, 'selectedPudding', pudding);
    }
  }
});
