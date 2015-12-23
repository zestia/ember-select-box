import Ember from 'ember';
import Controller from 'ember-controller';
import { A as emberA } from 'ember-array/utils';
import { later } from 'ember-runloop';
import { breads } from '../utils/dummy-data';
const { RSVP } = Ember;

export default Controller.extend({
  _findBread(query) {
    let bread = emberA(breads).filter((bread) => {
      return bread.name.toLowerCase().indexOf(query.toLowerCase()) >= 0;
    });
    return new RSVP.Promise((resolve) => {
      later(() => {
        resolve(bread);
      }, 2000);
    });
  },

  actions: {
    findBread(query) {
      return this._findBread(query).then((breads) => {
        this.set('selectableBreads', breads);
        return breads;
      });
    },

    selectedBread(bread) {
      this.set('selectedBread', bread);
    },

    addNewBread(name) {
      this.set('newBread', name);
    }
  }
});
