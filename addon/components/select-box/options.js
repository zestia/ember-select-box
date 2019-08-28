import Component from '@ember/component';
import layout from '../../templates/components/select-box/options';
import { _initAction, _destroyAction } from '../../utils/actions/lifecycle';

export default Component.extend({
  layout,
  tagName: '',

  init() {
    this._super(...arguments);
    _initAction(this);
  },

  actions: {
    willDestroyElement() {
      _destroyAction(this);
    }
  }
});
