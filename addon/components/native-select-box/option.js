import Component from '@ember/component';
import destroyAction from '../../utils/actions/destroy';
import index from '../../utils/macros/index';
import initAction from '../../utils/actions/init';
import isSelected from '../../utils/macros/is-selected';
import layout from '../../templates/components/native-select-box/option';
import { registerElement, deregisterElement } from '../../utils/registration/element';
import setValue from '../../utils/value/set';
import noop from '../../utils/general/noop';

export default Component.extend({
  layout,
  tagName: '',

  api: noop,
  index: index('selectBox.options'),
  isSelected: isSelected(),

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
