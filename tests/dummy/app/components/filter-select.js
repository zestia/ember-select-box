import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class FilterSelect extends Component {
  @tracked results;

  close = (e, sb) => {
    sb.close();
  };

  handleSearched = (results) => {
    this.results = results;
  };

  reveal = (sb) => {
    sb.search('');
    sb.open();
  };

  select = (value, sb) => {
    this.args.onSelect(value);
    sb.setInputValue(value[this.args.labelKey]);
    sb.close();
  };
}
