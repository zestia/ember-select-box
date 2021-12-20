import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class SearchSelect extends Component {
  @tracked results;
  @tracked lastQuery;

  close = (e, sb) => {
    sb.close();
  };

  handleSearched = (results, query, sb) => {
    this.results = results;
    this.lastQuery = query;
    sb.open();
  };
}
