import Component from '@ember/component';
import layout from '../templates/components/filter-select';
import { get } from '@ember/object';

export default Component.extend({
  layout,
  tagName: '',

  actions: {
    close(e, sb) {
      sb.close();
    },

    selected(select, value, sb) {
      select(value);
      sb.setInputValue(get(value, this.get('label-key')));
      sb.close();
    }
  }
});
