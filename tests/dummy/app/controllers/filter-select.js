import Controller from '@ember/controller';
import { pies } from '../utils/dummy-data';
import { resolve } from 'rsvp';
import { set } from '@ember/object';

export default Controller.extend({
  init() {
    this._super(...arguments);
    set(this, 'selectablePies', pies);
  },

  actions: {
    filterPies(query) {
      return this._filterPies(query).then(pies => {
        set(this, 'selectablePies', pies);
        return pies;
      });
    },

    selectedPie(pie) {
      set(this, 'selectedPie', pie);
    }
  },

  _filterPies(query) {
    return resolve(
      pies.filter(pie => {
        return pie.name.toLowerCase().indexOf(query.toLowerCase()) >= 0;
      })
    );
  }
});
