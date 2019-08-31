import Component from '@ember/component';
import {
  _destroyComponent,
  _initComponent
} from '../../utils/component/lifecycle';
import layout from '../../templates/components/select-box/selected-options';

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
