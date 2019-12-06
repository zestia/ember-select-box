import Component from '@ember/component';
import layout from '../templates/components/search-select';
import { set, action } from '@ember/object';

export default class SearchSelect extends Component {
  layout = layout;
  tagName = '';

  @action
  close(e, sb) {
    sb.close();
  }

  @action
  searched(results, query, sb) {
    set(this, 'lastQuery', query);
    sb.open();
  }
}
