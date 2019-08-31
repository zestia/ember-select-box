import Component from '@ember/component';
import layout from '../../templates/components/select-box/selected-options';
import {
  _destroyComponent,
  _initComponent
} from '../../utils/component/lifecycle';

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
