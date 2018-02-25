import Component from '@ember/component';
import layout from '../templates/components/search-select';

export default Component.extend({
  layout,
  tagName: '',

  actions: {
    close(e, sb) {
      sb.close();
    },

    searched(results, query, sb) {
      if (!results.length) {
        this.set('lastQuery', query);
      }
      sb.open();
    }
  }
});
