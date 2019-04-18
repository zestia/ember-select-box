import Component from '@ember/component';
import layout from '../templates/components/filter-select';

export default Component.extend({
  layout,
  tagName: '',

  actions: {
    close(e, sb) {
      sb.close();
    },

    selected(select, value, sb) {
      select(value);
      sb.setInputValue(value[this.labelKey]);
      sb.close();
    }
  }
});
