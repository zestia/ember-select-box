import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class SearchSelectComponent extends Component {
  @tracked lastQuery;
  @tracked results = [];

  @action
  handleFocusLeave(e, sb) {
    console.log('focus left');

    sb.close();
    // sb.deactivateOptions();
  }

  @action
  handleSearched(results, query, sb) {
    console.log('searched');

    this.results = results;
    this.lastQuery = query;
    sb.open();
  }

  @action
  handleSelect(value, sb) {
    console.log('selected');

    this.args.onSelect(value);
    // sb.deactivateOptions();
  }
}
