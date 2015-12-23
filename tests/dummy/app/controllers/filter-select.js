import Ember from 'ember';
import Controller from 'ember-controller';
import { A as emberA } from 'ember-array/utils';
import { pies } from '../utils/dummy-data';
const { RSVP } = Ember;

export default Controller.extend({
  init() {
    this.set('selectablePies', pies);
  },

  _filterPies(query) {
    return RSVP.resolve(emberA(pies).filter((pie) => {
      return pie.name.toLowerCase().indexOf(query.toLowerCase()) >= 0;
    }));
  },

  actions: {
    filterPies(query) {
      return this._filterPies(query).then((pies) => {
        this.set('selectablePies', pies);
        return pies;
      });
    },

    selectedPie(pie) {
      this.set('selectedPie', pie);
    }
  }
});
