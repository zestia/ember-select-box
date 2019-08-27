import Component from '@ember/component';
import layout from '../../templates/components/select-box/options';
import initAction from '../../utils/actions/init';
import destroyAction from '../../utils/actions/destroy';

export default Component.extend({
  layout,
  tagName: '',

  init() {
    this._super(...arguments);
    initAction(this);
  },

  actions: {
    willDestroyElement() {
      destroyAction(this);
    }
  }
});
