import Controller from '@ember/controller';
import { pies } from '../utils/dummy-data';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class FilterSelect extends Controller {
  @tracked selectedPie;

  selectablePies = pies;

  @action
  filterPies(query) {
    return pies.filter(
      (pie) => pie.name.toLowerCase().indexOf(query.toLowerCase()) >= 0
    );
  }

  @action
  selectPie(pie) {
    this.selectedPie = pie;
  }
}
