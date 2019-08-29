import Component from '@ember/component';
import layout from '../../templates/components/select-box/options';
import {
  _initComponent,
  _destroyComponent
} from '../../utils/shared/lifecycle';

export default Component.extend({
  layout,
  tagName: '',

  // Arguments

  classNamePrefix: '',

  init() {
    this._super(...arguments);
    _initComponent(this);
  },

  actions: {
    // Internal actions

    willDestroyElement() {
      _destroyComponent(this);
    }
  }
});
