import Controller from '@ember/controller';
import { breads } from '../utils/dummy-data';
import { set } from '@ember/object';

export default Controller.extend({
  init() {
    this._super(...arguments);
    set(this, 'selectableBreads', breads);
    set(this, 'bloomer', { id: 13, name: 'Bloomer' });
    set(this, 'brioche', { id: 14, name: 'Brioche' });
  },

  actions: {
    selectedBread(bread) {
      set(this, 'selectedBread', bread);
    },

    action1() {
      set(this, 'action1', true);
    },

    action2() {
      set(this, 'action2', true);
    }
  }
});
