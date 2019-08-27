import Component from '@ember/component';
import layout from '../../templates/components/select-box/selected-option';
import setValue from '../../utils/set-value';
import initAction from '../../utils/actions/init';
import destroyAction from '../../utils/actions/destroy';
import registerElement from '../../utils/register-element';
import deregisterElement from '../../utils/deregister-element';
import index from '../../utils/macros/index';
import isActive from '../../utils/macros/is-active';

export default Component.extend({
  layout,
  tagName: '',

  index: index(),
  isActive: isActive(),

  init() {
    this._super(...arguments);
    initAction(this);
  },

  didReceiveAttrs() {
    this._super(...arguments);
    setValue(this, this.value);
  },

  actions: {
    didInsertElement(element) {
      registerElement(this, element);
    },

    willDestroyElement(element) {
      deregisterElement(this, element);
      destroyAction(this);
    }
  }
});
