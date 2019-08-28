import { readOnly, equal } from '@ember/object/computed';
import Component from '@ember/component';
import index from '../../utils/macros/index';
import { _initComponent, _destroyComponent } from '../../utils/shared/lifecycle';
import isSelected from '../../utils/macros/is-selected';
import layout from '../../templates/components/select-box/option';
import { _activateOption } from '../../utils/select-box/option/activate';
import { _selectOption } from '../../utils/select-box/option/select';
import resolveValue from '../../utils/shared/resolve-value';
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
    _initComponent(this);
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
      _destroyComponent(this);
    },

    onMouseEnter() {
      _activateOption(this);
    },

    onClick() {
      _selectOption(this);
    }
  }
});
