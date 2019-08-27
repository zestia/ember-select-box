import Component from '@ember/component';
import layout from '../../templates/components/select-box/selected-option';
import setOptionValue from '../../utils/set-option-value';
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
    setOptionValue(this, this.value);
  },

  actions: {
    insertedElement(element) {
      registerElement(this, element);
    },

    willDestroyElement(element) {
      deregisterElement(this, element);
      destroy(this);
    }
  }
});
