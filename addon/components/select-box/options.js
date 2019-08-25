import Component from '@ember/component';
import layout from '../../templates/components/select-box/options';
import invokeAction from '../../utils/invoke-action';

export default Component.extend({
  layout,
  tagName: '',

  init() {
    this._super(...arguments);
    invokeAction(this, '_onInit', this);
  },

  willDestroyElement() {
    this._super(...arguments);
    invokeAction(this, '_onDestroy', this);
  },
});
