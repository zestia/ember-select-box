import Component from '@ember/component';
import {
  _destroyComponent,
  _initComponent
} from '../../utils/component/lifecycle';
import layout from '../../templates/components/select-box/selected-options';
import { className } from '../../utils/shared/attributes';

export default Component.extend({
  layout,
  tagName: '',

  // Arguments

  classNamePrefix: '',

  // Computed state

  className: className(),

  init() {
    this._super(...arguments);
    _initComponent(this);
  },

  actions: {
    // Internal actions

    handleDestroyElement() {
      _destroyComponent(this);
    }
  }
});
