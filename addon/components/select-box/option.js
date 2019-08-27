import { readOnly } from '@ember/object/computed';
import activateAction from '../../utils/actions/activate';
import Component from '@ember/component';
import deregisterElement from '../../utils/deregister-element';
import destroyAction from '../../utils/actions/destroy';
import index from '../../utils/macros/index';
import initAction from '../../utils/actions/init';
import isActive from '../../utils/macros/is-active';
import isSelected from '../../utils/macros/is-selected';
import layout from '../../templates/components/select-box/option';
import registerElement from '../../utils/register-element';
import selectAction from '../../utils/actions/select';
import setValue from '../../utils/set-value';

export default Component.extend({
  layout,
  tagName: '',

  index: index(),
  isActive: isActive(),
  isDisabled: readOnly('disabled'),
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
    },

    onMouseEnter() {
      activateAction(this);
    },

    onClick() {
      selectAction(this);
    }
  }
});
