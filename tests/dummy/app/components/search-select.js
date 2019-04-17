import Component from '@ember/component';
import { set } from '@ember/object';
import layout from '../templates/components/search-select';

export default Component.extend({
  layout,
  tagName: '',

  actions: {
    close(e, sb) {
      sb.close();
    },

    searched(results, query, sb) {
      set(this, 'lastQuery', query);
      sb.open();
    }
  }
});
