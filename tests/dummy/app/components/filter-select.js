import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class FilterSelect extends Component {
  @tracked results;

  @action
  close(e, sb) {
    sb.close();
  }

  @action
  handleSearched(results) {
    this.results = results;
  }

  @action
  reveal(sb) {
    sb.search('');
    sb.open();
  }

  @action
  select(value, sb) {
    this.args.onSelect(value);
    sb.setInputValue(value[this.args.labelKey]);
    sb.close();
  }
}
