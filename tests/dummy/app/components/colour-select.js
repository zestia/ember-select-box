import Component from 'ember-component';
import layout from '../templates/components/colour-select';
import { colours } from '../utils/dummy-data';

export default Component.extend({
  layout: layout,
  classNames: ['colour-select'],
  colours: colours,

  actions: {
    close(e, sb) {
      sb.close();
    }
  }
});
