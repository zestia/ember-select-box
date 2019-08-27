import Component from '@ember/component';
import layout from '../../templates/components/select-box/options';
import init from '../../utils/init';
import destroy from '../../utils/destroy';

export default Component.extend({
  layout,
  tagName: '',

  init() {
    this._super(...arguments);
    init(this);
  },

  actions: {
    willDestroyElement() {
      destroy(this);
    }
  }
});
