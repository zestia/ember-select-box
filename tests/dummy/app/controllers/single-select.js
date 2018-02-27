import Controller from '@ember/controller';
import { breads } from '../utils/dummy-data';

export default Controller.extend({
  init() {
    this._super(...arguments);
    this.set('selectableBreads', breads);
    this.set('bloomer', { id: 13, name: 'Bloomer' });
    this.set('brioche', { id: 14, name: 'Brioche' });
  },

  actions: {
    selectedBread(bread) {
      this.set('selectedBread', bread);
    },

    action1() {
      this.set('action1', true);
    },

    action2() {
      this.set('action2', true);
    }
  }
});
