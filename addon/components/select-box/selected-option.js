import Component from '@ember/component';
import layout from '../../templates/components/select-box/selected-option';
import updateOptionValue from '../../utils/update-option-value';
import init from '../../utils/init';
import destroy from '../../utils/destroy';
import registerElement from '../../utils/register-element';
import deregisterElement from '../../utils/deregister-element';
import index from '../../utils/index';
import isActive from '../../utils/is-active';

export default Component.extend({
  layout,
  tagName: '',

  index: index(),
  isActive: isActive(),

  init() {
    this._super(...arguments);
    init(this);
  },

  didReceiveAttrs() {
    this._super(...arguments);
    updateOptionValue(this, this.value);
  },

  willDestroyElement() {
    this._super(...arguments);
    destroy(this);
  },

  actions: {
    insertElement(element) {
      registerElement(this, element);
    },

    destroyElement(element) {
      deregisterElement(this, element);
    }
  }
});
