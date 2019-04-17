import Controller from '@ember/controller';
import { later } from '@ember/runloop';
import { breads } from '../utils/dummy-data';
import { Promise } from 'rsvp';
import { set } from '@ember/object';

export default Controller.extend({
  actions: {
    findBread(query) {
      return this._findBread(query).then(breads => {
        set(this, 'selectableBreads', breads);
        return breads;
      });
    },

    selectedBread(bread) {
      set(this, 'selectedBread', bread);
    },

    addNewBread(name) {
      set(this, 'newBread', name);
    }
  },

  _findBread(query) {
    const bread = breads.filter(bread => {
      return bread.name.toLowerCase().indexOf(query.toLowerCase()) >= 0;
    });
    return new Promise(resolve => {
      later(() => {
        resolve(bread);
      }, 1000);
    });
  }
});
