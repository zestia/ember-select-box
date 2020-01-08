import Controller from '@ember/controller';
import { pies } from '../utils/dummy-data';
import { resolve } from 'rsvp';
import { set, action } from '@ember/object';

export default class FilterSelect extends Controller {
  init() {
    super.init(...arguments);
    set(this, 'selectablePies', pies);
  }

  @action
  filterPies(query) {
    return this._filterPies(query);
  }

  @action
  selectPie(pie) {
    set(this, 'selectedPie', pie);
  }

  _filterPies(query) {
    return resolve(
      pies.filter(pie => {
        return pie.name.toLowerCase().indexOf(query.toLowerCase()) >= 0;
      })
    );
  }
}
