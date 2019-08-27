import Component from '@ember/component';
import layout from '../../templates/components/native-select-box/option';
import index from '../../utils/index';
import isSelected from '../../utils/is-selected';
import setOptionValue from '../../utils/set-option-value';
import init from '../../utils/init';
import destroy from '../../utils/destroy';
import registerElement from '../../utils/register-element';
import deregisterElement from '../../utils/deregister-element';

export default Component.extend({
  layout,
  tagName: '',

  isSelected: isSelected(),
  index: index(),

  init() {
    this._super(...arguments);
    init(this);
  },

  didReceiveAttrs() {
    this._super(...arguments);
    setOptionValue(this, this.value);
  },

  actions: {
    didInsertElement(element) {
      registerElement(this, element);
    },

    willDestroyElement(element) {
      deregisterElement(this, element);
      destroy(this);
    }
  }
});
