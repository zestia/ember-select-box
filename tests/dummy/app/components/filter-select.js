import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class FilterSelect extends Component {
  @action
  close(e, sb) {
    sb.close();
  }

  @action
  select(value, sb) {
    this.args.onSelect(value);
    sb.setInputValue(value[this.args.labelKey]);
    sb.close();
  }
}
