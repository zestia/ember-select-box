import { readOnly, equal } from '@ember/object/computed';
import activateAction from '../../utils/actions/activate';
import Component from '@ember/component';
import destroyAction from '../../utils/actions/destroy';
import index from '../../utils/macros/index';
import initAction from '../../utils/actions/init';
import isSelected from '../../utils/macros/is-selected';
import layout from '../../templates/components/select-box/option';
import selectAction from '../../utils/actions/select';
import setValue from '../../utils/value/set';
import noop from '../../utils/general/noop';
import { registerElement, deregisterElement } from '../../utils/registration/element';

export default Component.extend({
  layout,
  tagName: '',

  api: noop,
  index: index('options'),
  isActive: equal('index', 'activeOptionIndex'),
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
