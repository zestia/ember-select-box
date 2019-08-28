import Component from '@ember/component';
import layout from '../../templates/components/select-box/options';
import { _initComponent, _destroyComponent } from '../../utils/shared/lifecycle';

export default Component.extend({
  layout,
  tagName: '',

  init() {
    this._super(...arguments);
    _initComponent(this);
  },

  actions: {
    willDestroyElement() {
      _destroyComponent(this);
    }
  }
});
