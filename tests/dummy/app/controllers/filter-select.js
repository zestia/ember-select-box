import Controller from '@ember/controller';
import { pies } from '../utils/dummy-data';
import { tracked } from '@glimmer/tracking';

export default class FilterSelect extends Controller {
  @tracked selectedPie;

  selectablePies = pies;

  filterPies = (query) => {
    return pies.filter(
      (pie) => pie.name.toLowerCase().indexOf(query.toLowerCase()) >= 0
    );
  };

  selectPie = (pie) => {
    this.selectedPie = pie;
  };
}
