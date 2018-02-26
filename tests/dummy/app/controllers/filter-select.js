import Controller from '@ember/controller';
import { pies } from '../utils/dummy-data';
import { resolve } from 'rsvp';

export default Controller.extend({
  init() {
    this._super(...arguments);
    this.set('selectablePies', pies);
  },

  _filterPies(query) {
    return resolve(pies.filter(pie => {
      return pie.name.toLowerCase().indexOf(query.toLowerCase()) >= 0;
    }));
  },

  actions: {
    filterPies(query) {
      return this._filterPies(query).then(pies => {
        this.set('selectablePies', pies);
        return pies;
      });
    },

    selectedPie(pie) {
      this.set('selectedPie', pie);
    }
  }
});
