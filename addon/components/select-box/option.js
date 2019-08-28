import { readOnly, equal } from '@ember/object/computed';
import activateAction from '../../utils/actions/activate';
import Component from '@ember/component';
import index from '../../utils/macros/index';
import { _initAction, _destroyAction } from '../../utils/actions/lifecycle';
import isSelected from '../../utils/macros/is-selected';
import layout from '../../templates/components/select-box/option';
import selectAction from '../../utils/actions/select';
import resolveValue from '../../utils/value/resolve';
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
    _initAction(this);
  },

  didReceiveAttrs() {
    this._super(...arguments);
    resolveValue(this, this.value);
  },

  actions: {
    didInsertElement(element) {
      registerElement(this, element);
    },

    willDestroyElement(element) {
      deregisterElement(this, element);
      _destroyAction(this);
    },

    onMouseEnter() {
      activateAction(this);
    },

    onClick() {
      selectAction(this);
    }
  }
});
