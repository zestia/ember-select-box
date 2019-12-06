import Component from '@ember/component';
import layout from '../templates/components/filter-select';
import { action } from '@ember/object';

export default class FilterSelect extends Component {
  layout = layout;
  tagName = '';

  @action
  close(e, sb) {
    sb.close();
  }

  @action
  select(select, value, sb) {
    select(value);
    sb.setInputValue(value[this.labelKey]);
    sb.close();
  }
}
