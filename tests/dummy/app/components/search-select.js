import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class SearchSelect extends Component {
  @tracked results;
  @tracked lastQuery;

  @action
  close(e, sb) {
    sb.close();
  }

  @action
  handleSearched(results, query, sb) {
    this.results = results;
    this.lastQuery = query;
    sb.open();
  }
}
